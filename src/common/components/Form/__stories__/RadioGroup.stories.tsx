import type { Meta, StoryObj } from '@storybook/react-vite';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { default as MyRadioGroup } from '../RadioGroup';
import { RadioGroupProps } from '../RadioGroup';

const formSchema = z.object({
  color: z.enum(['blue', 'red', 'yellow'], { message: 'Must be a primary color.' }),
});

type FormValues = z.infer<typeof formSchema>;

/**
 * A wrapper for the `RadioGroup` component.  Provides the RHF form `control`
 * to the `RadioGroup` component.
 */
const RadioGroup = (props: Omit<RadioGroupProps<FormValues>, 'control'>) => {
  const form = useForm({
    defaultValues: {},
    mode: 'all',
    resolver: zodResolver(formSchema),
  });

  const onSubmit = () => {};

  return (
    <form className="h-100 w-96" onSubmit={form.handleSubmit(onSubmit)} noValidate>
      <MyRadioGroup control={form.control} {...props}></MyRadioGroup>
    </form>
  );
};

const meta = {
  title: 'Common/Form/RadioGroup',
  component: RadioGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: { description: 'Additional CSS classes.' },
    control: {
      description: 'Object containing methods for registering components into React Hook Form.',
    },
    disabled: {
      description: 'Optional. Indicates if the field is disabled.',
      control: { type: 'boolean' },
    },
    label: { description: 'Optional. The label text.' },
    name: { description: 'Name of the form control.' },
    orientation: {
      description: 'Optional. Orientation of the radio group.',
      options: ['horizontal', 'vertical'],
      control: { type: 'select' },
    },
    required: {
      description: 'Optional. Indicates if the field is required.',
      control: { type: 'boolean' },
    },
    supportingText: { description: 'Optional. Help text or instructions.' },
    testId: { description: 'The test identifier.' },
  },
  args: {},
} satisfies Meta<typeof MyRadioGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WithSupportingText: Story = {
  args: {
    children: (
      <>
        <MyRadioGroup.Item id="color-blue" value="blue" label="Blue" />
        <MyRadioGroup.Item id="color-red" value="red" label="Red" />
        <MyRadioGroup.Item id="color-yellow" value="yellow" label="Yellow" />
        <MyRadioGroup.Item id="color-green" value="green" label="Green" />
      </>
    ),
    name: 'color',
    label: 'Color',
    supportingText: 'Select a primary color.',
  },
};

export const WithLabel: Story = {
  args: {
    children: (
      <>
        <MyRadioGroup.Item id="color-blue" value="blue" label="Blue" />
        <MyRadioGroup.Item id="color-red" value="red" label="Yellow" />
        <MyRadioGroup.Item id="color-yellow" value="yellow" label="Yellow" />
        <MyRadioGroup.Item id="color-green" value="green" label="Green" />
      </>
    ),
    name: 'color',
    label: 'Color',
  },
};

export const DisabledGroup: Story = {
  args: {
    children: (
      <>
        <MyRadioGroup.Item id="color-blue" value="blue" label="Blue" />
        <MyRadioGroup.Item id="color-red" value="red" label="Yellow" />
        <MyRadioGroup.Item id="color-yellow" value="yellow" label="Yellow" />
        <MyRadioGroup.Item id="color-green" value="green" label="Green" />
      </>
    ),
    name: 'color',
    label: 'Color',
    disabled: true,
  },
};

export const DisabledItem: Story = {
  args: {
    children: (
      <>
        <MyRadioGroup.Item id="color-blue" value="blue" label="Blue" />
        <MyRadioGroup.Item id="color-red" value="red" label="Yellow" />
        <MyRadioGroup.Item id="color-yellow" value="yellow" label="Yellow" />
        <MyRadioGroup.Item id="color-green" value="green" label="Green" disabled />
      </>
    ),
    name: 'color',
    label: 'Color',
  },
};
