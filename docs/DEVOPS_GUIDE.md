# DevOps Guide

Welcome to the DevOps guide for the React Starter project. This document is designed to help engineers understand the DevOps practices, tools, and workflows used in this React frontend repository.

## Overview

DevOps in this project focuses on automation, reliability, and maintainability. The main goals are to ensure code quality, automate testing, validate infrastructure as code, and streamline deployment processes to AWS.

## DevOps Tools Used

### GitHub Actions

- **Purpose:** Automates CI/CD workflows, including running tests, building the project, validating infrastructure code, and deploying to AWS.
- **Location:** All workflow files are stored in the `.github/workflows/` directory.
- **Key Workflows:**
  - **CI (Continuous Integration):** Validates pull requests by linting, formatting, building, and testing both the application and infrastructure code.
  - **Code Quality:** Performs automated code quality checks, test coverage analysis, security audits, and dependency analysis on a schedule and on push to main.
  - **Deploy to DEV:** Automatically deploys the application to the development environment on every push to main.
  - **Deploy to QA:** Deploys the application to the QA environment when pushing to release branches.
  - **Deploy to PROD:** Deploys the application to production when publishing GitHub releases.

## GitHub Actions Workflows

The project uses GitHub Actions for CI/CD. Below is a detailed description of each workflow:

### Continuous Integration Workflow (`ci.yml`)

- **Purpose:** Validates every pull request to the `main` branch by linting, formatting, building, and testing both the application and infrastructure code.
- **Triggers:**
  - On pull requests targeting the `main` branch
  - Manual: Via GitHub Actions UI (`workflow_dispatch`)
- **Concurrency:**
  - Ensures only one workflow runs per branch/ref at a time; cancels in-progress runs for the same branch/ref.
- **Timeout:** 10 minutes
- **Main Steps:**
  1. Checkout repository
  2. Setup Node.js (from `.nvmrc`, with npm cache)
  3. Install dependencies (`npm ci`)
  4. Create application `.env` file from secrets (`ENV_CI`)
  5. Lint code (`npm run lint`)
  6. Check code formatting (`npm run format:check`)
  7. Build application (`npm run build`)
  8. Run unit tests with CI mode (`npm run test:ci`)
  9. Build Storybook (`npm run build:storybook`)
  10. Install and build infrastructure code
  11. Create infrastructure `.env` file from secrets (`CDK_ENV_DEV`)
  12. Configure AWS credentials using OIDC (role: `AWS_ROLE_ARN_DEV`)
  13. Synthesize CDK stacks (`npm run synth`)
  14. Clean up sensitive files (`.env`, `cdk.out`)
- **Importance:** Ensures that all code merged into `main` passes linting, formatting, builds successfully, is covered by tests, and that the AWS CDK infrastructure code is valid and synthesizes correctly. This prevents broken or low-quality code from being merged and keeps the main branch stable.

### Code Quality Workflow (`code-quality.yml`)

- **Purpose:** Automates comprehensive code quality checks, test coverage analysis, security audits, and dependency analysis for both the application and infrastructure.
- **Triggers:**
  - Scheduled: Every Sunday at 2 AM UTC
  - Manual: Via GitHub Actions UI (`workflow_dispatch`)
  - On push to `main` branch (if source files or workflow files change)
- **Timeout:** 10 minutes
- **Main Steps:**
  1. **Application Quality Checks:**
     - Checkout repository (full history)
     - Setup Node.js (from `.nvmrc`, with npm cache)
     - Install dependencies
     - Create application `.env` file from secrets
     - Run ESLint with output summary
     - Check code formatting with Prettier
     - Run tests with coverage and output summary table
     - Build check
     - Security audit (`npm audit` for moderate vulnerabilities)
     - Package analysis (`npm outdated`)
  2. **Infrastructure Quality Checks:**
     - Install infrastructure dependencies
     - Run infrastructure tests with coverage and output summary
     - Infrastructure build check
     - Infrastructure security audit
     - Infrastructure package analysis
  3. **Artifact Archival:**
     - Upload test results, coverage reports, and analysis outputs as artifacts
     - Retention: 7 days
- **Output Format:** All results are summarized in the GitHub Actions step summary for easy review in the UI
- **Importance:** Maintains code quality, security posture, and up-to-date dependencies. Provides visibility into test coverage and build health. Acts as an early detection system for quality issues, security vulnerabilities, and outdated packages.

### Deploy to DEV Workflow (`deploy-dev.yml`)

- **Purpose:** Automatically builds and deploys the application to the development environment on AWS with full infrastructure provisioning.
- **Triggers:**
  - On push to the `main` branch
  - On push of the `dev` tag
  - Manual: Via GitHub Actions UI (`workflow_dispatch`)
- **Concurrency:**
  - Prevents concurrent deployments; ensures orderly deployment
- **Prerequisites:**
  - GitHub Actions variables must be configured:
    - `AWS_ROLE_ARN_DEV` - AWS IAM Role ARN for development environment
    - `AWS_REGION` - AWS region for deployment (default: `us-east-1`)
  - GitHub Actions secrets must be configured:
    - `ENV_DEV` - Application environment variables
    - `CDK_ENV_DEV` - CDK infrastructure environment configuration
- **Execution:** Calls the reusable `Deploy` workflow
- **Importance:** Enables rapid deployment of latest changes to development environment for testing and validation. Ensures infrastructure-as-code is always in sync with application deployments.

### Deploy to QA Workflow (`deploy-qa.yml`)

- **Purpose:** Deploys the application to the QA environment on AWS for testing and quality assurance.
- **Triggers:**
  - On push to `release/*` branches
  - On push of the `qa` tag
- **Concurrency:**
  - Prevents concurrent deployments; ensures orderly deployment
- **Prerequisites:**
  - GitHub Actions variables must be configured:
    - `AWS_ROLE_ARN_QA` - AWS IAM Role ARN for QA environment
    - `AWS_REGION` - AWS region for deployment
  - GitHub Actions secrets must be configured:
    - `ENV_QA` - Application environment variables
    - `CDK_ENV_QA` - CDK infrastructure environment configuration
- **Execution:** Calls the reusable `Deploy` workflow
- **Importance:** Allows testing of release branches in a QA environment before deploying to production.

### Deploy to PROD Workflow (`deploy-prod.yml`)

- **Purpose:** Deploys the application to the production environment on AWS when releasing to production.
- **Triggers:**
  - On GitHub release publication
  - On push of the `prod` tag
- **Concurrency:**
  - Prevents concurrent deployments; ensures orderly deployment
- **Prerequisites:**
  - GitHub Actions variables must be configured:
    - `AWS_ROLE_ARN_PROD` - AWS IAM Role ARN for production environment
    - `AWS_REGION` - AWS region for deployment
  - GitHub Actions secrets must be configured:
    - `ENV_PROD` - Application environment variables
    - `CDK_ENV_PROD` - CDK infrastructure environment configuration
- **Execution:** Calls the reusable `Deploy` workflow
- **Importance:** Ensures controlled, traceable deployments to production. Using GitHub releases provides a clear release history and version tracking.

### Reusable Deploy Workflow (`reusable-deploy.yml`)

- **Purpose:** Reusable workflow that handles the complete deployment process for any environment. Centralizes deployment logic used by all environment-specific workflows.
- **Triggers:**
  - Called by other workflows (`deploy-dev.yml`, `deploy-qa.yml`, `deploy-prod.yml`)
- **Inputs:**
  - `aws_role_arn` - AWS IAM role ARN for the target environment (required)
  - `aws_region` - AWS region for deployment (default: `us-east-1`)
  - `env` - Environment name (dev, qa, prod; default: `dev`)
- **Secrets:**
  - `env_file` - Application environment variables (required)
  - `cdk_env_file` - CDK infrastructure environment configuration (required)
- **Timeout:** 30 minutes
- **Permissions:**
  - `id-token: write` - For AWS OIDC authentication
  - `contents: read` - For reading repository
- **Main Steps:**
  1. Checkout repository
  2. Setup Node.js (from `.nvmrc`, with npm cache)
  3. Install application dependencies
  4. Create application `.env` file with:
     - Environment variables from secrets
     - Build metadata: date, time, commit SHA
     - Environment code and workflow information
  5. Build the application (`npm run build`)
  6. Build Storybook (`npm run build:storybook`)
  7. Configure AWS credentials using OIDC (no long-lived credentials)
  8. Install infrastructure dependencies
  9. Create infrastructure `.env` file
  10. Build infrastructure code
  11. Bootstrap CDK (checks if already bootstrapped, skips if so)
  12. Synthesize CDK CloudFormation templates
  13. Deploy CDK stacks (`npm run deploy:all` with auto-approval)
  14. Clean up sensitive files (`.env`, `cdk.out`)
- **Build Metadata:** The following environment variables are injected at build time (accessible in the React app as `import.meta.env.*`):
  - `VITE_BUILD_DATE` - Build date (YYYY-MM-DD)
  - `VITE_BUILD_TIME` - Build time (HH:MM:SS±HHMM)
  - `VITE_BUILD_TS` - Full build timestamp
  - `VITE_BUILD_COMMIT_SHA` - Git commit SHA
  - `VITE_BUILD_ENV_CODE` - Environment code (dev/qa/prod)
  - `VITE_BUILD_WORKFLOW_NAME` - GitHub workflow name
  - `VITE_BUILD_WORKFLOW_RUN_NUMBER` - Workflow run number
  - `VITE_BUILD_WORKFLOW_RUN_ATTEMPT` - Workflow run attempt (useful for retries)
- **Security Features:**
  - Uses OIDC for AWS authentication (no long-lived credentials stored)
  - Automatic cleanup of sensitive files after deployment
  - Proper IAM role assumption with session naming
- **Importance:** Provides a consistent, repeatable deployment process across all environments. Includes comprehensive build metadata for debugging and version tracking in deployed applications.

## Environment Configuration

### Variables

GitHub Actions variables should be configured in the repository settings:

- `AWS_REGION` - AWS region for deployments (e.g., `us-east-1`)
- `AWS_ROLE_ARN_DEV` - AWS IAM role ARN for development
- `AWS_ROLE_ARN_QA` - AWS IAM role ARN for QA
- `AWS_ROLE_ARN_PROD` - AWS IAM role ARN for production

### Secrets

GitHub Actions secrets should be configured in the repository settings:

- `ENV_CI` - Environment variables for CI workflow (application)
- `ENV_DEV` - Environment variables for DEV deployment (application)
- `ENV_QA` - Environment variables for QA deployment (application)
- `ENV_PROD` - Environment variables for PROD deployment (application)
- `CDK_ENV_DEV` - CDK infrastructure environment configuration for DEV
- `CDK_ENV_QA` - CDK infrastructure environment configuration for QA
- `CDK_ENV_PROD` - CDK infrastructure environment configuration for PROD

Each environment variable file should be in the format `KEY=VALUE` with one entry per line.

## Deployment Strategy

### Development Environment

**Trigger:** Push to `main` branch or push `dev` tag

Development deployments happen automatically whenever code is merged to the main branch, enabling rapid iteration and continuous deployment of the latest code.

### QA Environment

**Trigger:** Push to `release/*` branches or push `qa` tag

QA deployments are triggered when code is pushed to release branches, allowing testing of release candidates in a controlled environment before production deployment.

### Production Environment

**Trigger:** GitHub release published or push `prod` tag

Production deployments are manually controlled through GitHub releases, providing a clear release history, version tracking, and explicit control over what goes to production.

## Further Reading

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Project Documentation](../docs/README.md)

<br/>

---

If you have questions or need help, reach out to your team or check the documentation above.
