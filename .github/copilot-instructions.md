# Copilot Instructions for a React Frontend Component (Vite + TypeScript)

This guide provides instructions for using **GitHub Copilot** and onboarding developers working on this React front end project written in **TypeScript** with the **Vite** framework and **Vitest co-located unit tests**, and using the **AWS CDK** for infrastructure as code.

---

## Role

You are a **Senior TypeScript developer** working on a React front end project. Your goal is to create efficient, maintainable, and testable components using best practices for TypeScript development, Vite for build tooling, and Vitest for unit testing. You will use the guidelines and best practices outlined in this document to ensure consistency and quality across the codebase.

---

## Project Overview

- **Component:** React Starter (react-starter)
- **Description:** This component provides a user interface for creating, listing, and maintaining user tasks. As this is a starter project, it contains essential features such as routing, state management, form handling, and API integration.

---

## Technology Stack

The React application leverages a modern technology stack to ensure optimal performance, maintainability, and developer experience.

- **Language:**: TypeScript
- **UI Library**: React
- **UI Router** React Router DOM
- **Build Tool**: Vite
- **Form Management**: React Hook Form
- **Validation**: Zod
- **API Client**: Tanstack Query
- **HTTP Client**: Axios
- **Styling**: TailwindCSS
- **Component Library**: shadcn/ui
- **Font Awesome**: icons
- **Utility Library**: Lodash
- **Date Library**: date-fns
- **Unit Testing**: Vitest
- **Code Coverage**: Vitest V8
- **React Testing Library**: @testing-library/react
- **IaC Deployment**: AWS CDK
- **CI/CD**: GitHub Actions

---

## Project Structure

This project follows a structure that separates application-wide **common** components, hooks, and utils from page-level components, hooks, and utils with co-located tests. This promotes modularity and maintainability.

```
src
  /common                               # Application-wide shared components, hooks, and utils
    /api
      useGetCurrentUser.ts              # API hook for fetching current user
      useGetCurrentUser.test.ts         # Unit test for useGetCurrentUser
    /components
      /ui                               # shadcn/ui components
        button.tsx                      # Reusable button component from shadcn/ui
        input.tsx                       # Reusable input component from shadcn/ui
        label.tsx                       # Reusable label component from shadcn/ui
      /Header
        Header.tsx                      # Application header component
        Header.test.tsx                 # Unit test for Header
      /Router
        Router.tsx                      # Application router component
        Router.test.tsx                 # Unit test for Router
    /models
      Task.ts                           # Type definitions Task
    /providers
      ThemeProvider.tsx                 # Theme provider for styling
      ThemeProvider.test.tsx            # Unit test for ThemeProvider
    /hooks
      useDebounce.ts                    # Custom hook for debouncing values
      useDebounce.test.ts               # Unit test for useDebounce
    /utils
      api.ts                            # Axios instance and API utilities
      constants.ts                      # Shared constants
  /pages                                # Page-specific components, hooks, and utils
    /tasks                              # Tasks page family and related components
      /create                           # Components and hooks for creating tasks
        CreateTask.tsx                  # Component for creating a new task
        CreateTask.test.tsx             # Unit test for CreateTask
      /configure
        ConfigureTask.tsx               # Component for configuring a task
        ConfigureTask.test.tsx          # Unit test for ConfigureTask
      /delete
        DeleteTask.tsx                  # Component for deleting a task
        DeleteTask.test.tsx             # Unit test for DeleteTask
      /hooks
        useGetTasks.ts                  # Hook for fetching tasks
        useGetTasks.test.ts             # Unit test for useGetTasks
      /utils
        taskUtils.ts                    # Utility functions for task logic
        taskUtils.test.ts               # Unit test for taskUtils
      TaskPage.tsx                      # Page component for displaying tasks
      TaskPage.test.tsx                 # Unit test for TaskPage
  App.tsx                               # Main application component
  App.test.tsx                          # Unit test for App
  main.tsx                              # Application entry point
  index.css                             # Global styles (Tailwind CSS)

/infrastructure
  /stacks
    frontend-stack.ts                   # AWS CDK stack for frontend resources
  app.ts                                # AWS CDK app entry point
  cdk.json                              # AWS CDK configuration
  tsconfig.json                         # TypeScript configuration for AWS CDK
  package.json                          # Dependencies and scripts for AWS CDK infrastructure

tsconfig.json                           # Main project TypeScript config
vite.config.ts                          # Vite config
eslint.config.js                        # ESLint config
components.json                         # shadcn/ui components config
.nvmrc                                  # npm config for package management
package.json                            # Project dependencies and scripts
.env                                    # Environment variables
```

---

## Development Guidelines

### TypeScript Development

- Use **TypeScript** for all source code.
- Use **strict mode** in `tsconfig.json` for type safety.
- Use **interfaces** for defining types, especially for props and state.
- Use **type aliases** for utility types and complex types.
- Use **enums** for fixed sets of values.
- Use **destructuring** for props and state in components.
- Use **async/await** for asynchronous operations.
- Use **optional chaining** and **nullish coalescing** for safer property access.
- Use **type guards** for narrowing types.
- Use **generics** for reusable components and functions.
- Use **type assertions** sparingly and only when necessary.
- Use **type inference** where possible to reduce redundancy.
- Use **type-safe imports** to ensure correct types are used.
- Use **ESLint** with TypeScript rules for linting.
- Use **Prettier** for code formatting.
- Do not use barrel files (index.ts).

### React Component Development

- Use **functional components** with hooks.
- Use **TypeScript** for type safety.
- Return **JSX.Element** or **false** from components.
- Use arrow functions for components.
- Use the `data-testid` attribute to assist with testing.
- Use default exports for components.
- Use a **testId** prop for components that need to be tested, defaulting to the component name in kebab-case.

### Performance and Optimization

- Split code via route-level `lazy()` and `Suspense` for code splitting.

### Styling Guidelines

- Use **Tailwind CSS** for styling.
- Apply base styles in `src/index.css`
- Use CSS variables for theming (index.css).

### Configuration

- Use **.env** for environment variables prefixed with `VITE_` for Vite compatibility.

### Maintainability

- Keep components small and focused on a single responsibility.
- Use comments to explain complex logic, but avoid obvious comments.
- Organize imports logically: external libraries first, then internal components, hooks, and utils.

---

## Testing Guidelines

- Use **Vitest**.
- Place test files next to the source file, with `.test.ts` suffix.
- Use Arrange - Act - Assert (AAA) pattern for test structure:
  - **Arrange:** Set up the test environment and inputs.
  - **Act:** Call the function being tested.
  - **Assert:** Verify the output and side effects.
- Use `test-utils` for common test functions and helpers.
- Use `describe` and `it` blocks for organization.
- Mock dependencies using `vi.mock` or similar.
- Use `beforeEach` for setup and `afterEach` for cleanup as needed.
- Use `expect` assertions for results.
- Use the `data-testid` attribute for selecting elements in tests.
- Use `screen` from `@testing-library/react` for querying elements.
- Use `userEvent` from `@testing-library/user-event` for simulating user interactions.
- Prefer unit tests over integration tests in this repo.
- 80% code coverage is the minimum requirement for all components and features.

---

## UI Component Setup (shadcn/ui)

After installing shadcn/ui:

- Reusable UI components like `<Button />`, `<Input />`, `<Label />` live in `src/common/components/ui/`
- You can override and customize each component’s styles with Tailwind and variants
- Recommended: use the CLI to scaffold new components:

  ```bash
  npx shadcn@latest add button input label
  ```

---

## AWS CDK Guidelines

- Self-contained infrastructure code in the `infrastructure` directory.
- Define one CDK stack per major grouping of resources (e.g., CDN).
- Use **.env** for environment variables prefixed with `CDK_`, but avoid committing this file.
- Use Zod for schema validation of configuration values.
- Tag all CDK resources appropriately (`App`, `Env`, `OU`, `Owner`).
- Deploy separate environments (dev/qa/prd) using configuration values.

### Example: S3 Bucket and CloudFront Distribution

```ts
// S3 bucket for the application
const bucket = new s3.Bucket(this, 'CloudFrontSpaBucket', {
  removalPolicy: cdk.RemovalPolicy.DESTROY,
  autoDeleteObjects: true,
});

// S3 bucket deployment
const deployment = new s3_deployment.BucketDeployment(this, 'CloudFrontSpaDeployment', {
  sources: [s3_deployment.Source.asset('../dist')],
  destinationBucket: bucket,
});

// CloudFront distribution
const distribution = new cloudfront.Distribution(this, 'CloudFrontSpaDistribution', {
  certificate: certificate,
  comment: 'CDK Playground CloudFront SPA',
  defaultBehavior: {
    origin: cloudfront_origins.S3BucketOrigin.withOriginAccessControl(bucket),
    viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
  },
  defaultRootObject: 'index.html',
  domainNames: ['cdk-playground.dev.leanstacks.net'],
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
});
```
