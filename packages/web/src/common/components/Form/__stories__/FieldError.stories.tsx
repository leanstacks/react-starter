import type { Meta, StoryObj } from '@storybook/react-vite';

import FieldError from '../FieldError';

const meta = {
  title: 'Common/Form/FieldError',
  component: FieldError,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: { description: 'Additional CSS classes.' },
    message: { description: 'The error message.' },
    testId: { description: 'The test identifier.' },
  },
  args: {
    message: 'Required. Must be 30 characters or less.',
  },
} satisfies Meta<typeof FieldError>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Styled: Story = {
  args: {
    className: 'uppercase underline',
  },
};
