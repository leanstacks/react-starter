#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';

import { getConfig, getEnvironmentConfig, getTags } from './utils/config';
import { FrontendStack } from './stacks/frontend-stack';

// Load and validate configuration
const config = getConfig();

// Get standard tags for resources
const tags = getTags(config);

// Get AWS environment configuration for CDK stacks
const env = getEnvironmentConfig(config);

// Create the CDK application
const app = new cdk.App();

// Create the frontend stack
new FrontendStack(app, `${config.CDK_APP_NAME}-frontend-${config.CDK_ENV}`, {
  stackName: `${config.CDK_APP_NAME}-frontend-${config.CDK_ENV}`,
  description: `Frontend resources for ${config.CDK_APP_NAME} in the ${config.CDK_ENV} environment`,
  // Use the environment variables for account and region
  env,
  // Tags for the stack
  tags,
  // Additional properties
  appName: config.CDK_APP_NAME,
  envName: config.CDK_ENV,
  assetPath: config.CDK_ASSET_PATH,
  domainName: config.CDK_DOMAIN_NAME,
  certificateArn: config.CDK_CERTIFICATE_ARN,
  hostedZoneId: config.CDK_HOSTED_ZONE_ID,
  hostedZoneName: config.CDK_HOSTED_ZONE_NAME,
});
