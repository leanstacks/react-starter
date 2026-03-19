import { AlertCircleIcon } from 'lucide-react';

import { cn } from 'common/utils/css';
import { Alert, AlertDescription, AlertTitle } from '../shadcn/alert';
import { BaseComponentProps } from 'common/utils/types';

/**
 * Properties for the `ErrorAlert` component.
 */
export interface ErrorAlertProps extends BaseComponentProps {
  title?: string;
  description: string;
}

/**
 * The `ErrorAlert` component renders a bespoke `Alert` layout for error
 * messages.
 */
const ErrorAlert = ({ className, description, testId = 'alert-error', title, ...props }: ErrorAlertProps) => {
  return (
    <Alert variant="destructive" className={cn(className)} data-testid={testId} {...props}>
      <AlertCircleIcon />
      {title && <AlertTitle data-testid={`${testId}-title`}>{title}</AlertTitle>}
      <AlertDescription data-testid={`${testId}-description`}>{description}</AlertDescription>
    </Alert>
  );
};

export default ErrorAlert;
