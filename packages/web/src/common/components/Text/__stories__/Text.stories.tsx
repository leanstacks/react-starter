import type { Meta, StoryObj } from '@storybook/react-vite';

import Text from '../Text';

const meta = {
  title: 'Common/Text/Text',
  component: Text,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: { description: 'The content.' },
    className: { description: 'Additional CSS classes.' },
    variant: { description: 'Optional. The style variant.' },
    testId: { description: 'The test identifier.' },
  },
  args: {
    children: 'The sly red fix sleeps under the tree.',
  },
} satisfies Meta<typeof Text>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Danger: Story = {
  args: { variant: 'danger' },
};

export const Info: Story = {
  args: { variant: 'info' },
};

export const Warning: Story = {
  args: { variant: 'warning' },
};
