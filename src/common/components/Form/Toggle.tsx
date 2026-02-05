import { Control, FieldValues, Path, useController } from 'react-hook-form';

import { BaseComponentProps } from 'common/utils/types';
import { cn } from 'common/utils/css';
import FAIcon from '../Icon/FAIcon';
import Label from './Label';
import FieldError from './FieldError';
import HelpText from '../Text/HelpText';
import Button from '../Button/Button';

/**
 * Properties for the `Toggle` component.
 * @param {Control} control - Object containing methods for registering components
 * into React Hook Form.
 * @param {boolean} [disabled] - Indicates if the toggle is disabled. Default: false.
 * @param {string} [label] - Optional. The label text to display.
 * @param {string} name - Name of the form control.
 * @param {boolean} [required] - Indicates if the toggle is required. Default: false.
 * @param {string} [supportingText] - Optional. Help text or instructions.
 *
 * @see {@link BaseComponentProps}
 */
export interface ToggleProps<T extends FieldValues> extends BaseComponentProps {
  control: Control<T>;
  disabled?: boolean;
  label?: string;
  name: string;
  required?: boolean;
  supportingText?: string;
}

/**
 * The `Toggle` component renders a button form control which may be used for
 * binary (true/false) inputs.
 */
const Toggle = <T extends FieldValues>({
  className,
  control,
  disabled = false,
  label,
  name,
  required = false,
  supportingText,
  testId = 'toggle',
}: ToggleProps<T>) => {
  const { field, fieldState } = useController({ control, name: name as Path<T> });

  const handleClick = () => {
    field.onChange(!field.value);
  };

  return (
    <div className={cn(className)} data-testid={testId}>
      {!!label && (
        <Label htmlFor={name} required={required} testId={`${testId}-label`}>
          {label}
        </Label>
      )}
      <Button
        id={name}
        variant="text"
        onClick={handleClick}
        disabled={disabled}
        aria-label={label}
        testId={`${testId}-button`}
      >
        {field.value ? (
          <FAIcon icon="toggleOn" size="2xl" fixedWidth testId={`${testId}-icon-on`} />
        ) : (
          <FAIcon icon="toggleOff" size="2xl" fixedWidth testId={`${testId}-icon-off`} />
        )}
      </Button>
      <FieldError message={fieldState.error?.message} testId={`${testId}-error`} />
      {!!supportingText && <HelpText testId={`${testId}-supporting-text`}>{supportingText}</HelpText>}
    </div>
  );
};

export default Toggle;
