import type { Meta, StoryObj } from '@storybook/react-vite';

import FAIcon from '../FAIcon';

const meta = {
  title: 'Common/Icon/FAIcon',
  component: FAIcon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: { description: 'Additional CSS classes.' },
    icon: { description: 'The icon name.' },
    testId: { description: 'The test identifier.' },
  },
} satisfies Meta<typeof FAIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Simple: Story = {
  args: {
    icon: 'sliders',
  },
};

export const Size: Story = {
  args: {
    icon: 'sliders',
    size: '2x',
  },
};

export const Color: Story = {
  args: {
    icon: 'sliders',
    className: 'text-blue-600',
  },
};

export const Spin: Story = {
  args: {
    icon: 'circleNotch',
    spin: true,
  },
};
