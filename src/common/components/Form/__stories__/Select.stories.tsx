import type { Meta, StoryObj } from '@storybook/react-vite';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { default as MySelect } from '../Select';
import { SelectProps } from '../Select';

const formSchema = z.object({
  color: z.enum(['blue', 'red'], { message: 'Must be blue or red.' }),
});

type FormValues = z.infer<typeof formSchema>;

/**
 * A wrapper for the `Select` component.  Provides the RHF form `control`
 * to the `Select` component.
 */
const Select = (props: Omit<SelectProps<FormValues>, 'control'>) => {
  const form = useForm({
    defaultValues: {},
    mode: 'all',
    resolver: zodResolver(formSchema),
  });

  const onSubmit = () => {};

  return (
    <form className="h-100 w-96" onSubmit={form.handleSubmit(onSubmit)} noValidate>
      <MySelect control={form.control} {...props}></MySelect>
    </form>
  );
};

const meta = {
  title: 'Common/Form/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: { description: 'Additional CSS classes.' },
    control: {
      description: 'Object containing methods for registering components into React Hook Form.',
    },
    label: { description: 'The field label.' },
    name: { description: 'The form field name.' },
    supportingText: { description: 'Additional field instructions.' },
    testId: { description: 'The test identifier.' },
  },
  args: {},
} satisfies Meta<typeof MySelect>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WithSupportingText: Story = {
  args: {
    children: (
      <>
        <MySelect.Trigger>
          <MySelect.Value />
          <MySelect.Icon />
        </MySelect.Trigger>
        <MySelect.Options>
          <MySelect.Heading>Primary Colors</MySelect.Heading>
          <MySelect.Option value="blue">Blue</MySelect.Option>
          <MySelect.Option value="red">Red</MySelect.Option>
          <MySelect.Option value="yellow">Yellow</MySelect.Option>
          <MySelect.Separator />
          <MySelect.Heading>Secondary Colors</MySelect.Heading>
          <MySelect.Option value="green">Green</MySelect.Option>
          <MySelect.Option value="orange">Orange</MySelect.Option>
          <MySelect.Option value="purple">Purple</MySelect.Option>
        </MySelect.Options>
      </>
    ),
    name: 'color',
    label: 'Color',
    supportingText: 'Choose a color.',
  },
};

export const WithLabel: Story = {
  args: {
    children: (
      <>
        <MySelect.Trigger>
          <MySelect.Value />
          <MySelect.Icon />
        </MySelect.Trigger>
        <MySelect.Options>
          <MySelect.Heading>Primary Colors</MySelect.Heading>
          <MySelect.Option value="blue">Blue</MySelect.Option>
          <MySelect.Option value="red">Red</MySelect.Option>
          <MySelect.Option value="yellow">Yellow</MySelect.Option>
          <MySelect.Separator />
          <MySelect.Heading>Secondary Colors</MySelect.Heading>
          <MySelect.Option value="green">Green</MySelect.Option>
          <MySelect.Option value="orange">Orange</MySelect.Option>
          <MySelect.Option value="purple">Purple</MySelect.Option>
        </MySelect.Options>
      </>
    ),
    name: 'color',
    label: 'Color',
  },
};

export const Required: Story = {
  args: {
    children: (
      <>
        <MySelect.Trigger>
          <MySelect.Value />
          <MySelect.Icon />
        </MySelect.Trigger>
        <MySelect.Options>
          <MySelect.Heading>Primary Colors</MySelect.Heading>
          <MySelect.Option value="blue">Blue</MySelect.Option>
          <MySelect.Option value="red">Red</MySelect.Option>
          <MySelect.Option value="yellow">Yellow</MySelect.Option>
          <MySelect.Separator />
          <MySelect.Heading>Secondary Colors</MySelect.Heading>
          <MySelect.Option value="green">Green</MySelect.Option>
          <MySelect.Option value="orange">Orange</MySelect.Option>
          <MySelect.Option value="purple">Purple</MySelect.Option>
        </MySelect.Options>
      </>
    ),
    name: 'color',
    label: 'Color',
    required: true,
  },
};

export const Basic: Story = {
  args: {
    children: (
      <>
        <MySelect.Trigger>
          <MySelect.Value />
          <MySelect.Icon />
        </MySelect.Trigger>
        <MySelect.Options>
          <MySelect.Option value="blue">Blue</MySelect.Option>
          <MySelect.Option value="red">Red</MySelect.Option>
          <MySelect.Option value="yellow">Yellow</MySelect.Option>
        </MySelect.Options>
      </>
    ),
    name: 'color',
  },
};
