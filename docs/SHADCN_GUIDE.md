# shadcn Components Guide

This guide provides information about using and configuring shadcn/ui components in the React Starter monorepo.

## Overview

[shadcn/ui](https://ui.shadcn.com/) is a collection of beautiful, accessible React components built with [Tailwind CSS](https://tailwindcss.com/) and [Radix UI](https://www.radix-ui.com/). Components are copy-pasted directly into your project, giving you full control over their implementation.

Unlike traditional component libraries, shadcn/ui provides high-quality, unstyled component primitives that you can customize to match your design system.

---

## Monorepo Structure

In this monorepo, shadcn/ui components are managed in the **`packages/shared`** workspace. The shared package serves as the centralized location for all reusable UI components, hooks, types, and utilities that are consumed by the `packages/web` frontend application.

- **Component Installation**: `packages/shared/src/components/shadcn/`
- **Component Wrappers**: `packages/shared/src/components/`
- **Shared Styling**: `packages/shared/src/styles/globals.css`
- **Web Component Aliases**: Web package imports components via `@react-starter/shared` workspace package name

---

## Configuration

### shadcn Configuration Files

shadcn is configured via `components.json` files in two packages:

#### 1. Shared Package Configuration

Located at: `packages/shared/components.json`

This is the primary configuration where shadcn components are installed.

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "radix-nova",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "src/styles/globals.css",
    "baseColor": "mist",
    "cssVariables": true,
    "prefix": ""
  },
  "iconLibrary": "lucide",
  "rtl": false,
  "aliases": {
    "components": "@react-starter/shared/components",
    "lib": "@react-starter/shared/utils",
    "hooks": "@react-starter/shared/hooks",
    "utils": "@react-starter/shared/utils/css",
    "ui": "@react-starter/shared/components/shadcn"
  }
}
```

#### 2. Web Package Configuration

Located at: `packages/web/components.json`

The web package configuration references the shared package for shadcn components and styling.

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "radix-nova",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "../shared/src/styles/globals.css",
    "baseColor": "mist",
    "cssVariables": true,
    "prefix": ""
  },
  "iconLibrary": "lucide",
  "rtl": false,
  "aliases": {
    "components": "@/common/components",
    "hooks": "@/common/hooks",
    "lib": "@/common/utils",
    "utils": "@react-starter/shared/utils/css",
    "ui": "@react-starter/shared/components/shadcn"
  }
}
```

### Key Configuration Details

| Property                | Value           | Description                               |
| ----------------------- | --------------- | ----------------------------------------- |
| `style`                 | `radix-nova`    | The design style to use for components    |
| `rsc`                   | `false`         | React Server Components are not enabled   |
| `tsx`                   | `true`          | Components are generated in TypeScript    |
| `tailwind.css`          | Shared location | Main Tailwind CSS entry point (shared)    |
| `tailwind.cssVariables` | `true`          | CSS variables are used for theming        |
| `tailwind.baseColor`    | `mist`          | Base color palette for the theme          |
| `iconLibrary`           | `lucide`        | Icon library to use (Lucide icons)        |
| `aliases`               | See above       | Import path aliases for organized imports |

---

## Component Styling

### CSS Variables System

shadcn components use CSS custom properties (variables) for theming. All styling variables are centralized in `packages/shared/src/styles/globals.css` using the OKLCH color model for a modern, perceptually-uniform color space.

#### Light Mode Variables

```css
:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.148 0.004 228.8);
  --primary: oklch(0.488 0.243 264.376);
  --primary-foreground: oklch(0.97 0.014 254.604);
  --secondary: oklch(0.967 0.001 286.375);
  --secondary-foreground: oklch(0.21 0.006 285.885);
  --destructive: oklch(0.577 0.245 27.325);
  --ring: oklch(0.723 0.014 214.4);
  --border: oklch(0.925 0.005 214.3);
  --input: oklch(0.925 0.005 214.3);
  /* ... additional variables ... */
}
```

#### Dark Mode Variables

```css
.dark {
  --background: oklch(0.148 0.004 228.8);
  --foreground: oklch(0.987 0.002 197.1);
  --primary: oklch(0.424 0.199 265.638);
  --primary-foreground: oklch(0.97 0.014 254.604);
  --secondary: oklch(0.274 0.006 286.033);
  --secondary-foreground: oklch(0.985 0 0);
  /* ... additional variables ... */
}
```

### Customizing Component Styles

Components can be customized by modifying CSS variables in `packages/shared/src/styles/globals.css`:

1. **Update the CSS variable value:**

   ```css
   :root {
     --primary: oklch(0.488 0.243 264.376); /* Current value */
     --primary: oklch(0.5 0.2 35); /* New value */
   }
   ```

2. **Override component-specific styles in component files:**

   ```typescript
   // packages/shared/src/components/Alert/ErrorAlert.tsx
   import { Alert as ShadcnAlert } from '@react-starter/shared/components/shadcn/alert';

   export const Alert = (props) => {
     return (
       <ShadcnAlert
         className="custom-class"
         {...props}
       />
     );
   };
   ```

3. **Use Tailwind utilities for one-off customizations:**

   ```typescript
   <Button className="bg-red-500 hover:bg-red-600">
     Delete Item
   </Button>
   ```

### Color Palette Reference

#### Semantic Colors

| Variable        | Usage                                 |
| --------------- | ------------------------------------- |
| `--background`  | Page and container backgrounds        |
| `--foreground`  | Primary text color                    |
| `--primary`     | Primary action buttons and highlights |
| `--secondary`   | Secondary UI elements                 |
| `--destructive` | Delete/error actions and states       |
| `--muted`       | Disabled or secondary text            |
| `--accent`      | Accent elements and highlights        |

#### Component-Specific Colors

| Variable    | Usage                            |
| ----------- | -------------------------------- |
| `--card`    | Card component background        |
| `--popover` | Dropdown and popover backgrounds |
| `--input`   | Form input backgrounds           |
| `--border`  | Border colors for all elements   |
| `--ring`    | Focus ring and outline colors    |

#### Chart Colors

Six dedicated chart colors (`--chart-1` through `--chart-5`) are provided for data visualization components.

---

## CLI Commands

### Add Components

The `add` command installs new shadcn components into the shared package.

**Run commands from the `packages/shared` directory:**

```bash
cd packages/shared
npx shadcn@latest add <component-name>
```

**Example: Install Button Component**

```bash
cd packages/shared
npx shadcn@latest add button
```

This command:

- Installs the Button component to `packages/shared/src/components/shadcn/button.tsx`
- Adds all required dependencies to `packages/shared/package.json`
- Verifies Tailwind CSS compatibility

**Install Multiple Components**

```bash
cd packages/shared
npx shadcn@latest add button input label dialog
```

**Available Components**

For a full list of available components, visit the [shadcn/ui components library](https://ui.shadcn.com/docs/components).

### View Component Documentation

The `docs` command opens component documentation in your browser.

```bash
cd packages/shared
npx shadcn@latest docs <component-name>
```

**Example: View Button Documentation**

```bash
cd packages/shared
npx shadcn@latest docs button
```

This opens the official shadcn/ui documentation for the Button component, including:

- Component API reference
- Usage examples
- Customization options
- Accessibility features

### Get Component Information

The `info` command displays component details including dependencies, installation status, and file location.

```bash
cd packages/shared
npx shadcn@latest info <component-name>
```

**Example: Get Button Info**

```bash
cd packages/shared
npx shadcn@latest info button
```

Output example:

```
Component: Button
Status: Installed
Location: packages/shared/src/components/shadcn/button.tsx
Dependencies: clsx, class-variance-authority
```

---

## Best Practices

### Component Placement

The monorepo follows a clear separation of concerns for component organization:

**In `packages/shared`:**

- **UI Components**: Read-only shadcn components are installed in `packages/shared/src/components/shadcn/`
- **Wrapper Components**: Create wrapper/extension components in `packages/shared/src/components/` that extend shadcn functionality for reuse
- **Shared Hooks**: Feature-isolated or reusable hooks in `packages/shared/src/hooks/`
- **Shared Types**: Unified type definitions in `packages/shared/src/types/`

**In `packages/web`:**

- **Common Components**: App-wide wrapper components in `packages/web/src/common/components/` (when specific to web, not shared)
- **Page Components**: Feature-specific components in `packages/web/src/pages/*/components/`
- **Web-specific Hooks**: App-wide utility hooks in `packages/web/src/common/hooks/`

### Importing Shared Components in Web

When using shared components in the web package, import using the workspace package name:

```typescript
// In packages/web/src/...

// ✅ Correct: Use workspace package name
import { ErrorAlert } from '@react-starter/shared/components/Alert';
import { useMobile } from '@react-starter/shared/hooks/use-mobile';

// ❌ Incorrect: Do not use relative imports
import { ErrorAlert } from '../../../shared/src/components/Alert';
```

### Wrapping shadcn Components

**Only wrap shadcn components when you need to adjust their behavior.** For style, variant, or CVA configuration changes, modify the component directly in `packages/shared/src/components/shadcn/` instead. This keeps base components clean and centralizes visual variants in one place.

#### Example: Alert Components

The project provides a great example of this pattern with the Alert components:

**When NOT to Wrap — Modify Variants/Styles Directly:**

The base [shadcn Alert component](../../packages/shared/src/components/shadcn/alert.tsx) defines all visual variants (default, destructive, success, warning) and style configurations directly using CVA:

```typescript
const alertVariants = cva('group/alert relative grid w-full gap-0.5 rounded-lg border px-2.5 py-2 ...', {
  variants: {
    variant: {
      default: 'bg-card text-card-foreground',
      destructive: 'bg-card text-destructive *:[svg]:text-current',
      success: 'bg-card text-success *:[svg]:text-current',
      warning: 'bg-card text-warning *:[svg]:text-current',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});
```

Style and variant adjustments stay here, not in wrapper components.

**When to Wrap — Add Behavior/Functionality:**

The [ErrorAlert wrapper](../../packages/shared/src/components/Alert/ErrorAlert.tsx) extends the Alert for a specific use case by adding optional title handling and structured error presentation:

```typescript
const ErrorAlert = ({ className, description, testId = 'alert-error', title, ...props }: ErrorAlertProps) => {
  return (
    <Alert variant="destructive" className={cn(className)} data-testId={testId} {...props}>
      <AlertCircleIcon />
      {title && <AlertTitle data-testId={`${testId}-title`}>{title}</AlertTitle>}
      <AlertDescription data-testId={`${testId}-description`}>{description}</AlertDescription>
    </Alert>
  );
};
```

This wrapper adds behavior-specific logic while reusing the base Alert's styles and CVA configuration.

#### General Pattern

Follow this approach for all shadcn components:

- **Modify the shadcn component** (`packages/shared/src/components/shadcn/*.tsx`) for all visual customizations, variants, and CVA configuration
- **Create a wrapper** (`packages/shared/src/components/ComponentName/*.tsx`) only when adding behavior, functionality, or context-specific logic

### Testing shadcn Components

When testing components that use shadcn:

1. **Use `data-testid` attributes** for selecting elements:

   ```typescript
   <Button data-testid="submit-button">Submit</Button>
   ```

2. **Query elements using `screen` from React Testing Library**:

   ```typescript
   const button = screen.getByTestId('submit-button');
   expect(button).toBeInTheDocument();
   ```

3. **Test with appropriate providers** (Theme, Query Client, etc.):

   ```typescript
   import { WithAllProviders } from '@react-starter/web/test/wrappers';

   render(<MyComponent />, { wrapper: WithAllProviders });
   ```

---

## Common Workflows

### Adding a New Component to Shared

1. **Navigate to the shared package and install the component using the CLI:**

   ```bash
   cd packages/shared
   npx shadcn@latest add dialog
   ```

2. **View the documentation:**

   ```bash
   cd packages/shared
   npx shadcn@latest docs dialog
   ```

3. **Create a wrapper component** (if needed):

   ```typescript
   // packages/shared/src/components/Dialog/Dialog.tsx
   import { Dialog, DialogContent, DialogTrigger } from '@react-starter/shared/components/shadcn/dialog';

   export { Dialog, DialogContent, DialogTrigger };
   ```

4. **Use in the web app:**

   ```typescript
   // packages/web/src/pages/tasks/components/TaskDialog.tsx
   import { Dialog, DialogContent, DialogTrigger } from '@react-starter/shared/components/Dialog';

   export function TaskDialog() {
     return (
       <Dialog>
         <DialogTrigger>Open Dialog</DialogTrigger>
         <DialogContent>
           <h2>Dialog Title</h2>
           <p>Dialog content goes here.</p>
         </DialogContent>
       </Dialog>
     );
   }
   ```

### Customizing Component Appearance

1. **Identify the CSS variable** used by the component (check component source)
2. **Update the variable** in `packages/shared/src/styles/globals.css`:

   ```css
   :root {
     --primary: oklch(0.5 0.2 35); /* Changed from original */
   }
   ```

3. **Test changes** by running the development server

   ```bash
   npm run dev -w packages/web
   ```

---

## Resources

- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Radix UI Primitives](https://www.radix-ui.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [OKLCH Color Model](https://oklch.com/)

<br/>

---

:point_left: Return to [Documentation](./README.md).
