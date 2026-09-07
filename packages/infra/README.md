# @react-starter/infra

AWS CDK infrastructure for the React Starter application.

## Quick Start

1. **Setup environment:**

   ```bash
   cp .env.example .env
   # Edit .env with your AWS configuration
   ```

2. **Install dependencies:**

   From the project base directory, install all project dependencies.

   ```bash
   npm install
   ```

3. **Bootstrap CDK (first time only):**

   This step should only be performed 1 time per AWS Account. An Account needs only to be bootstrapped for the AWS CDK once.

   ```bash
   npx cdk bootstrap
   ```

4. **Build the project:**

   From the project base directory, build the full project (includes all monorepo packages).

   ```bash
   npm run build
   ```

5. **Deploy:**

   Deploy the project to the AWS account defined in your `packages/infra/.env` file.

   ```bash
   npm run deploy:all

   OR, from the project base directory

   npm run -w packages/infra deploy:all
   ```

## Available Pacakge Scripts

- `npm run build` - Build TypeScript
- `npm run clean` - Cleans up temporary files and directories
- `npm run deploy` - Deploy infrastructure, useful for a single stack
- `npm run deploy:all` - Deploys all infrastructure stacks
- `npm run destroy` - Destroy infrastructure, useful for a single stack
- `npm run destroy:all` - Destroys all infrastructure stacks
- `npm run diff` - Preview changes
- `npm run synth` - Synthesize CloudFormation
- `npm run test` - Run infrastructure unit tests
- `npm run test:coverage` - Run infrastructure unit tests with coverage

## Further Reading

See the [Infrastructure Guide](../../docs/INFRASTRUCTURE_GUIDE.md) for detailed infrastructure documentation.

<br/>

---

:point_left: Return to the main project [README](../../README.md).
