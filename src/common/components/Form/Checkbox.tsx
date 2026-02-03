import { Control, FieldValues, Path, useController } from 'react-hook-form';
import { cva } from 'class-variance-authority';

import { BaseComponentProps } from 'common/utils/types';
import { cn } from 'common/utils/css';
import Label from './Label';
import FieldError from './FieldError';
import HelpText from '../Text/HelpText';
import FAIcon from '../Icon/FAIcon';

/**
 * Define the `Checkbox` component base and variant styles.
 */
const checkboxVariants = cva('flex size-4 appearance-none items-center justify-center rounded-sm', {
  variants: {
    checked: {
      true: 'bg-blue-600',
      false: 'bg-gray-300',
    },
    disabled: {
      true: 'cursor-not-allowed opacity-50',
      false: 'cursor-pointer',
    },
  },
  defaultVariants: {
    checked: false,
    disabled: false,
  },
});

/**
 * Properties for the `Checkbox` component.
 * @param {Control} control - Object containing methods for registering components
 * into React Hook Form.
 * @param {boolean} [disabled] - Optional. Indicates if the checkbox is disabled. Default: `false`
 * @param {string} label - The label text.
 * @param {string} name - Name of the form control.
 * @param {boolean} [required] - Optional. Indicates if the checkbox is required. Default: `false`
 * @param {string} [supportingText] - Optional. Help text or instructions.
 */
export interface CheckboxProps<T extends FieldValues> extends BaseComponentProps {
  control: Control<T>;
  disabled?: boolean;
  label: string;
  name: string;
  required?: boolean;
  supportingText?: string;
}

/**
 * The `Checkbox` component renders a button that serves as a checkbox input.
 * It is used to capture boolean input from a user.
 */
const Checkbox = <T extends FieldValues>({
  className,
  control,
  disabled = false,
  label,
  name,
  required = false,
  supportingText,
  testId = 'checkbox',
}: CheckboxProps<T>): JSX.Element => {
  const { field, fieldState } = useController({ control, name: name as Path<T> });
  const isChecked = field.value === true;

  const handleClick = () => {
    if (!disabled) {
      field.onChange(!isChecked);
    }
  };

  return (
    <div className={cn(className)} data-testid={testId}>
      <div className="mb-2 flex items-center gap-2">
        <button
          type="button"
          name={name}
          className={cn(checkboxVariants({ checked: isChecked, disabled }))}
          onClick={handleClick}
          role="checkbox"
          aria-labelledby={`${name}-label`}
          aria-checked={isChecked}
          aria-disabled={disabled}
          disabled={disabled}
          data-testid={`${testId}-button`}
        >
          {isChecked && <FAIcon icon="check" size="sm" fixedWidth className="text-white" testId={`${testId}-icon`} />}
        </button>
        <Label id={`${name}-label`} htmlFor={name} required={required} className="m-0" testId={`${testId}-label`}>
          {label}
        </Label>
      </div>
      <div className="flex flex-wrap items-center">
        <FieldError message={fieldState.error?.message} testId={`${testId}-error`} />
        {supportingText && <HelpText testId={`${testId}-supporting-text`}>{supportingText}</HelpText>}
      </div>
    </div>
  );
};

export default Checkbox;
