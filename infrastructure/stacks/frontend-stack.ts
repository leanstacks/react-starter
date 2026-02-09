/**
 * An AWS CDK stack for deploying the frontend of a React application.
 * @module FrontendStack
 */

import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as s3_deployment from 'aws-cdk-lib/aws-s3-deployment';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as cloudfront_origins from 'aws-cdk-lib/aws-cloudfront-origins';
import * as certificatemanager from 'aws-cdk-lib/aws-certificatemanager';
import * as route53 from 'aws-cdk-lib/aws-route53';
import * as route53_targets from 'aws-cdk-lib/aws-route53-targets';
import { Construct } from 'constructs';

export interface FrontendStackProps extends cdk.StackProps {
  /**
   * The name of the application, used for resource naming and tagging
   */
  appName: string;
  /**
   * The deployment environment (e.g. 'dev', 'qa', 'prd')
   */
  envName: string;
  /**
   * The path to the built application assets
   * @default '../dist'
   */
  assetPath: string;
  /**
   * The custom domain name for the application (e.g. 'app.example.com')
   */
  domainName: string;
  /**
   * The ARN of the SSL certificate for the custom domain
   */
  certificateArn?: string;
  /**
   * The ID of the Route53 hosted zone for the custom domain
   */
  hostedZoneId: string;
  /**
   * The name of the Route53 hosted zone for the custom domain (e.g. 'example.com')
   */
  hostedZoneName: string;
}

/**
 * A CDK stack that sets up the frontend infrastructure for a React application.
 *
 * Creates:
 * - S3 bucket for hosting static assets
 * - CloudFront distribution for content delivery
 * - Optional SSL certificate and custom domain
 */
export class FrontendStack extends cdk.Stack {
  /**
   * The S3 bucket containing the static assets
   */
  public readonly bucket: s3.Bucket;

  /**
   * The CloudFront distribution
   */
  public readonly distribution: cloudfront.Distribution;

  /**
   * The SSL certificate (if configured)
   */
  public readonly certificate?: certificatemanager.ICertificate;

  constructor(scope: Construct, id: string, props: FrontendStackProps) {
    super(scope, id, props);

    // Create S3 bucket for the application assets
    this.bucket = new s3.Bucket(this, `${props.appName}-ui-bucket-${props.envName}`, {
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      encryption: s3.BucketEncryption.S3_MANAGED,
      enforceSSL: true,
    });

    // Handle SSL certificate if configured
    if (props.certificateArn) {
      this.certificate = certificatemanager.Certificate.fromCertificateArn(
        this,
        `${props.appName}-certificate-${props.envName}`,
        props.certificateArn,
      );
    }

    // Configure CloudFront distribution
    const baseDistributionProps: cloudfront.DistributionProps = {
      comment: `${props.appName} CloudFront Distribution for ${props.envName} environment`,
      defaultBehavior: {
        origin: cloudfront_origins.S3BucketOrigin.withOriginAccessControl(this.bucket),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
        originRequestPolicy: cloudfront.OriginRequestPolicy.CORS_S3_ORIGIN,
        responseHeadersPolicy: cloudfront.ResponseHeadersPolicy.SECURITY_HEADERS,
      },
      defaultRootObject: 'index.html',
      errorResponses: [
        {
          httpStatus: 403,
          responsePagePath: '/index.html',
          ttl: cdk.Duration.seconds(0),
          responseHttpStatus: 200,
        },
        {
          httpStatus: 404,
          responsePagePath: '/index.html',
          ttl: cdk.Duration.seconds(0),
          responseHttpStatus: 200,
        },
      ],
      priceClass: cloudfront.PriceClass.PRICE_CLASS_100,
      enableIpv6: true,
    };

    // Create distribution with or without custom domain
    const distributionProps: cloudfront.DistributionProps =
      props.domainName && this.certificate
        ? {
            ...baseDistributionProps,
            domainNames: [props.domainName],
            certificate: this.certificate,
          }
        : baseDistributionProps;

    // Create CloudFront distribution
    this.distribution = new cloudfront.Distribution(
      this,
      `${props.appName}-distribution-${props.envName}`,
      distributionProps,
    );

    // Deploy static assets to S3
    new s3_deployment.BucketDeployment(this, `${props.appName}-deployment-${props.envName}`, {
      sources: [s3_deployment.Source.asset(props.assetPath)],
      destinationBucket: this.bucket,
      distribution: this.distribution,
      distributionPaths: ['/*'],
      memoryLimit: 512,
    });

    // Configure Route53 record if hosted zone is provided
    if (props.domainName && props.hostedZoneId && props.hostedZoneName) {
      const hostedZone = route53.HostedZone.fromHostedZoneAttributes(
        this,
        `${props.appName}-hosted-zone-${props.envName}`,
        {
          hostedZoneId: props.hostedZoneId,
          zoneName: props.hostedZoneName,
        },
      );

      new route53.ARecord(this, `${props.appName}-a-record-${props.envName}`, {
        zone: hostedZone,
        recordName: props.domainName,
        target: route53.RecordTarget.fromAlias(new route53_targets.CloudFrontTarget(this.distribution)),
      });

      new route53.AaaaRecord(this, `${props.appName}-aaaa-record-${props.envName}`, {
        zone: hostedZone,
        recordName: props.domainName,
        target: route53.RecordTarget.fromAlias(new route53_targets.CloudFrontTarget(this.distribution)),
      });
    }

    // Outputs
    new cdk.CfnOutput(this, 'BucketName', {
      value: this.bucket.bucketName,
      description: 'Name of the S3 bucket containing the static assets',
    });

    new cdk.CfnOutput(this, 'DistributionId', {
      value: this.distribution.distributionId,
      description: 'CloudFront distribution ID',
    });

    new cdk.CfnOutput(this, 'DistributionDomainName', {
      value: this.distribution.distributionDomainName,
      description: 'CloudFront distribution domain name',
    });

    if (props.domainName) {
      new cdk.CfnOutput(this, 'CustomDomainName', {
        value: props.domainName,
        description: 'Custom domain name for the application',
      });
    }

    new cdk.CfnOutput(this, 'ApplicationUrl', {
      value: props.domainName ? `https://${props.domainName}` : `https://${this.distribution.distributionDomainName}`,
      description: 'URL to access the application',
    });
  }
}
