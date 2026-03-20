import { describe, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { render, screen } from 'test/test-utils';

import Input, { InputProps } from './Input';

const formSchema = z.object({
  color: z.string().min(1, { message: 'Required' }),
});

type FormValues = z.infer<typeof formSchema>;

/**
 * A wrapper for testing the `Input` component which requires some
 * react-hook-form objects passed as props.
 */
const InputWrapper = (props: Omit<InputProps<FormValues>, 'control'>) => {
  const form = useForm<FormValues>({
    defaultValues: { color: '' },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = () => {};

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} data-testid="form">
      <Input {...props} control={form.control} />
      <button type="submit" data-testid="button-submit">
        submit
      </button>
    </form>
  );
};

describe('Input', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<InputWrapper name="color" />);
    await screen.findByTestId('input');

    // ASSERT
    expect(screen.getByTestId('input')).toBeDefined();
  });

  it('should show label', async () => {
    // ARRANGE
    const label = 'Label text';
    render(<InputWrapper name="color" label={label} />);
    await screen.findByTestId('input-label');

    // ASSERT
    expect(screen.getByTestId('input-label')).toHaveTextContent(label);
  });

  it('should show supporting text', async () => {
    // ARRANGE
    const supportingText = 'Supporting text';
    render(<InputWrapper name="color" supportingText={supportingText} />);
    await screen.findByTestId('input-supporting-text');

    // ASSERT
    expect(screen.getByTestId('input-supporting-text')).toHaveTextContent(supportingText);
  });

  it('should show error message', async () => {
    // ARRANGE
    const user = userEvent.setup();
    render(<InputWrapper name="color" label="Color" />);
    await screen.findByTestId('button-submit');

    // ACT
    await user.click(screen.getByTestId('button-submit'));
    await screen.findByTestId('input-error');

    // ASSERT
    expect(screen.getByTestId('input-error')).toHaveTextContent(/required/i);
  });
});
