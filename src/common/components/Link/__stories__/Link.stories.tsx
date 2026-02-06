import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';

import Link from '../Link';
import FAIcon from '../../Icon/FAIcon';

const meta = {
  title: 'Common/Link',
  component: Link,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: { description: 'The displayed content of the link.' },
    className: { description: 'Additional CSS classes.' },
    target: { description: 'Where to display the linked URL.' },
    testId: { description: 'The test identifier.' },
    to: { description: 'The URL to which the link points.' },
  },
} satisfies Meta<typeof Link>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Simple: Story = {
  args: {
    children: 'Regular link',
    to: '/',
  },
};

export const Target: Story = {
  args: {
    children: 'Open in new tab',
    target: '_blank',
    to: '/',
  },
};

export const Icon: Story = {
  args: {
    children: <FAIcon icon="sliders" />,
    to: '/',
  },
};

export const Styled: Story = {
  args: {
    children: 'Styled link',
    className: 'decoration-rose-400 text-rose-500 text-2xl',
    to: '/',
  },
};
