import { LabelHTMLAttributes } from 'react';
import { cva } from 'class-variance-authority';

import { cn } from 'common/utils/css';
import { BaseComponentProps } from 'common/utils/types';

/**
 * Define the `Label` component base and variant styles.
 */
const labelVariants = cva('mb-1 block text-sm', {
  variants: {
    required: {
      true: 'font-bold after:content-["*"]',
      false: 'font-medium',
    },
  },
  defaultVariants: {
    required: false,
  },
});

/**
 * Properties for the `Label` component.
 * @param {boolean} [required] - Optional. Indicates if the label is for a required field.
 * Default: `false`
 * @see {@link BaseComponentProps}
 * @see {@link LabelHTMLAttributes}
 */
export interface LabelProps extends BaseComponentProps, LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

/**
 * The `Label` component renders a HTML `label` element. It is used to describe
 * a form control.
 */
const Label = ({ children, className, required = false, testId = 'label', ...props }: LabelProps): JSX.Element => {
  return (
    <label className={cn(labelVariants({ required }), className)} data-testid={testId} {...props}>
      {children}
    </label>
  );
};

export default Label;
