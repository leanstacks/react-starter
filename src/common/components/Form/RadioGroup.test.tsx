import { describe, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { render, screen } from 'test/test-utils';

import RadioGroup, { RadioGroupProps } from './RadioGroup';

const formSchema = z.object({
  color: z.string().refine((val) => ['blue', 'red', 'yellow'].includes(val), {
    message: 'Must select a primary color.',
  }),
});
type FormValues = z.infer<typeof formSchema>;

/**
 * A wrapper for testing the `RadioGroup` component which requires some
 * react-hook-form objects passed as props.
 */
const RadioGroupWrapper = (props: Omit<RadioGroupProps<FormValues>, 'control'>) => {
  const form = useForm({
    defaultValues: {},
    resolver: zodResolver(formSchema),
  });

  const onSubmit = () => {};

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} data-testid="form">
      <RadioGroup {...props} control={form.control} />
      <button type="submit" data-testid="button-submit">
        submit
      </button>
    </form>
  );
};

describe('RadioGroup', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(
      <RadioGroupWrapper name="color">
        <RadioGroup.Item id="color-blue" value="blue" label="Blue" />
        <RadioGroup.Item id="color-red" value="red" label="Red" />
        <RadioGroup.Item id="color-yellow" value="yellow" label="Yellow" />
        <RadioGroup.Item id="color-green" value="green" label="Green" />
      </RadioGroupWrapper>,
    );
    await screen.findByTestId('radio-group');

    // ASSERT
    expect(screen.getByTestId('radio-group')).toBeDefined();
  });

  it('should render label', async () => {
    // ARRANGE
    render(
      <RadioGroupWrapper name="color" label="Color">
        <RadioGroup.Item id="color-blue" value="blue" label="Blue" />
        <RadioGroup.Item id="color-red" value="red" label="Red" />
        <RadioGroup.Item id="color-yellow" value="yellow" label="Yellow" />
        <RadioGroup.Item id="color-green" value="green" label="Green" />
      </RadioGroupWrapper>,
    );
    await screen.findByTestId('radio-group-label');

    // ASSERT
    expect(screen.getByTestId('radio-group-label')).toHaveTextContent(/Color/i);
  });

  it('should render supporting text', async () => {
    // ARRANGE
    render(
      <RadioGroupWrapper name="color" supportingText="Select a color">
        <RadioGroup.Item id="color-blue" value="blue" label="Blue" />
        <RadioGroup.Item id="color-red" value="red" label="Red" />
        <RadioGroup.Item id="color-yellow" value="yellow" label="Yellow" />
        <RadioGroup.Item id="color-green" value="green" label="Green" />
      </RadioGroupWrapper>,
    );
    await screen.findByTestId('radio-group-supporting-text');

    // ASSERT
    expect(screen.getByTestId('radio-group-supporting-text')).toHaveTextContent(/Select a color/i);
  });

  it('should select an option', async () => {
    // ARRANGE
    const user = userEvent.setup();
    render(
      <RadioGroupWrapper name="color">
        <RadioGroup.Item id="color-blue" value="blue" label="Blue" testId="color-blue" />
        <RadioGroup.Item id="color-red" value="red" label="Red" />
        <RadioGroup.Item id="color-yellow" value="yellow" label="Yellow" />
        <RadioGroup.Item id="color-green" value="green" label="Green" />
      </RadioGroupWrapper>,
    );
    await screen.findByTestId('color-blue');

    // ACT
    const blueItem = screen.getByTestId('color-blue');
    await user.click(blueItem);

    // ASSERT
    const blueItemIcon = screen.getByTestId('color-blue-icon');
    expect(blueItemIcon).toHaveAttribute('data-icon', 'circle-dot');
  });

  it('should display error message', async () => {
    // ARRANGE
    const user = userEvent.setup();
    render(
      <RadioGroupWrapper name="color">
        <RadioGroup.Item id="color-blue" value="blue" label="Blue" />
        <RadioGroup.Item id="color-red" value="red" label="Red" />
        <RadioGroup.Item id="color-yellow" value="yellow" label="Yellow" />
        <RadioGroup.Item id="color-green" value="green" label="Green" testId="color-green" />
      </RadioGroupWrapper>,
    );
    await screen.findByTestId('color-green');

    // ACT
    const greenItem = screen.getByTestId('color-green');
    await user.click(greenItem);
    const submitButton = screen.getByTestId('button-submit');
    await user.click(submitButton);

    // ASSERT
    const fieldError = screen.getByTestId('radio-group-error');
    expect(fieldError).toBeInTheDocument();
    expect(fieldError).toHaveTextContent(/Must select a primary color/i);
  });
});
