# @react-starter/shared

Shared utilities, types, and components for the React Starter monorepo.

## Overview

This package provides the single source of truth for common structural interfaces, data models, Zod validation schemas, and reusable UI components used across all workspaces in the monorepo. All shared UI components are built on the foundation of `shadcn/ui`, styled with Tailwind CSS, and configured with the `b1FSRcurA` preset theme.

## What's Included

### Components (`src/components/`)

- Reusable UI components, primarily based on `shadcn/ui`
- Atomic components composed into feature-specific implementations in consuming packages
- **shadcn/ subdirectory:** Contains scaffolded `shadcn/ui` components. Do not modify component internals; create wrapper components in adjacent directories instead
- **Best practice:** Extend shadcn components with wrapper components for project-specific behavior

### Hooks (`src/hooks/`)

- Reusable React hooks for common patterns (e.g., `use-mobile.ts`)
- Environment-agnostic logic that works across all packages
- Examples: responsive design hooks, local state management, custom React patterns

### Types (`src/types/`)

- TypeScript interfaces and types that define shared data structures
- Centralized definitions consumed across frontend, infrastructure, and backend layers
- Examples: `Task.ts`, `User.ts`, `Settings.ts`, `Component.ts`

### Utils (`src/utils/`)

- Pure utility functions and helpers
- Environment-agnostic (no browser or Node.js specific dependencies)
- Examples: `constants.ts`, `css.ts` (CSS class management via CVA), `numbers.ts` (numeric helpers)
- Reusable across all workspaces

### Styles (`src/styles/`)

- Global CSS styles and Tailwind CSS configuration
- Theme variables applied via CSS custom properties
- Configured with shadcn preset `b1FSRcurA` for consistent design system

## Usage

### Importing from Shared

Use workspace symlinks to import from this package in other workspaces:

```typescript
// In packages/web
import { Button } from '@react-starter/shared/components/shadcn/button';
import { useIsMobile } from '@react-starter/shared/hooks/use-mobile';
import type { Task } from '@react-starter/shared/types/task';
import { formatNumber } from '@react-starter/shared/utils/numbers';
```

**Never use relative paths** to import from this package. Always prefix the import with the workspace package name `@react-starter/shared`.

### Import Patterns

- **Import directly from source files** - this package does not use barrel files (`index.ts`)
- Imports target the exact file path within the source directory:

```typescript
// ✅ Correct: Import directly from the component file
import { Button } from '@react-starter/shared/components/shadcn/button';

// ✅ Correct: Import from types
import type { ComponentProps } from '@react-starter/shared/types/components';

// ❌ Avoid: Never use relative imports from other packages
import { Button } from '../../../shared/src/components/shadcn/button';
```

## Development

### Adding New Content

1. **Components:** Add shadcn components to `src/components/shadcn/` using the CLI command. Create wrapper components in adjacent directories for project-specific extensions.
2. **Hooks:** Define reusable hooks in `src/hooks/` with clear, descriptive names (use `camelCase` for hook files, e.g., `useGetTasks.ts`)
3. **Types:** Define interfaces in `src/types/` using clear, descriptive names and strong typing
4. **Utils:** Place pure utility functions in `src/utils/` (use `kebab-case` for utility file names, e.g., `format-date.ts`)
5. **Styles:** Add global styles and CSS variables to `src/styles/globals.css`

### Adding shadcn Components

For complete instructions on adding and configuring shadcn/ui components, including CLI commands, configuration details, and best practices, see the [shadcn Components Guide](../../docs/SHADCN_GUIDE.md).

Components are created in `src/components/shadcn/[component-name]`. Do not modify their internals; create wrapper components if you need to extend functionality.

### Testing

All exported code must have co-located unit tests following the AAA (Arrange, Act, Assert) pattern:

```bash
npm run test -w @react-starter/shared
```

Test file placement:

- Component tests: `src/components/[ComponentName].test.tsx`
- Hook tests: `src/hooks/useExample.test.ts`
- Utility tests: `src/utils/example.test.ts`

### Code Standards

- **Strict TypeScript:** Use `strict` mode; avoid `any` types
- **Naming Conventions:**
  - React components: `PascalCase` (e.g., `TaskCard.tsx`)
  - React hooks: `camelCase` (e.g., `useGetTasks.ts`)
  - TypeScript files and utilities: `kebab-case` (e.g., `format-date.ts`)
  - Test files: Same as source file with `.test` suffix (e.g., `format-date.test.ts`)
- **JSDoc comments:** Document all public exports
- **Test coverage:** Maintain 70%+ coverage on all modified files
- **Environment agnostic:** Do not include browser-specific (`window`, `document`) or Node.js-specific (`process`) code unless isolated in explicit type contexts

<br/>

---

:point_left: Return to the main project [README](../../README.md).
