import { PropsWithChildren } from 'react';
import { cva, VariantProps } from 'class-variance-authority';

import { BaseComponentProps } from 'common/utils/types';
import { cn } from 'common/utils/css';
import FAIcon, { FAIconProps } from '../Icon/FAIcon';

/**
 * Define the `Alert` component base and variant styles.
 */
const alertVariants = cva('relative rounded-md p-3 *:data-icon:absolute [&>svg~*]:ps-8', {
  variants: {
    variant: {
      danger: 'bg-red-800/90 text-white/80',
      info: 'bg-neutral-200/90 text-slate-900',
      success: 'bg-green-800/90 text-white/80',
      warning: 'bg-amber-400/90 text-slate-900',
    },
  },
  defaultVariants: { variant: 'info' },
});

/**
 * Properties for the `Alert` component.
 */
export interface AlertProps extends BaseComponentProps, PropsWithChildren, VariantProps<typeof alertVariants> {}

/**
 * The `Alert` component formats and renders a styled message. Use the
 * `variant` property to apply predefined styles.
 *
 * Compose an Alert using of combinations of: `Icon`, `Title`, and `Description`.
 *
 * **Example:**
 * ```
  <Alert variant="danger" className="my-4" testId="task-create-alert">
    <Alert.Icon icon="circleExclamation" />
    <Alert.Title>Unable to create task</Alert.Title>
    <Alert.Description>{error.message}</Alert.Description>
  </Alert>
 * ```
 */
const Alert = ({ children, className, variant = 'info', testId = 'alert' }: AlertProps): JSX.Element => {
  return (
    <div className={cn(alertVariants({ variant, className }))} role="alert" data-testid={testId}>
      {children}
    </div>
  );
};

/**
 * The `Title` component renders the styled title text for an `Alert`.
 */
const Title = ({
  children,
  className,
  testId = 'alert-title',
}: BaseComponentProps & PropsWithChildren): JSX.Element => {
  return (
    <div className={cn('mb-1 text-xl leading-none font-bold', className)} data-testid={testId}>
      {children}
    </div>
  );
};
Alert.Title = Title;

/**
 * The `Description` component renders the styled description text for an `Alert`.
 */
const Description = ({
  children,
  className,
  testId = 'alert-description',
}: BaseComponentProps & PropsWithChildren): JSX.Element => {
  return (
    <div className={cn('leading-tight', className)} data-testid={testId}>
      {children}
    </div>
  );
};
Alert.Description = Description;

/**
 * The `Icon` component renders the styled icon for an `Alert`.
 */
const Icon = ({ size = 'lg', testId = 'alert-icon', ...props }: FAIconProps): JSX.Element => {
  return <FAIcon size={size} testId={testId} {...props} />;
};
Alert.Icon = Icon;

export default Alert;
