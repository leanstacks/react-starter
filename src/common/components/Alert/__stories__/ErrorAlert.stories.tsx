import type { Meta, StoryObj } from '@storybook/react-vite';

import ErrorAlert from '../ErrorAlert';

const meta = {
  title: 'Common/Alert/ErrorAlert',
  component: ErrorAlert,
  tags: ['autodocs'],
  argTypes: {
    children: { description: 'The content.' },
    className: { description: 'Additional CSS classes.' },
    description: { description: 'The detailed description.' },
    icon: { description: 'The icon name.', type: 'string' },
    testId: { description: 'The test identifier.', type: 'string' },
    title: { description: 'The title.' },
  },
  args: {},
} satisfies Meta<typeof ErrorAlert>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Oh no!',
    description: 'Some problem has occurred. Please check your work and try again.',
  },
};

export const DescriptionOnly: Story = {
  args: {
    description: 'Some problem has occurred. Please check your work and try again.',
  },
};

export const WithAlternateIcon: Story = {
  args: {
    icon: 'phone',
    title: 'This is bad!',
    description: 'You probably need to call customer support.',
  },
};
