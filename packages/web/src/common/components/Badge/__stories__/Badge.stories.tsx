import type { Meta, StoryObj } from '@storybook/react-vite';

import Badge from '../Badge';

const meta = {
  title: 'Common/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: { description: 'The content.' },
    className: { description: 'Additional CSS classes.' },
    size: {
      description: 'The size variant. ',
      type: 'string',
      control: { type: 'radio' },
      options: ['sm', 'md', 'lg'],
    },
    testId: { description: 'The test identifier.' },
    variant: {
      description: 'Optional. The style variant. ',
      type: 'string',
      control: { type: 'radio' },
      options: ['primary', 'info', 'success', 'warning', 'danger'],
    },
    uppercase: { description: 'Indicates if the content should be uppercase.', type: 'boolean' },
  },
  args: {
    children: 'Badge',
    size: 'md',
    uppercase: false,
    variant: 'danger',
  },
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { size: undefined, variant: undefined },
};

export const Uppercase: Story = {
  args: {
    uppercase: true,
  },
};

export const Primary: Story = {
  args: {
    children: 'In Progress',
    variant: 'primary',
  },
};

export const Info: Story = {
  args: {
    children: 'On Hold',
    variant: 'info',
  },
};

export const Danger: Story = {
  args: {
    children: 'Blocked',
    variant: 'danger',
  },
};

export const Warning: Story = {
  args: {
    children: 'Overdue',
    variant: 'warning',
  },
};

export const Success: Story = {
  args: {
    children: 'Delivered',
    variant: 'success',
  },
};

export const Small: Story = {
  args: {
    children: 'small',
    size: 'sm',
    variant: 'primary',
    uppercase: true,
  },
};

export const Medium: Story = {
  args: {
    children: 'Medium',
    size: 'md',
    variant: 'primary',
    uppercase: true,
  },
};

export const Large: Story = {
  args: {
    children: 'Large',
    size: 'lg',
    variant: 'primary',
    uppercase: true,
  },
};

export const ExampleCounter: Story = {
  args: {
    children: '99+',
    size: 'sm',
  },
};
