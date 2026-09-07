# DevOps Guide

Welcome to the DevOps guide for the React Starter project. This document is designed to help engineers understand the DevOps practices, tools, and workflows used in this TypeScript monorepo.

## Overview

DevOps in this project focuses on automation, reliability, and maintainability across a **monorepo structure** containing multiple workspaces. The main goals are to ensure code quality, automate testing across all packages, validate infrastructure as code, and streamline deployment processes to AWS. All workflows are designed to work seamlessly with the monorepo's workspace architecture.

### Monorepo Structure

The project uses a monorepo with the following workspaces:

- **`packages/web`** - Frontend React application built with Vite
- **`packages/infra`** - AWS CDK infrastructure as code
- **`packages/shared`** - Shared utilities, types, and components used across workspaces

## DevOps Tools Used

### GitHub Actions

- **Purpose:** Automates CI/CD workflows, including running tests across all workspaces, building the project, validating infrastructure as code, and deploying to AWS.
- **Location:** All workflow files are stored in the `.github/workflows/` directory.
- **Monorepo Integration:** All workflows use workspace-scoped npm commands (with `-w` flag) to run tasks in specific packages and maintain workspace isolation.
- **Key Workflows:**
  - **CI (Continuous Integration):** Validates pull requests by linting, formatting, building, and testing all packages (web and infrastructure).
  - **Code Quality:** Performs automated code quality checks, test coverage analysis (per-package), security audits, and dependency analysis on a schedule and on push to main.
  - **Deploy to DEV:** Automatically deploys the application to the development environment on every push to main.
  - **Deploy to QA:** Deploys the application to the QA environment when pushing to release branches.
  - **Deploy to PROD:** Deploys the application to production when publishing GitHub releases.

## GitHub Actions Workflows

The project uses GitHub Actions for CI/CD. Below is a detailed description of each workflow:

### Continuous Integration Workflow (`ci.yml`)

- **Purpose:** Validates every pull request to the `main` branch by linting, formatting, building, and testing all packages (web and infrastructure).
- **Triggers:**
  - On pull requests targeting the `main` branch
  - Manual: Via GitHub Actions UI (`workflow_dispatch`)
- **Concurrency:**
  - Ensures only one workflow runs per branch/ref at a time; cancels in-progress runs for the same branch/ref.
- **Timeout:** 10 minutes
- **Prerequisites:**
  - GitHub Actions variables must be configured:
    - `ENV_CI` - Application environment variables for CI
    - `CDK_ENV_DEV` - CDK infrastructure environment configuration for DEV
    - `AWS_ROLE_ARN_DEV` - AWS IAM Role ARN for development environment
    - `AWS_REGION` - AWS region for deployment
- **Main Steps:**
  1. Checkout repository
  2. Setup Node.js (from `.nvmrc`, with npm cache)
  3. Install dependencies (`npm ci` - installs for all workspaces)
  4. Create web package `.env` file in `packages/web/` from variables (`ENV_CI`)
  5. Create infra package `.env` file in `packages/infra/` from variables (`CDK_ENV_DEV`)
  6. Lint code across all workspaces (`npm run lint`)
  7. Check code formatting (`npm run format:check`)
  8. Build application (`npm run build` - builds all packages)
  9. Run unit tests with coverage across all packages (`npm run test:coverage`)
  10. Configure AWS credentials using OIDC (role: `AWS_ROLE_ARN_DEV`)
  11. Synthesize CDK stacks for infra package (`npm run synth -w packages/infra`)
  12. Clean up sensitive files (`.env` in `packages/web/` and `packages/infra/`, build artifacts)
- **Importance:** Ensures that all code merged into `main` passes linting, formatting, builds successfully, is covered by tests, and that the AWS CDK infrastructure code is valid and synthesizes correctly. This prevents broken or low-quality code from being merged and keeps the main branch stable.

### Code Quality Workflow (`code-quality.yml`)

- **Purpose:** Automates comprehensive code quality checks, test coverage analysis (per-package), security audits, and dependency analysis across all workspaces.
- **Triggers:**
  - Scheduled: Every Sunday at 5 AM UTC
  - Manual: Via GitHub Actions UI (`workflow_dispatch`)
  - On push to `main` branch (if source files, package.json, or workflow files change)
- **Timeout:** 10 minutes
- **Main Steps:**
  1. Checkout repository (with full history for better analysis)
  2. Setup Node.js (from `.nvmrc`, with npm cache)
  3. Install dependencies for all workspaces (`npm ci`)
  4. Create web package `.env` file in `packages/web/` from variables (`ENV_CI`)
  5. Create infra package `.env` file in `packages/infra/` from variables (`CDK_ENV_DEV`)
  6. Run ESLint across all workspaces with detailed output summary
  7. Check code formatting with Prettier
  8. Build check across all packages
  9. Security audit (`npm audit` for moderate vulnerabilities)
  10. Package analysis (`npm outdated`)
  11. Run web tests with coverage (`npm run test:coverage -w packages/web`)
  12. Generate web coverage summary table from `packages/web/coverage/coverage-summary.json`
  13. Run infrastructure tests with coverage (`npm run test:coverage -w packages/infra`)
  14. Generate infrastructure coverage summary table from `packages/infra/coverage/coverage-summary.json`
  15. Archive test results and analysis outputs as artifacts (retention: 7 days)
- **Output Format:** All results are summarized in the GitHub Actions step summary for easy review in the UI, including per-package coverage tables
- **Importance:** Maintains code quality, security posture, and up-to-date dependencies across all workspaces. Provides visibility into test coverage and build health for each package. Acts as an early detection system for quality issues, security vulnerabilities, and outdated packages.

### Deploy to DEV Workflow (`deploy-dev.yml`)

- **Purpose:** Automatically builds and deploys all packages (web and infrastructure) to the development environment on AWS with full infrastructure provisioning.
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
    - `ENV_DEV` - Application environment variables
    - `CDK_ENV_DEV` - CDK infrastructure environment configuration
- **Execution:** Calls the reusable `deploy-reusable.yml` workflow with environment-specific configuration
- **Importance:** Enables rapid deployment of latest changes to development environment for testing and validation. Ensures infrastructure-as-code is always in sync with application deployments.

### Deploy to QA Workflow (`deploy-qa.yml`)

- **Purpose:** Deploys all packages (web and infrastructure) to the QA environment on AWS for testing and quality assurance.
- **Triggers:**
  - On push to `release/*` branches
  - On push of the `qa` tag
- **Concurrency:**
  - Prevents concurrent deployments; ensures orderly deployment
- **Prerequisites:**
  - GitHub Actions variables must be configured:
    - `AWS_ROLE_ARN_QA` - AWS IAM Role ARN for QA environment
    - `AWS_REGION` - AWS region for deployment
    - `ENV_QA` - Application environment variables
    - `CDK_ENV_QA` - CDK infrastructure environment configuration
- **Execution:** Calls the reusable `deploy-reusable.yml` workflow with environment-specific configuration
- **Importance:** Allows testing of release branches in a QA environment before deploying to production.

### Deploy to PROD Workflow (`deploy-prod.yml`)

- **Purpose:** Deploys all packages (web and infrastructure) to the production environment on AWS when releasing to production.
- **Triggers:**
  - On GitHub release publication
  - On push of the `prod` tag
- **Concurrency:**
  - Prevents concurrent deployments; ensures orderly deployment
- **Prerequisites:**
  - GitHub Actions variables must be configured:
    - `AWS_ROLE_ARN_PROD` - AWS IAM Role ARN for production environment
    - `AWS_REGION` - AWS region for deployment
    - `ENV_PROD` - Application environment variables
    - `CDK_ENV_PROD` - CDK infrastructure environment configuration
- **Execution:** Calls the reusable `deploy-reusable.yml` workflow with environment-specific configuration
- **Importance:** Ensures controlled, traceable deployments to production. Using GitHub releases provides a clear release history and version tracking.

### Reusable Deploy Workflow (`deploy-reusable.yml`)

- **Purpose:** Reusable workflow that handles the complete deployment process for any environment. Centralizes deployment logic used by all environment-specific workflows (`deploy-dev.yml`, `deploy-qa.yml`, `deploy-prod.yml`).
- **Triggers:**
  - Called by other workflows via `workflow_call`
- **Inputs (from calling workflow):**
  - `aws_role_arn` - AWS IAM role ARN for the target environment (required)
  - `aws_region` - AWS region for deployment (default: `us-east-1`)
  - `env` - Environment name (dev, qa, prod; default: `dev`)
  - `env_file` - Application environment variables (required)
  - `cdk_env_file` - CDK infrastructure environment configuration (required)
- **Timeout:** 30 minutes
- **Permissions:**
  - `id-token: write` - For AWS OIDC authentication
  - `contents: read` - For reading repository
- **Main Steps:**
  1. Checkout repository
  2. Setup Node.js (from `.nvmrc`, with npm cache)
  3. Install dependencies for all workspaces (`npm ci`)
  4. Create web package `.env` file in `packages/web/` with:
     - Environment variables from input
     - Build metadata: date (UTC), time (UTC), commit SHA
     - Environment code and workflow information
  5. Create infrastructure `.env` file in `packages/infra/` with environment variables
  6. Build all packages (`npm run build`)
  7. Configure AWS credentials using OIDC (no long-lived credentials)
  8. Bootstrap CDK (checks if CDKToolkit stack exists, skips if already bootstrapped):
     - Attempts to describe CDKToolkit CloudFormation stack
     - Runs `npx cdk bootstrap` only if not already bootstrapped
  9. Synthesize CDK stacks for infra package (`npm run synth -w packages/infra`)
  10. Deploy CDK stacks for infra package (`npm run deploy:all -w packages/infra` with auto-approval)
  11. Clean up sensitive files (`.env` files and build artifacts in all packages)
- **Build Metadata:** The following environment variables are injected at build time (accessible in the React app as `import.meta.env.*`):
  - `VITE_BUILD_DATE` - Build date (UTC, format: YYYY-MM-DD)
  - `VITE_BUILD_TIME` - Build time (UTC, format: HH:MM:SS)
  - `VITE_BUILD_TS` - Full build timestamp (UTC, ISO format)
  - `VITE_BUILD_COMMIT_SHA` - Git commit SHA
  - `VITE_BUILD_ENV_CODE` - Environment code (dev/qa/prod)
  - `VITE_BUILD_WORKFLOW_NAME` - GitHub workflow name
  - `VITE_BUILD_WORKFLOW_RUN_NUMBER` - Workflow run number
  - `VITE_BUILD_WORKFLOW_RUN_ATTEMPT` - Workflow run attempt (useful for retries)
- **Security Features:**
  - Uses OIDC for AWS authentication (no long-lived credentials stored)
  - Automatic cleanup of sensitive files after deployment
  - Proper IAM role assumption with session naming
  - Bootstrap check prevents unnecessary re-bootstrapping
- **Monorepo Integration:** All build and deploy commands use workspace-scoped flags (`-w packages/infra`, `-w packages/web`) to target specific packages and maintain workspace isolation.
- **Importance:** Provides a consistent, repeatable deployment process across all environments. Centralizes deployment logic to eliminate duplication between environment-specific workflows. Includes comprehensive build metadata for debugging and version tracking in deployed applications.

## Environment Configuration

### Variables

GitHub Actions variables should be configured in the repository settings:

- `AWS_REGION` - AWS region for deployments (e.g., `us-east-1`)
- `AWS_ROLE_ARN_DEV` - AWS IAM role ARN for development
- `AWS_ROLE_ARN_QA` - AWS IAM role ARN for QA
- `AWS_ROLE_ARN_PROD` - AWS IAM role ARN for production
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

:point_left: Return to [Documentation](./README.md).
