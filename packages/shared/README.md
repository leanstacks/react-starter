# @react-starter/shared

Shared utilities, types, and components for the React Starter monorepo.

## Overview

This package provides the single source of truth for common structural interfaces, data models, Zod validation schemas, and reusable UI components used across all workspaces in the monorepo.

## What's Included

### Components (`src/components/`)

- Reusable UI components, primarily based on `shadcn/ui`
- Atomic components that can be composed into feature-specific implementations
- **Note:** Do not modify component internals inside `shadcn/` subdirectory; create wrapper components instead

### Models (`src/models/`)

- TypeScript interfaces and types that define data structures
- Shared across frontend, infrastructure, and backend layers
- Examples: `Task.ts`, `User.ts`, `Settings.ts`

### Schemas (`src/schemas/`)

- Zod validation schemas for runtime data validation
- Ensures type safety at API boundaries and form inputs
- Examples: `TaskSchema.ts`, `UserSchema.ts`

### Utils (`src/utils/`)

- Pure utility functions and helpers
- Environment-agnostic (no browser or Node.js specific dependencies)
- Reusable across all workspaces

## Usage

### Importing from Shared

Use workspace symlinks to import from this package in other workspaces:

```typescript
// In packages/web or packages/infra
import { TaskSchema } from '@react-starter/shared';
import { Button } from '@react-starter/shared';
import { formatDate } from '@react-starter/shared';
```

**Never use relative paths** to import from this package.

## Development

### Adding New Content

1. **Models:** Define interfaces in `src/models/` using clear, descriptive names
2. **Schemas:** Create corresponding Zod schemas in `src/schemas/` for validation
3. **Components:** Add shadcn components or wrappers in `src/components/`
4. **Utils:** Place pure utility functions in `src/utils/`

### Testing

All exported code must have co-located unit tests:

```bash
npm run test -w @react-starter/shared
```

### Code Standards

- Use TypeScript strict mode
- No `any` types; prefer specific interfaces
- Include JSDoc comments for public exports
- Maintain 70%+ test coverage

## Re-exporting Best Practices

Use barrel files to re-export public APIs to simplify imports in consuming packages.

```typescript
// ❌ Avoid
// Import directly in consuming packages
import { Task } from '@react-starter/shared/src/models/task';

// ✅ Preferred
// src/index.ts
export { Task } from './models/Task';
```
