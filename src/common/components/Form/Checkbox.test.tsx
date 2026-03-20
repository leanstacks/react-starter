import { describe, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { render, screen } from 'test/test-utils';

import Checkbox, { CheckboxProps } from './Checkbox';

const formSchema = z.object({
  isEnabled: z.boolean().refine((val) => val === true, { message: 'Required' }),
});

type FormValues = z.infer<typeof formSchema>;

/**
 * A wrapper for testing the `Checkbox` component which requires some
 * react-hook-form objects passed as props.
 */
const CheckboxWrapper = (props: Omit<CheckboxProps<FormValues>, 'control'>) => {
  const form = useForm<FormValues>({
    defaultValues: { isEnabled: false },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = () => {};

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} data-testid="form">
      <Checkbox {...props} control={form.control} />
      <button type="submit" data-testid="button-submit">
        submit
      </button>
    </form>
  );
};

describe('Checkbox', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<CheckboxWrapper name="isEnabled" label="Enable" />);
    await screen.findByTestId('checkbox');

    // ASSERT
    expect(screen.getByTestId('checkbox')).toBeDefined();
  });

  it('should show label', async () => {
    // ARRANGE
    const labelText = 'Enable';
    render(<CheckboxWrapper name="isEnabled" label={labelText} />);
    await screen.findByTestId('checkbox-label');

    // ASSERT
    const checkboxLabel = screen.getByTestId('checkbox-label');
    expect(checkboxLabel).toHaveTextContent(labelText);
  });

  it('should be checked when clicked', async () => {
    // ARRANGE
    const user = userEvent.setup();
    render(<CheckboxWrapper name="isEnabled" label="Enable" />);
    await screen.findByTestId('checkbox');

    const checkboxButton = screen.getByTestId('checkbox-button');
    expect(checkboxButton).toHaveAttribute('aria-checked', 'false');

    // ACT
    await user.click(checkboxButton);

    // ASSERT
    expect(checkboxButton).toHaveAttribute('aria-checked', 'true');
    expect(checkboxButton).toHaveClass('bg-blue-600');
    const checkIcon = screen.queryByTestId('checkbox-icon');
    expect(checkIcon).toBeInTheDocument();
  });

  it('should display validation error', async () => {
    // ARRANGE
    const user = userEvent.setup();
    render(<CheckboxWrapper name="isEnabled" label="Enable" />);
    await screen.findByTestId('checkbox');

    const checkboxButton = screen.getByTestId('checkbox-button');
    expect(checkboxButton).toHaveAttribute('aria-checked', 'false');

    // ACT
    const submitButton = screen.getByTestId('button-submit');
    await user.click(submitButton);

    // ASSERT
    const errorMessage = screen.getByTestId('checkbox-error');
    expect(errorMessage).toHaveTextContent(/required/i);
  });

  it('should be disabled when disabled prop is true', async () => {
    // ARRANGE
    render(<CheckboxWrapper name="isEnabled" label="Enable" disabled />);
    await screen.findByTestId('checkbox');

    // ASSERT
    const checkboxButton = screen.getByTestId('checkbox-button');
    expect(checkboxButton).toHaveAttribute('aria-disabled', 'true');
    expect(checkboxButton).toHaveClass('cursor-not-allowed');
    expect(checkboxButton).toHaveClass('opacity-50');
    expect(checkboxButton).toBeDisabled();
  });

  it('should display supporting text', async () => {
    // ARRANGE
    const supportingText = 'This is a supporting text';
    render(<CheckboxWrapper name="isEnabled" label="Enable" supportingText={supportingText} />);
    await screen.findByTestId('checkbox');

    // ASSERT
    const checkboxSupportingText = screen.getByTestId('checkbox-supporting-text');
    expect(checkboxSupportingText).toHaveTextContent(supportingText);
  });
});
