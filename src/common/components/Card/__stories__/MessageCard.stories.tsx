import type { Meta, StoryObj } from '@storybook/react-vite';

import MessageCard from '../MessageCard';

const meta = {
  title: 'Common/Card/MessageCard',
  component: MessageCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: { description: 'Additional CSS classes.' },
    iconProps: {
      description: 'An icon properties object.',
    },
    message: { description: 'A message to display.' },
    testId: { description: 'The test identifier.' },
    title: { description: 'A title.' },
  },
  args: {
    message: 'This is the card message.',
  },
} satisfies Meta<typeof MessageCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const MessageOnly: Story = {};

export const WithTitle: Story = {
  args: {
    title: 'Card Title',
  },
};

export const aWithIcon: Story = {
  args: {
    iconProps: {
      icon: 'circleExclamation',
      size: '2x',
    },
    title: 'Card Title',
  },
};
