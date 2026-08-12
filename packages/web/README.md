# @react-starter/web

React 19 frontend application built with Vite and TypeScript.

## Overview

This is the primary user-facing web application for the React Starter monorepo. It provides a modern, component-driven interface built with React 19, Vite for fast development, and Tailwind CSS for styling.

## Quick Start

### Development Server

```bash
npm run dev -w @react-starter/web
```

The application starts at `http://localhost:5173`

### Build for Production

```bash
npm run build -w @react-starter/web
```

### Run Tests

```bash
npm run test -w @react-starter/web
```

## Directory Structure

### `src/common/`

Shared application infrastructure:

- **api/** - Global TanStack Query hooks for data fetching
- **components/** - App-wide UI components and layout components
- **hooks/** - Utility hooks like `useDebounce`, `useAuth`, `useSettings`
- **providers/** - Context providers for theme, auth, and other global state
- **utils/** - Axios instances, constants, and global helper functions

### `src/pages/`

Feature-organized page components:

```
pages/
  tasks/                 # Feature group
    create/              # Feature-scoped components
    configure/
    delete/
    hooks/               # Feature-specific API hooks
    utils/               # Feature-specific utilities
```

Each page feature is self-contained with its own components, hooks, and utilities.

### `src/__fixtures__/`

Mock data and test fixtures for development and testing.

## Development Patterns

### Component Structure

- Write components as arrow functions with explicit typing
- Use default exports for page and UI components
- Include `data-testid` attributes or `testId` prop for testing

```typescript
const MyComponent: React.FC<MyComponentProps> = ({ children }) => {
  return <div data-testid="my-component">{children}</div>;
};

export default MyComponent;
```

### Styling

- Use Tailwind CSS classes for styling
- Apply theme variables via CSS in `src/index.css`
- Use `class-variance-authority` (CVA) in `src/common/utils/css.ts` for multi-variant components

### State & Data Fetching

- Use TanStack Query hooks from `src/common/api/` for global data fetching
- Use feature-scoped hooks in `src/pages/[feature]/hooks/` for local state
- Leverage React Context from `src/common/providers/` for app-wide state

### Code Splitting

- Use `React.lazy()` and `Suspense` for route-level code splitting
- Defined in routing configuration for optimal bundle optimization

## Testing

### Standards

- Use Vitest as the test runner
- Use `@testing-library/react` for component testing
- Use `@testing-library/user-event` for user interactions
- Apply AAA (Arrange-Act-Assert) structure

### Test Coverage

Maintain 70%+ coverage across all code. Co-locate tests with source files:

```
MyComponent.tsx
MyComponent.test.tsx
useMyHook.ts
useMyHook.test.ts
```

### Test Setup

Utilities and helpers for testing are in `src/test/`:

- `query-client.ts` - Configured TanStack Query client for tests
- `test-utils.tsx` - Custom render functions and helpers
- `mocks/` - Mock data and API handlers
- `wrappers/` - Test wrapper components

## File Naming Conventions

| Type                 | Convention               | Example             |
| -------------------- | ------------------------ | ------------------- |
| React Components     | PascalCase               | `TaskCard.tsx`      |
| React Hooks          | camelCase                | `useGetTasks.ts`    |
| Utilities & Services | kebab-case               | `date-utils.ts`     |
| Test Files           | Same as source + `.test` | `TaskCard.test.tsx` |

## Best Practices

1. **No Relative Cross-Package Imports:** Always use workspace symlinks
   - ✅ `import { Task } from "@react-starter/shared"`
   - ❌ `import { Task } from "../../../shared/src/models/task"`

2. **Co-location:** Keep components, hooks, and utilities close to where they're used

3. **Single Responsibility:** Each component and hook should have one clear purpose

4. **Testability:** Always include `data-testid` or `testId` prop for reliable test selection

5. **Environment Safety:** Keep browser-specific code (window, document) out of shared utilities

## Build Output

Production builds are optimized for performance:

- Minified and tree-shaken bundles
- Lazy-loaded routes for faster initial load
- Environment-specific configuration via Vite

Output is in the `dist/` directory.
