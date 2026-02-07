import type { Meta, StoryObj } from '@storybook/react-vite';

import Heading from '../Heading';

const meta = {
  title: 'Common/Text/Heading',
  component: Heading,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: { description: 'The content.' },
    className: { description: 'Additional CSS classes.' },
    level: { description: 'Optional. The heading level, 1-6.' },
    testId: { description: 'The test identifier.' },
  },
  args: {
    children: 'The small red fox slept in the barn.',
  },
} satisfies Meta<typeof Heading>;

export default meta;

type Story = StoryObj<typeof meta>;

export const HeadingOne: Story = {
  args: { level: 1 },
};

export const HeadingTwo: Story = {
  args: { level: 2 },
};

export const HeadingThree: Story = {
  args: { level: 3 },
};

export const HeadingFour: Story = {
  args: { level: 4 },
};

export const HeadingFive: Story = {
  args: { level: 5 },
};

export const HeadingSix: Story = {
  args: { level: 6 },
};

export const Styled: Story = {
  args: { className: 'font-mono text-lime-700 capitalize', level: 3 },
};
