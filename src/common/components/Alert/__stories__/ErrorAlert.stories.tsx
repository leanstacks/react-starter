import type { Meta, StoryObj } from '@storybook/react-vite';

import ErrorAlert from '../ErrorAlert';

const meta = {
  title: 'Common/Alert/ErrorAlert',
  component: ErrorAlert,
  tags: ['autodocs'],
  argTypes: {
    className: { description: 'Additional CSS classes.' },
    description: { description: 'The detailed description.' },
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
