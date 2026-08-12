import type { Meta, StoryObj } from '@storybook/react-vite';

import HelpText from '../HelpText';

const meta = {
  title: 'Common/Text/HelpText',
  component: HelpText,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: { description: 'The help text content.' },
    className: { description: 'Additional CSS classes.' },
    testId: { description: 'The test identifier.' },
  },
  args: {
    children: 'This is the help text.',
  },
} satisfies Meta<typeof HelpText>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Styled: Story = {
  args: {
    className: 'text-cyan-500 font-bold',
  },
};
