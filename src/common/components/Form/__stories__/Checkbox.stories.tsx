import type { Meta, StoryObj } from '@storybook/react-vite';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { default as MyCheckbox } from '../Checkbox';
import { CheckboxProps } from '../Checkbox';

const formSchema = z.object({
  isAccepted: z.boolean().refine((val) => val === true, {
    message: 'You must accept the terms and conditions. ',
  }),
  isDisabledChecked: z.boolean(),
  isDisabledUnchecked: z.boolean(),
  isOptInMarketing: z.boolean(),
});

type FormValues = z.infer<typeof formSchema>;

/**
 * A wrapper for the `Checkbox` component.  Provides the React Hook Form `control`
 * to the `Checkbox` component.
 */
const Checkbox = (props: Omit<CheckboxProps<FormValues>, 'control'>) => {
  const form = useForm({
    defaultValues: {
      isAccepted: false,
      isDisabledChecked: true,
      isDisabledUnchecked: false,
      isOptInMarketing: true,
    },
    mode: 'all',
    resolver: zodResolver(formSchema),
  });

  const onSubmit = () => {};

  return (
    <form className="w-96" onSubmit={form.handleSubmit(onSubmit)}>
      <MyCheckbox control={form.control} {...props} />
    </form>
  );
};

const meta = {
  title: 'Common/Form/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: { description: 'Additional CSS classes.', control: { type: 'text' } },
    control: {
      description: 'Object containing methods for registering components into React Hook Form.',
    },
    disabled: {
      description: 'Indicates if the checkbox is disabled.',
      control: { type: 'boolean' },
    },
    label: { description: 'The field label.', control: { type: 'text' } },
    name: { description: 'The form field name.', control: { type: 'text' } },
    required: {
      description: 'Indicates if the checkbox is required.',
      control: { type: 'boolean' },
    },
    supportingText: { description: 'Additional field instructions.', control: { type: 'text' } },
    testId: { description: 'The test identifier.', control: { type: 'text' } },
  },
  args: {
    disabled: false,
    testId: 'checkbox',
  },
} satisfies Meta<typeof MyCheckbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const RequiredWithSupportingText: Story = {
  args: {
    name: 'isAccepted',
    label: 'I accept the terms and conditions',
    required: true,
    supportingText: 'Check this box to continue.',
  },
};

export const OptionalWithDefaultChecked: Story = {
  args: {
    name: 'isOptInMarketing',
    label: 'I want to receive marketing emails',
  },
};

export const DisabledUnchecked: Story = {
  args: {
    name: 'isDisabledUnchecked',
    label: 'I am disabled and unchecked',
    disabled: true,
    supportingText: 'You cannot check this box.',
  },
};

export const DisabledChecked: Story = {
  args: {
    name: 'isDisabledChecked',
    label: 'I am disabled and checked',
    disabled: true,
    supportingText: 'You cannot check this box.',
  },
};
