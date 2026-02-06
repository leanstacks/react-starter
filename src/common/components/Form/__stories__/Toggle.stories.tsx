import type { Meta, StoryObj } from '@storybook/react-vite';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { default as MyToggle } from '../Toggle';
import { ToggleProps } from '../Toggle';

const formSchema = z.object({
  isEnabledNotifications: z.boolean(),
});

type FormValues = z.infer<typeof formSchema>;

/**
 * A wrapper for the `Toggle` component.  Provides the RHF form `control`
 * to the `Toggle` component.
 */
const Toggle = (props: Omit<ToggleProps<FormValues>, 'control'>) => {
  const form = useForm({
    defaultValues: {
      isEnabledNotifications: false,
    },
    mode: 'all',
    resolver: zodResolver(formSchema),
  });

  const onSubmit = () => {};

  return (
    <form className="w-96" onSubmit={form.handleSubmit(onSubmit)}>
      <MyToggle control={form.control} {...props} />
    </form>
  );
};

const meta = {
  title: 'Common/Form/Toggle',
  component: Toggle,
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
} satisfies Meta<typeof MyToggle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WithSupportingText: Story = {
  args: {
    name: 'isEnabledNotifications',
    label: 'Receive Notifications',
    supportingText: 'Enable or disable push notifications.',
  },
};

export const WithLabel: Story = {
  args: {
    name: 'isEnabledNotifications',
    label: 'Receive Notifications',
  },
};
