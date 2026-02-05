import { PropsWithChildren } from 'react';
import { cva, VariantProps } from 'class-variance-authority';

import { cn } from 'common/utils/css';
import { BaseComponentProps } from 'common/utils/types';

/**
 * Define the component base and variant styles.
 */
const variants = cva('', {
  variants: {
    variant: {
      danger: 'text-red-600/80',
      info: 'text-cyan-600/80',
      warning: 'text-amber-600/80',
    },
  },
  defaultVariants: {
    variant: 'info',
  },
});

/**
 * The variant attributes of the Text component.
 */
type TextVariants = VariantProps<typeof variants>;

/**
 * Properties for the `Text` React component.
 */
export interface TextProps extends BaseComponentProps, PropsWithChildren, TextVariants {}

/**
 * The `Text` component displays styled text based upon the selected `variant`.
 */
const Text = ({ children, className, testId = 'text', variant }: TextProps) => {
  return (
    <span className={cn(variants({ variant, className }))} data-testid={testId}>
      {children}
    </span>
  );
};

export default Text;
