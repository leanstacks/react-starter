import { ButtonHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { PropsWithTestId } from 'common/utils/types';
import { cn } from 'common/utils/css';

/**
 * Define the component base and variant styles.
 */
const variants = cva(
  'flex items-center justify-center gap-2 rounded-md border enabled:hover:opacity-80 disabled:opacity-50 cursor-pointer',
  {
    variants: {
      variant: {
        solid:
          'border-neutral-700 bg-neutral-700 text-white dark:border-neutral-300 dark:bg-neutral-300 dark:text-neutral-900',
        outline: 'border-neutral-700 dark:border-neutral-300',
        text: 'border-transparent',
      },
      size: {
        sm: 'h-9 px-3 text-sm',
        md: 'h-10 px-4',
        lg: 'h-11 px-8',
        icon: 'h-auto p-0',
      },
    },
    defaultVariants: { variant: 'solid', size: 'md' },
  },
);

/**
 * The variant attributes of the Button component.
 */
type ButtonVariants = VariantProps<typeof variants>;

/**
 * Properties for the `Button` component.
 * @see {@link ButtonHTMLAttributes}
 * @see {@link ButtonVariants}
 * @see {@link PropsWithTestId}
 */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, ButtonVariants, PropsWithTestId {}

/**
 * The `Button` React component formats and renders a styled button.
 * @param {ButtonProps} props - Component properties, `ButtonProps`.
 */
const Button = ({
  className,
  role = 'button',
  size,
  type = 'button',
  variant,
  testId = 'button',
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(variants({ size, variant, className }))}
      data-testid={testId}
      role={role}
      type={type}
      {...props}
    />
  );
};

export default Button;
