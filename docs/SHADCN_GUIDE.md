# shadcn Components Guide

This guide provides information about using and configuring shadcn/ui components in the React Starter project.

## Overview

[shadcn/ui](https://ui.shadcn.com/) is a collection of beautiful, accessible React components built with [Tailwind CSS](https://tailwindcss.com/) and [Radix UI](https://www.radix-ui.com/). Components are copy-pasted directly into your project, giving you full control over their implementation.

Unlike traditional component libraries, shadcn/ui provides high-quality, unstyled component primitives that you can customize to match your design system.

---

## Configuration

### shadcn Configuration File

shadcn is configured via the `components.json` file in the root directory. This file controls component installation, styling, and import aliases.

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "radix-nova",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "src/index.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "iconLibrary": "lucide",
  "rtl": false,
  "aliases": {
    "components": "src/common/components",
    "utils": "src/common/utils/css",
    "ui": "src/common/components/shadcn",
    "lib": "src/common/utils",
    "hooks": "src/common/hooks"
  }
}
```

#### Key Configuration Details

| Property                | Value           | Description                               |
| ----------------------- | --------------- | ----------------------------------------- |
| `style`                 | `radix-nova`    | The design style to use for components    |
| `rsc`                   | `false`         | React Server Components are not enabled   |
| `tsx`                   | `true`          | Components are generated in TypeScript    |
| `tailwind.css`          | `src/index.css` | Main Tailwind CSS entry point             |
| `tailwind.cssVariables` | `true`          | CSS variables are used for theming        |
| `tailwind.baseColor`    | `neutral`       | Base color palette for the theme          |
| `iconLibrary`           | `lucide`        | Icon library to use (Lucide icons)        |
| `aliases`               | See below       | Import path aliases for organized imports |

---

## Component Styling

### CSS Variables System

shadcn components use CSS custom properties (variables) for theming. All styling variables are defined in `src/index.css` using the OKLCH color model for a modern, perceptually-uniform color space.

#### Light Mode Variables

```css
:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --secondary: oklch(0.97 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --ring: oklch(0.708 0 0);
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  /* ... additional variables ... */
}
```

#### Dark Mode Variables

```css
.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --primary: oklch(0.922 0 0);
  --secondary: oklch(0.269 0 0);
  /* ... additional variables ... */
}
```

### Customizing Component Styles

Components can be customized by modifying CSS variables:

1. **Update the CSS variable value:**

   ```css
   :root {
     --primary: oklch(0.205 0 0); /* Current value */
     --primary: oklch(0.5 0.2 35); /* New value */
   }
   ```

2. **Override component-specific styles in component files:**

   ```typescript
   // src/common/components/Button/Button.tsx
   import { Button as ShadcnButton } from 'common/components/shadcn/button';

   export const Button = (props) => {
     return (
       <ShadcnButton
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

The `add` command installs new shadcn components into your project.

```bash
npx shadcn@latest add <component-name>
```

**Example: Install Button Component**

```bash
npx shadcn@latest add button
```

This command:

- Installs the Button component to `src/common/components/shadcn/button.tsx`
- Adds all required dependencies to `package.json`
- Verifies Tailwind CSS compatibility

**Install Multiple Components**

```bash
npx shadcn@latest add button input label dialog
```

**Available Components**

For a full list of available components, visit the [shadcn/ui components library](https://ui.shadcn.com/docs/components).

### View Component Documentation

The `docs` command opens component documentation in your browser.

```bash
npx shadcn@latest docs <component-name>
```

**Example: View Button Documentation**

```bash
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
npx shadcn@latest info <component-name>
```

**Example: Get Button Info**

```bash
npx shadcn@latest info button
```

Output example:

```
Component: Button
Status: Installed
Location: src/common/components/shadcn/button.tsx
Dependencies: clsx, class-variance-authority
```

---

## Best Practices

### Component Placement

- **UI Components**: Read-only shadcn components are installed in `src/common/components/shadcn/`
- **Wrapper Components**: Create wrapper components in `src/common/components/` that extend shadcn functionality
- **Page Components**: Import shadcn and wrapper components in `src/pages/*/components/`

### Wrapping shadcn Components

**Only wrap shadcn components when you need to adjust their behavior.** For style, variant, or CVA configuration changes, modify the component directly in `src/common/components/shadcn/` instead. This keeps base components clean and centralizes visual variants in one place.

#### Example: Alert Components

The project provides a great example of this pattern with the Alert components:

**When NOT to Wrap — Modify Variants/Styles Directly:**

The base [shadcn Alert component](src/common/components/shadcn/alert.tsx) defines all visual variants (default, destructive, success, warning) and style configurations directly using CVA:

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

The [ErrorAlert wrapper](src/common/components/Alert/ErrorAlert.tsx) extends the Alert for a specific use case by adding optional title handling and structured error presentation:

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

- **Modify the shadcn component** (`src/common/components/shadcn/*.tsx`) for all visual customizations, variants, and CVA configuration
- **Create a wrapper** (`src/common/components/ComponentName/*.tsx`) only when adding behavior, functionality, or context-specific logic

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
   import { WithAllProviders } from '@/test/wrappers';

   render(<MyComponent />, { wrapper: WithAllProviders });
   ```

---

## Common Workflows

### Adding a New Component

1. **Install the component using the CLI:**

   ```bash
   npx shadcn@latest add dialog
   ```

2. **View the documentation:**

   ```bash
   npx shadcn@latest docs dialog
   ```

3. **Create a wrapper component** (if needed):

   ```typescript
   // src/common/components/Dialog/Dialog.tsx
   import { Dialog, DialogContent, DialogTrigger } from 'common/components/shadcn/dialog';

   export { Dialog, DialogContent, DialogTrigger };
   ```

4. **Use in your app:**

   ```typescript
   import { Dialog, DialogContent, DialogTrigger } from '@/components/Dialog';

   export function MyDialog() {
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
2. **Update the variable** in `src/index.css`:

   ```css
   :root {
     --primary: oklch(0.5 0.2 35); /* Changed from original */
   }
   ```

3. **Test changes** by running the development server

---

## Resources

- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Radix UI Primitives](https://www.radix-ui.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [OKLCH Color Model](https://oklch.com/)

---

:point_left: Return to [Documentation](./README.md).
