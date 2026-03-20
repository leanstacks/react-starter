import { describe, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { render, screen } from 'test/test-utils';

import Textarea, { TextareaProps } from './Textarea';

const formSchema = z.object({
  myField: z.string().min(1, { message: 'Required' }),
});
type FormValues = z.infer<typeof formSchema>;

/**
 * A wrapper for testing the `Textarea` component which requires some
 * react-hook-form objects passed as props.
 */
const TextareaWrapper = (props: Omit<TextareaProps<FormValues>, 'control'>) => {
  const form = useForm<FormValues>({
    defaultValues: { myField: '' },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = () => {};

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} data-testid="form">
      <Textarea {...props} control={form.control} />
      <button type="submit" data-testid="button-submit">
        submit
      </button>
    </form>
  );
};

describe('Textarea', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<TextareaWrapper name="myField" />);
    await screen.findByTestId('textarea');

    // ASSERT
    expect(screen.getByTestId('textarea')).toBeDefined();
  });

  it('should show label', async () => {
    // ARRANGE
    const label = 'Label text';
    render(<TextareaWrapper name="myField" label={label} />);
    await screen.findByTestId('textarea-label');

    // ASSERT
    expect(screen.getByTestId('textarea-label')).toHaveTextContent(label);
  });

  it('should show supporting text', async () => {
    // ARRANGE
    const supportingText = 'Supporting text';
    render(<TextareaWrapper name="myField" supportingText={supportingText} />);
    await screen.findByTestId('textarea-supporting-text');

    // ASSERT
    expect(screen.getByTestId('textarea-supporting-text')).toHaveTextContent(supportingText);
  });

  it('should show error message', async () => {
    // ARRANGE
    const user = userEvent.setup();
    render(<TextareaWrapper name="myField" label="Color" />);
    await screen.findByTestId('button-submit');

    // ACT
    await user.click(screen.getByTestId('button-submit'));
    await screen.findByTestId('textarea-error');

    // ASSERT
    expect(screen.getByTestId('textarea-error')).toHaveTextContent(/required/i);
  });
});
