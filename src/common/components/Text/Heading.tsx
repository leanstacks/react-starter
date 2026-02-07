import { HTMLAttributes } from 'react';
import { cva, VariantProps } from 'class-variance-authority';

import { BaseComponentProps } from 'common/utils/types';
import { cn } from 'common/utils/css';

/**
 * Defines the types of heading elements.
 */
type HeadingType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

/**
 * Define the component base and variant styles.
 */
const variants = cva('', {
  variants: {
    level: {
      1: 'text-4xl font-light',
      2: 'text-2xl',
      3: 'text-xl font-bold',
      4: 'font-bold',
      5: 'font-sm italic',
      6: 'font-sm uppercase',
    },
  },
  defaultVariants: { level: 2 },
});

/**
 * The variant attributes of the Heading component.
 */
type HeadingVariants = VariantProps<typeof variants>;

/**
 * Properties for the `Heading` component.
 */
export interface HeadingProps extends BaseComponentProps, HeadingVariants, HTMLAttributes<HTMLHeadingElement> {}

/**
 * The `Heading` component formats heading blocks.  The component supports
 * traditional HTML heading levels 1 through 6.
 */
const Heading = ({ className, level, testId = 'heading', ...props }: HeadingProps) => {
  const HeadingElement: HeadingType = level ? `h${level}` : 'h2';

  return <HeadingElement className={cn(variants({ level, className }))} data-testid={testId} {...props} />;
};

export default Heading;
