import { cn } from 'common/utils/css';
import { FAIconProps } from '../Icon/FAIcon';
import Alert, { AlertProps } from './Alert';

/**
 * Properties for the `ErrorAlert` component.
 */
export interface ErrorAlertProps extends Omit<AlertProps, 'variant'>, Partial<Pick<FAIconProps, 'icon'>> {
  title?: string;
  description: string;
}

/**
 * The `ErrorAlert` component renders a bespoke `Alert` layout for error
 * messages.
 */
const ErrorAlert = ({
  className,
  description,
  icon = 'circleExclamation',
  testId = 'alert-error',
  title,
  ...props
}: ErrorAlertProps): JSX.Element => {
  return (
    <Alert variant="danger" className={cn(className)} testId={testId} {...props}>
      <Alert.Icon icon={icon} testId={`${testId}-icon`} />
      {title && <Alert.Title testId={`${testId}-title`}>{title}</Alert.Title>}
      <Alert.Description testId={`${testId}-description`}>{description}</Alert.Description>
    </Alert>
  );
};

export default ErrorAlert;
