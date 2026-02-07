import type { Meta, StoryObj } from '@storybook/react-vite';

import image from 'assets/img/logo.png';

import Avatar from '../Avatar';

const meta = {
  title: 'Common/Icon/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: { description: 'Additional CSS classes.' },
    picture: {
      description: 'Optional. An image soource. When present, this is used as the Avatar image.',
    },
    testId: { description: 'The test identifier.' },
    value: { description: 'The value, e.g. a name, title, etc.' },
  },
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Simple: Story = {
  args: {
    value: 'Bob Smith',
  },
};

export const Rounded: Story = {
  args: {
    className: 'rounded-full',
    value: 'Bob Smith',
  },
};

export const Image: Story = {
  args: {
    picture: image,
    value: 'Bob Smith',
  },
};
