import type { Meta, StoryObj } from '@storybook/react-vite';
import { FieldValues, useForm } from 'react-hook-form';

import { default as MyTextarea } from '../Textarea';
import { TextareaProps } from '../Textarea';

/**
 * A wrapper for the `Textarea` component.  Provides the RHF form `control`
 * to the `Textarea` component.
 */
const Textarea = (props: Omit<TextareaProps<FieldValues>, 'control'>) => {
  const form = useForm();

  const onSubmit = () => {};

  return (
    <form className="w-96" onSubmit={form.handleSubmit(onSubmit)}>
      <MyTextarea control={form.control} {...props} />
    </form>
  );
};

const meta = {
  title: 'Common/Form/Textarea',
  component: Textarea,
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
} satisfies Meta<typeof MyTextarea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WithSupportingText: Story = {
  args: {
    name: 'bio',
    label: 'Bio',
    supportingText: 'Tell us a little bit about yourself.',
  },
};

export const WithLabel: Story = {
  args: {
    name: 'bio',
    label: 'Bio',
  },
};

export const Required: Story = {
  args: {
    name: 'bio',
    label: 'Bio',
    required: true,
  },
};

export const MoreRows: Story = {
  args: {
    name: 'bio',
    label: 'Bio',
    rows: 8,
  },
};
