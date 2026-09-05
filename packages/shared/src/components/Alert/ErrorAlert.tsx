import { AlertCircleIcon } from 'lucide-react';

import { cn } from '@react-starter/shared/utils/css';
import { Alert, AlertDescription, AlertTitle } from '@react-starter/shared/components/shadcn/alert';
import { BaseComponentProps } from '@react-starter/shared/types/components';

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
export const ErrorAlert = ({ className, description, testId = 'alert-error', title, ...props }: ErrorAlertProps) => {
  return (
    <Alert variant="destructive" className={cn(className)} data-testid={testId} {...props}>
      <AlertCircleIcon />
      {title && <AlertTitle data-testid={`${testId}-title`}>{title}</AlertTitle>}
      <AlertDescription data-testid={`${testId}-description`}>{description}</AlertDescription>
    </Alert>
  );
};
