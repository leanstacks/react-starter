import { TextareaHTMLAttributes } from 'react';
import { Control, FieldValues, Path, useController } from 'react-hook-form';

import { cn } from 'common/utils/css';
import { BaseComponentProps } from 'common/utils/types';
import Label from './Label';
import FieldError from './FieldError';
import HelpText from '../Text/HelpText';

/**
 * Properties for the `Textarea` component.
 * @param {Control} control - Object containing methods for registering components
 * into React Hook Form.
 * @param {string} [label] - Optional. The label text to display.
 * @param {Path} name - Name of the form control.
 * @param {string} [supportingText] - Optional. Help text or instructions.
 * @see {@link PropsWithTestId}
 * @see {@link InputHTMLAttributes}
 */
export interface TextareaProps<T extends FieldValues>
  extends BaseComponentProps, TextareaHTMLAttributes<HTMLTextAreaElement> {
  control: Control<T>;
  label?: string;
  name: Path<T>;
  supportingText?: string;
}

/**
 * The `Textarea` component renders an HTML `textarea` element. It is used to capture
 * multiple lines of text input from a user.
 * @param {TextareaProps} props - Component properties.
 * @returns {JSX.Element} JSX
 */
const Textarea = <T extends FieldValues>({
  className,
  control,
  label,
  name,
  supportingText,
  testId = 'textarea',
  ...props
}: TextareaProps<T>): JSX.Element => {
  const { field, fieldState } = useController({ control, name });
  const isDisabled = props.disabled || props.readOnly;

  return (
    <div className={cn(className)} data-testid={testId}>
      {!!label && (
        <Label htmlFor={name} required={props.required} testId={`${testId}-label`}>
          {label}
        </Label>
      )}
      <textarea
        id={props.id || name}
        {...props}
        {...field}
        className={cn(
          'mb-1 block w-full border-b border-neutral-500/50 bg-transparent py-0.5 focus:border-blue-600 focus-visible:outline-hidden',
          {
            'border-red-600!': fieldState.error,
          },
          {
            'opacity-50': isDisabled,
          },
        )}
        data-testid={`${testId}-textarea`}
      ></textarea>
      <FieldError message={fieldState.error?.message} testId={`${testId}-error`} />
      {!!supportingText && <HelpText testId={`${testId}-supporting-text`}>{supportingText}</HelpText>}
    </div>
  );
};

export default Textarea;
