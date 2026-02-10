# React Starter

A serverless, progressive, responsive starter user interface (UI) with React at the core of the technology stack.

[![CI](https://github.com/leanstacks/react-starter/actions/workflows/ci.yml/badge.svg)](https://github.com/leanstacks/react-starter/actions/workflows/ci.yml)
&nbsp;
&nbsp;
[![Code Quality](https://github.com/leanstacks/react-starter/actions/workflows/code-quality.yml/badge.svg)](https://github.com/leanstacks/react-starter/actions/workflows/code-quality.yml)

## Helpful Hints

### Viewing the Starter Kit

If you do not wish to check out the repository and run the starter kit locally, you may view the latest release of the React Starter Kit at [https://react-starter.leanstacks.net/][app]. Please see the _Authentication_ section below for instructions to sign in.

> **NOTE:** This app does not collect any data and does not use cookies.

### Data

This project's API integration uses the simulated REST endpoints made available by [JSON Placeholder](https://jsonplaceholder.typicode.com/).

There are some limitations to the JSON Placeholder APIs. The primary limitation is that the API is stateless. You may create (`post`), update (`put`), and delete items within the JSON Placeholder collections; however, the collections are not actually mutated and persisted by JSON Placeholder. Within the starter kit, we update the TanStack Query caches upon successful mutation to simulate a stateful back end.

### Authentication

When using the application, you may sign in with any of the JSON Placeholder [Users](https://jsonplaceholder.typicode.com/users). Simply enter the _Username_ value from any user in the API and use any value for the _Password_. For example, try username `Kamren` or `Samantha` and password `abc123`.

## About

This project was bootstrapped with the [Vite](https://vitejs.dev/) React TypeScript template.

The production technology stack includes:

- React - core web user interface library
- React Router Dom - declarative component routing
- TanStack Query - asynchronous state management, caching, and data fetching
- Axios - http client
- React Hook Form - form management, validation, error handling, custom fields, etc.
- TailwindCSS - utility first CSS framework
- React Spring - animations
- Font Awesome - iconography
- Google Fonts - typography
- React i18next - internationalization
- Zod - schema based validation
- Lodash - utility functions
- DayJS - date and time utility functions
- TanStack Table - advanced tables and datagrids
- Recharts - composable charting library for React

The development technology stack includes:

- Vite - front end build tooling
- Vitest - core unit test framework
- React Testing Library - user-centric UI component testing
- Mock Service Worker - API mocking
- Storybook - UI component visualization and documentation
- TypeScript - the TypeScript language

### Repository

This repository uses [trunk-based development](https://www.atlassian.com/continuous-delivery/continuous-integration/trunk-based-development). The latest code is located on the `main` branch. The `main` branch is always ready for deployment.

Features are developed on branches named `feature/NNNNN-feature-name` or `NNNNN-feature-name` which are created from the `main` branch. The feature name used in the branch contains an issue identifier or a short name, e.g. `feature/123-do-something`.

Releases are created on branches named `release/MM.mm.pp` which are created from the `main` branch. The release name follows the [semantic versioning](https://semver.org/) specification.

Hotfixes are created on branches named `release/MM.mm.pp` which are created from the appropriate `release/MM.mm.pp` branch.

A pull request must be opened requesting merge from any branch back to `main`. GitHub actions perform continuous integration, CI, checks against the PR source branch. At least one code review approval is required to complete the pull request.

See also: [Feature flags](https://www.atlassian.com/continuous-delivery/principles/feature-flags)

### Issue Management

This project uses [GitHub Issues](https://github.com/leanstacks/react-starter/issues).

### Code Formatting

The project includes configuration files for the [Prettier](https://prettier.io/docs/en/configuration.html) and [EditorConfig](https://editorconfig.org/) code formatters. This allows all project contributors to share the same code formatting rules.

Adjust the configuration as desired.

## Installation

### Prerequistes

It is strongly recommended that you install Node Version Manager, [`nvm`][nvm]. Node Version Manager simplifies working on multiple projects with different versions of Node.js.

### Clone the Repository

Open the [repository][repo] in a browser. Follow the instructions to clone the repository to your local machine.

### Install Node

Open a terminal window and navigate to the project base directory. Issue the following command to install the version of Node and NPM used by the application:

```bash
# If you already have this version of Node, simply switch to it...
nvm use

# If you do NOT have this version of Node, install it...
nvm install
```

Node Version Manager inspects the `.nvmrc` file in the project base directory and uses or installs the specified version of Node and the Node Package Manager, npm.

### Install the Dependencies

To install the project dependencies, issue the following commands at a terminal prompt in the project base directory:

```bash
# Switch to the project node version...
nvm use

# Install project dependencies
npm install
```

### After Installation

The installation is now complete! You may open the project in your favorite source code editor (we recommend [Visual Studio Code](https://code.visualstudio.com/)).

We recommend the following VS Code extensions:

- Prettier - Code formatter (required)
- Tailwind CSS IntelliSense (required)
- GitHub Copilot (recommended)
- ESLint (recommended)
- Indent Rainbow (optional)
- GitLens (optional)
- Dotenv Official +Vault (optional)
- GitHub Actions (optional)

Install the _Prettier_ extension to ensure that all project participants' contributions are formatted using the same rules. The extension leverages project-specific rules found in the `.prettierrc` file in the project base directory.

The _Tailwind CSS IntelliSense_ extension is a must-have companion in all projects using Tailwind. The extension ensures that Tailwind CSS classes are named and ordered correctly and flags any conflicting classes.

## Configuration

The application is configured using Environment Variables. Because single-page applications are static, environment variable values are injected into the application during the build. The environment variables may be sourced from the environment or `.env` files as described in the [Vite documentation](https://vitejs.dev/guide/env-and-mode.html).

### `.env` files

> **NOTE:** Because they may contain sensitive information, `.env` files are not committed to the repository.

After project installation and before running the application locally, create the following `.env` files in the project base directory. Copy the `.env.example` file to get started. Learn more in the official [Vite guide for environment variables and modes](https://vitejs.dev/guide/env-and-mode.html).

#### `.env.local`

The `.env.local` configuration file provides the configuration values when the application is started on a developer's local machine.

```
# Provided by Pipeline (Simulated)
VITE_BUILD_DATE=1970-01-01
VITE_BUILD_TIME=00:00:00
VITE_BUILD_TS=1970-01-01T00:00:00+0000
VITE_BUILD_COMMIT_SHA=local
VITE_BUILD_ENV_CODE=local
VITE_BUILD_WORKFLOW_NAME=local
VITE_BUILD_WORKFLOW_RUN_NUMBER=1
VITE_BUILD_WORKFLOW_RUN_ATTEMPT=1

# API Configuration
VITE_BASE_URL_API=https://jsonplaceholder.typicode.com

# Toasts Configuration
VITE_TOAST_AUTO_DISMISS_MILLIS=5000
```

#### `.env.test.local`

The `.env.test.local` configuration file provides configuration values used when unit tests are executed on a developer's local machine.

> **NOTE:** Use the same values when running tests in a CI/CD pipeline.

```
# Provided by Pipeline (Simulated)
VITE_BUILD_DATE=1970-01-01
VITE_BUILD_TIME=00:00:00
VITE_BUILD_TS=1970-01-01T00:00:00+0000
VITE_BUILD_COMMIT_SHA=test
VITE_BUILD_ENV_CODE=test
VITE_BUILD_WORKFLOW_NAME=test
VITE_BUILD_WORKFLOW_RUN_NUMBER=1
VITE_BUILD_WORKFLOW_RUN_ATTEMPT=1

# API Configuration
VITE_BASE_URL_API=https://jsonplaceholder.typicode.com

# Toasts Configuration
VITE_TOAST_AUTO_DISMISS_MILLIS=1500
```

## Available Scripts

Many of the scripts leverage the [Vite CLI](https://vitejs.dev/guide/cli.html) or the [Vitest CLI](https://vitest.dev/guide/cli.html). Read more about them in their respective official guides.

In the project base directory, the following commands are available to run.

### `npm run dev`

Runs the app in the development mode.
Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

The page will reload when source files are saved.

### `npm test`

Launches the test runner in the interactive watch mode.
See the section about [running tests](https://vitest.dev/guide/cli.html) for more information.

### `npm run test:ci`

Executes the test runner in `CI` mode and produces a coverage report. With `CI` mode enabled, the test runner executes all tests one time and prints a summary report to the console. A code coverage report is printed to the console immediately following the test summary.

A detailed test coverage report is created in the `./coverage` directory.

> **NOTE:** This is the command which should be utilized by CI/CD platforms.

### `npm run test:ui`

Executes the tests and opens the [Vitest UI](https://vitest.dev/guide/ui) to view and interact with the unit tests.

### `npm run build`

Builds the app for production to the `dist` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

See the official guide for more information about [building for production](https://vitejs.dev/guide/build.html) and [deploying a static site](https://vitejs.dev/guide/static-deploy.html).

### `npm run lint`

Runs the eslint static code analysis and prints the results to the console.

## `npm run storybook`

Starts the [Storybook][storybook] UI. Open [http://localhost:6006](http://localhost:6006) to view it in the browser.

## `npm run build:storybook`

Build a static version the [Storybook][storybook] UI which may be deployed to a CDN or HTTP server.

## DevOps

### Cloud Resources

The AWS resources for this application component are provisioned via the AWS Cloud Development Kit (CDK) Infrastructure as Code (IaC) written in TypeScript. The AWS CDK logic and dependencies are organized as a self-contained Node.js application located in the `/infrastructure` directory.

The AWS resources provisioned to host the React app are:

| Resource                | Description                                         |
| ----------------------- | --------------------------------------------------- |
| S3 Bucket               | Contains the static assets for the application.     |
| CloudFront Distribution | A CloudFront distribution to serve the application. |
| Route53 RecordSet       | An `A` record for the CloudFront distribution.      |
| Route53 RecordSet       | An `AAAA` record for the CloudFront distribution.   |

> **NOTE:** A similar set of AWS resources may optionally be provisioned to host the Storybook application.

## Documentation

For detailed guides and reference materials, see the [Project Documentation](docs/README.md).

## License

This project is licensed under the MIT License - see [LICENSE](./LICENSE) file for details.

## Further Reading

- [Project Documentation](./docs/README.md)
- [Vite][vite]
- [React][react]
- [React Router][reactrouter]
- [TanStack][tanstack]
- [Axios][axios]
- [React Hook Form][reacthookform]
- [Zod][zod]
- [Tailwind CSS][tailwind]
- [Class Variance Authority][cva]
- [Font Awesome][fontawesome]
- [React Spring][reactspring]
- [React i18next][reacti18next]
- [Recharts][recharts]
- [React Testing Library][testing-library]
- [Storybook][storybook]
- [GitHub Actions][ghactions]

[app]: https://react-starter.leanstacks.net/ 'React Starter Kit | LeanStacks'
[repo]: https://github.com/leanstacks/react-starter 'GitHub Repository'
[nvm]: https://github.com/nvm-sh/nvm 'Node Version Manager'
[react]: https://react.dev 'React'
[reactrouter]: https://reactrouter.com/ 'React Router'
[vite]: https://vitejs.dev/ 'Vite'
[axios]: https://axios-http.com/ 'Axios'
[reacthookform]: https://www.react-hook-form.com/ 'React Hook Form'
[tailwind]: https://tailwindcss.com/ 'Tailwind CSS'
[cva]: https://cva.style/ 'Class Variance Authority'
[fontawesome]: https://fontawesome.com/ 'Font Awesome'
[tanstack]: https://tanstack.com/ 'TanStack'
[testing-library]: https://testing-library.com/ 'Testing Library'
[ghactions]: https://docs.github.com/en/actions 'GitHub Actions'
[reacti18next]: https://react.i18next.com/ 'React i18next'
[reactspring]: https://www.react-spring.dev/ 'React Spring'
[storybook]: https://storybook.js.org/ 'Storybook'
[recharts]: https://recharts.org/ 'Recharts'
[zod]: https://zod.dev/ 'Zod'
