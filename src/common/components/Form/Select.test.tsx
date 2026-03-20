import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { render, screen, waitFor } from 'test/test-utils';

import Select, { SelectProps } from './Select';

const formSchema = z.object({
  color: z.string().refine((val) => ['blue'].includes(val), { message: 'Must select blue.' }),
});
type FormValues = z.infer<typeof formSchema>;

/**
 * A wrapper for testing the `Select` component which requires some
 * react-hook-form objects passed as props.
 */
const SelectWrapper = (props: Omit<SelectProps<FormValues>, 'control'>) => {
  const form = useForm<FormValues>({
    defaultValues: {},
    resolver: zodResolver(formSchema),
  });

  const onSubmit = () => {};

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} data-testid="form">
      <Select {...props} control={form.control} />
      <button type="submit" data-testid="button-submit">
        submit
      </button>
    </form>
  );
};

describe('Select', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(
      <SelectWrapper name="color">
        <Select.Trigger>
          <Select.Value placeholder="None selected" />
          <Select.Icon />
        </Select.Trigger>
        <Select.Options>
          <Select.Heading>Primary</Select.Heading>
          <Select.Separator />
          <Select.Option value="blue">Blue</Select.Option>
          <Select.Option value="red">Blue</Select.Option>
          <Select.Option value="yellow">Blue</Select.Option>
        </Select.Options>
      </SelectWrapper>,
    );
    await screen.findByTestId('select');

    // ASSERT
    expect(screen.getByTestId('select')).toBeDefined();
  });

  it('should render components', async () => {
    // ARRANGE
    render(
      <SelectWrapper name="color">
        <Select.Trigger>
          <Select.Value placeholder="None selected" />
          <Select.Icon />
        </Select.Trigger>
        <Select.Options>
          <Select.Heading>Primary</Select.Heading>
          <Select.Separator />
          <Select.Option value="blue">Blue</Select.Option>
          <Select.Option value="red">Blue</Select.Option>
          <Select.Option value="yellow">Blue</Select.Option>
        </Select.Options>
      </SelectWrapper>,
    );
    await screen.findByTestId('select');

    // ASSERT
    expect(screen.getByTestId('select')).toBeDefined();
    expect(screen.getByTestId('select-trigger')).toBeDefined();
    expect(screen.getByTestId('select-value')).toBeDefined();
    expect(screen.getByTestId('select-icon')).toBeDefined();
    expect(screen.getByTestId('select-options')).toBeDefined();
    expect(screen.getByTestId('select-heading')).toBeDefined();
    expect(screen.getByTestId('select-separator')).toBeDefined();
    expect(screen.getAllByTestId('select-option')).toHaveLength(3);
  });

  it('should show label', async () => {
    // ARRANGE
    const label = 'label value';
    render(
      <SelectWrapper name="color" label={label}>
        <Select.Trigger>
          <Select.Value placeholder="None selected" />
          <Select.Icon />
        </Select.Trigger>
        <Select.Options>
          <Select.Heading>Primary</Select.Heading>
          <Select.Separator />
          <Select.Option value="blue">Blue</Select.Option>
          <Select.Option value="red">Blue</Select.Option>
          <Select.Option value="yellow">Blue</Select.Option>
        </Select.Options>
      </SelectWrapper>,
    );
    await screen.findByTestId('select-label');

    // ASSERT
    expect(screen.getByTestId('select-label')).toHaveTextContent(label);
  });

  it('should show supporting test', async () => {
    // ARRANGE
    const supportingText = 'supporting text content';
    render(
      <SelectWrapper name="color" supportingText={supportingText}>
        <Select.Trigger>
          <Select.Value placeholder="None selected" />
          <Select.Icon />
        </Select.Trigger>
        <Select.Options>
          <Select.Heading>Primary</Select.Heading>
          <Select.Separator />
          <Select.Option value="blue">Blue</Select.Option>
          <Select.Option value="red">Blue</Select.Option>
          <Select.Option value="yellow">Blue</Select.Option>
        </Select.Options>
      </SelectWrapper>,
    );
    await screen.findByTestId('select-supporting-text');

    // ASSERT
    expect(screen.getByTestId('select-supporting-text')).toHaveTextContent(supportingText);
  });

  it('should show placeholder when no value selected', async () => {
    // ARRANGE
    render(
      <SelectWrapper name="color">
        <Select.Trigger>
          <Select.Value placeholder="None selected" />
          <Select.Icon />
        </Select.Trigger>
        <Select.Options>
          <Select.Heading>Primary</Select.Heading>
          <Select.Separator />
          <Select.Option value="blue">Blue</Select.Option>
          <Select.Option value="red">Blue</Select.Option>
          <Select.Option value="yellow">Blue</Select.Option>
        </Select.Options>
      </SelectWrapper>,
    );
    await screen.findByTestId('select-value');

    // ASSERT
    expect(screen.getByTestId('select-value')).toBeDefined();
    expect(screen.getByTestId('select-value')).toHaveTextContent(/none selected/i);
  });

  it('should show options when trigger clicked', async () => {
    // ARRANGE
    const user = userEvent.setup();
    render(
      <SelectWrapper name="color">
        <Select.Trigger>
          <Select.Value placeholder="None selected" />
          <Select.Icon />
        </Select.Trigger>
        <Select.Options>
          <Select.Heading>Primary</Select.Heading>
          <Select.Separator />
          <Select.Option value="blue">Blue</Select.Option>
          <Select.Option value="red">Blue</Select.Option>
          <Select.Option value="yellow">Blue</Select.Option>
        </Select.Options>
      </SelectWrapper>,
    );
    await screen.findByTestId('select');
    // expect options to be hidden
    expect(screen.getByTestId('select-options')).toHaveClass('hidden');

    // ACT
    await user.click(screen.getByTestId('select-trigger'));
    await waitFor(() => expect(screen.getByTestId('select-options')).not.toHaveClass('hidden'));

    // ASSERT
    expect(screen.getByTestId('select-options')).not.toHaveClass('hidden');
  });

  it('should hide options when backdrop clicked', async () => {
    // ARRANGE
    const user = userEvent.setup();
    render(
      <SelectWrapper name="color">
        <Select.Trigger>
          <Select.Value placeholder="None selected" />
          <Select.Icon />
        </Select.Trigger>
        <Select.Options>
          <Select.Heading>Primary</Select.Heading>
          <Select.Separator />
          <Select.Option value="blue">Blue</Select.Option>
          <Select.Option value="red">Blue</Select.Option>
          <Select.Option value="yellow">Blue</Select.Option>
        </Select.Options>
      </SelectWrapper>,
    );
    await screen.findByTestId('select');
    // expect options to be hidden
    expect(screen.getByTestId('select-options')).toHaveClass('hidden');

    // ACT
    await user.click(screen.getByTestId('select-trigger'));
    await waitFor(() => expect(screen.getByTestId('select-options')).not.toHaveClass('hidden'));

    await user.click(screen.getByTestId('select-options-backdrop'));
    await waitFor(() => expect(screen.getByTestId('select-options')).toHaveClass('hidden'));

    // ASSERT
    expect(screen.getByTestId('select-options')).toHaveClass('hidden');
  });

  it('should show error message', async () => {
    // ARRANGE
    const user = userEvent.setup();
    render(
      <SelectWrapper name="color">
        <Select.Trigger>
          <Select.Value placeholder="None selected" />
          <Select.Icon />
        </Select.Trigger>
        <Select.Options>
          <Select.Heading>Primary</Select.Heading>
          <Select.Separator />
          <Select.Option value="blue" testId="option-blue">
            Blue
          </Select.Option>
          <Select.Option value="red" testId="option-red">
            Blue
          </Select.Option>
          <Select.Option value="yellow" testId="option-yellow">
            Blue
          </Select.Option>
        </Select.Options>
      </SelectWrapper>,
    );
    await screen.findByTestId('option-red');

    // ACT
    await user.click(screen.getByTestId('option-red'));
    await user.click(screen.getByTestId('button-submit'));
    await screen.findByTestId('select-error');

    // ASSERT
    expect(screen.getByTestId('select-error')).toHaveTextContent(/must select blue/i);
  });
});
