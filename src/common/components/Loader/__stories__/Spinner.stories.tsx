import type { Meta, StoryObj } from '@storybook/react-vite';

import Spinner from '../Spinner';

const meta = {
  title: 'Common/Loader/Spinner',
  component: Spinner,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: { description: 'Optional. The content, e.g. "Spinner.Text".' },
    className: { description: 'Additional CSS classes.' },
    icon: { description: 'Optional. A "FAIconProps" object containing properties for the icon.' },
    testId: { description: 'The test identifier.' },
  },
} satisfies Meta<typeof Spinner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Simple: Story = {
  args: {},
};

export const Larger: Story = {
  args: {
    icon: { size: '2x' },
  },
};

export const Colored: Story = {
  args: {
    icon: { className: 'text-blue-600' },
  },
};

export const WithText: Story = {
  args: {
    children: <Spinner.Text>Engaging warp engines Captain...</Spinner.Text>,
  },
};

export const WithAlternativeIcon: Story = {
  args: {
    icon: { icon: 'circleXmark' },
  },
};
