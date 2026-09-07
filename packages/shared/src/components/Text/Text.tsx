import { cva, VariantProps } from 'class-variance-authority';

import { cn } from '@react-starter/shared/utils/css';

/**
 * Define the component base and variant styles.
 */
const textVariants = cva('', {
  variants: {
    variant: {
      danger: 'text-destructive',
      info: 'text-muted',
      warning: 'text-amber-600/80',
    },
  },
  defaultVariants: {
    variant: 'info',
  },
});

/**
 * The `Text` component displays styled text based upon the selected `variant`. Useful for
 * consistently applying text styles across the application.
 *
 * **Example usage:**
 * ```tsx
 * <Text variant="danger">This is a danger text</Text>
 * <Text variant="info">This is an info text</Text>
 * <Text variant="warning">This is a warning text</Text>
 * ```
 */
const Text = ({ className, variant, ...props }: React.ComponentProps<'span'> & VariantProps<typeof textVariants>) => {
  return <span className={cn(textVariants({ variant, className }))} {...props} />;
};

export { Text };
