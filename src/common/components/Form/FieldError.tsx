import { cn } from 'common/utils/css';
import { BaseComponentProps } from 'common/utils/types';

/**
 * Properties for the `FieldError` component.
 * @param {string} [message] - The error message.
 * @see {@link BaseComponentProps}
 */
export interface FieldErrorProps extends BaseComponentProps {
  message?: string;
}

/**
 * The `FieldError` component renders a styled error message for a form field.
 * @param {FieldErrorProps} props - Component properties.
 * @returns JSX
 */
const FieldError = ({ className, message, testId = 'field-error' }: FieldErrorProps): JSX.Element | false => {
  if (message) {
    return (
      <div className={cn('me-1.5 inline-block text-sm text-red-600', className)} data-testid={testId}>
        {message}
      </div>
    );
  } else {
    return false;
  }
};

export default FieldError;
