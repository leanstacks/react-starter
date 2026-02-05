import { PropsWithChildren } from 'react';
import { cva, VariantProps } from 'class-variance-authority';

import { BaseComponentProps } from 'common/utils/types';
import { cn } from 'common/utils/css';

/**
 * Define the component base and variant styles.
 */
const variants = cva('rounded-full font-bold', {
  variants: {
    size: {
      sm: 'px-1 py-0.5 text-[10px] leading-none',
      md: 'px-2 py-1 leading-none',
      lg: 'px-3 py-1.5 text-lg leading-none',
    },
    variant: {
      danger: 'bg-red-600 dark:bg-red-700 dark:opacity-75 text-white',
      info: 'bg-neutral-200/90 text-slate-900',
      primary: 'bg-blue-600/90 text-white',
      success: 'bg-green-800/90 text-white',
      warning: 'bg-amber-400/90 text-slate-900',
    },
    uppercase: {
      false: '',
      true: 'uppercase',
    },
  },
  defaultVariants: { size: 'md', variant: 'danger', uppercase: false },
});

/**
 * The variant attributes of the Badge component.
 */
type BadgeVariants = VariantProps<typeof variants>;

/**
 * Properties for the `Badge` React component.
 */
export interface BadgeProps extends BaseComponentProps, PropsWithChildren, BadgeVariants {}

/**
 * The `Badge` component highlights a notification, a count, or a piece status
 * information.
 */
const Badge = ({ children, className, size, testId = 'badge', variant, uppercase }: BadgeProps) => {
  return (
    <div className={cn(variants({ size, variant, uppercase, className }))} data-testid={testId}>
      {children}
    </div>
  );
};

export default Badge;
