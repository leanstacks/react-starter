import { createContext, InputHTMLAttributes, useContext } from 'react';
import { Control, FieldValues, Path, useController } from 'react-hook-form';
import { cva } from 'class-variance-authority';
import noop from 'lodash/noop';

import { PropsWithTestId } from 'common/utils/types';
import { cn } from 'common/utils/css';
import Label from './Label';
import FieldError from './FieldError';
import HelpText from '../Text/HelpText';
import FAIcon from '../Icon/FAIcon';

/**
 * Defines the shape of the `RadioGroupContext` value.
 * This context is used to share state and methods between the `RadioGroup`
 * and its items.
 */
type RadioGroupContextValue = {
  disabled?: boolean;
  name: string;
  setValue: (val: string) => void;
  value?: string;
};

/**
 * The `RadioGroupContext` instance.
 */
const RadioGroupContext = createContext<RadioGroupContextValue>({
  disabled: false,
  name: '',
  setValue: noop,
  value: undefined,
});

/**
 * Define the `RadioGroup` options list base and variant styles.
 */
const radioGroupOptionsVariants = cva('flex', {
  variants: {
    orientation: {
      horizontal: 'flex-row gap-8',
      vertical: 'flex-col gap-2',
    },
  },
  defaultVariants: {
    orientation: 'vertical',
  },
});

/**
 * Properties for the `RadioGroup` component.
 * @param {Control} control - Object containing methods for registering components
 * into React Hook Form.
 * @param {string} [label] - Optional. The label text to display.
 * @param {string} name - Name of the form control.
 * @param {string} [orientation] - Optional. Orientation of the radio group.
 * @param {string} [supportingText] - Optional. Help text or instructions.
 * @see {@link PropsWithTestId}
 * @see {@link InputHTMLAttributes}
 */
export interface RadioGroupProps<T extends FieldValues>
  extends Pick<InputHTMLAttributes<HTMLInputElement>, 'children' | 'className' | 'disabled' | 'required'>,
    PropsWithTestId {
  control: Control<T>;
  label?: string;
  name: string;
  orientation?: 'horizontal' | 'vertical';
  supportingText?: string;
}

/**
 * The `RadioGroup` component renders a group of radio buttons. It is used to
 * capture a single choice from a set of options.
 */
const RadioGroup = <T extends FieldValues>({
  children,
  className,
  control,
  disabled = false,
  label,
  name,
  orientation = 'vertical',
  required = false,
  supportingText,
  testId = 'radio-group',
}: RadioGroupProps<T>) => {
  const { field, fieldState } = useController({ control, name: name as Path<T> });

  return (
    <div className={cn('flex flex-col gap-2', className)} data-testid={testId}>
      {!!label && (
        <Label htmlFor={name} required={required} className="mb-0" testId={`${testId}-label`}>
          {label}
        </Label>
      )}
      <RadioGroupContext.Provider
        value={{
          disabled,
          name,
          setValue: field.onChange,
          value: field.value,
        }}
      >
        <div className={cn(radioGroupOptionsVariants({ orientation }))}>{children}</div>
      </RadioGroupContext.Provider>
      <div>
        <FieldError message={fieldState.error?.message} testId={`${testId}-error`} />
        {!!supportingText && <HelpText testId={`${testId}-supporting-text`}>{supportingText}</HelpText>}
      </div>
    </div>
  );
};

/**
 * Define the `RadioGroup` item base and variant styles.
 */
const radioGroupItemVariants = cva('flex items-center', {
  variants: {
    disabled: {
      true: 'opacity-50 cursor-not-allowed',
      false: 'cursor-pointer',
    },
  },
  defaultVariants: {
    disabled: false,
  },
});

/**
 * Properties for the `RadioGroup.Item` component.
 * @param {string} [className] - Optional. Additional class names.
 * @param {boolean} [disabled] - Optional. Disables the radio button.
 * @param {string} id - Required. The unique identifier for the radio button.
 * @param {string} label - The label text for the radio button.
 * @param {string} [testId] - Optional. The test ID for the radio button.
 * @param {string} [value] - The value of the radio button.
 * @see {@link PropsWithTestId}
 * @see {@link InputHTMLAttributes}
 */
interface RadioGroupItemProps
  extends Pick<InputHTMLAttributes<HTMLInputElement>, 'className' | 'disabled' | 'value'>,
    Required<Pick<InputHTMLAttributes<HTMLInputElement>, 'id'>>,
    PropsWithTestId {
  label: string;
}

/**
 * The `Item` component renders a single radio button within
 * a `RadioGroup`. It is used to represent an individual option in the group.
 */
const Item = ({ className, disabled = false, id, testId = 'radio-group-item', ...props }: RadioGroupItemProps) => {
  const { disabled: groupDisabled, name, setValue, value: currentValue } = useContext(RadioGroupContext);
  const isChecked = currentValue === props.value;
  const isDisabled = disabled || groupDisabled;

  const handleChange = () => {
    if (!isDisabled) {
      setValue(props.value as string);
    }
  };

  return (
    <div className={cn(radioGroupItemVariants({ disabled: isDisabled }))} data-testid={testId} onClick={handleChange}>
      <input
        type="radio"
        id={id}
        name={name}
        className={cn('size-0', className)}
        disabled={isDisabled}
        data-testid={`${testId}-input`}
        onChange={handleChange}
        checked={isChecked}
        aria-checked={isChecked}
        {...props}
      />
      <FAIcon
        icon={isChecked ? 'circleDot' : 'circle'}
        className={cn('me-2', { 'text-blue-600': isChecked }, { 'text-neutral-500': !isChecked })}
        testId={`${testId}-icon`}
      />
      <label htmlFor={id} data-testid={`${testId}-label`}>
        {props.label}
      </label>
    </div>
  );
};
RadioGroup.Item = Item;

export default RadioGroup;
