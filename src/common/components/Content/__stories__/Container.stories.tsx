import type { Meta, StoryObj } from '@storybook/react';

import Container from '../Container';
import Page from '../Page';
import { PropsWithChildren } from 'react';

const meta = {
  title: 'Common/Content/Container',
  component: Container,
  decorators: [
    (Story) => (
      <Page className="bg-neutral-500/50">
        <Story />
      </Page>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    children: { description: 'The content.' },
    className: { description: 'Additional CSS classes.' },
    size: {
      description: 'Optional. The container size.',
      control: { type: 'select' },
      options: ['default', 'sm', 'md', 'lg', 'xl', '2xl'],
    },
    testId: { description: 'The test identifier.' },
  },
} satisfies Meta<typeof Container>;

export default meta;

const Block = ({ children }: PropsWithChildren) => (
  <div className="flex h-full min-h-24 items-center justify-center bg-blue-500 text-white">{children}</div>
);

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Container {...args}>
      <Block>Container</Block>
    </Container>
  ),
  args: {},
};

export const Small: Story = {
  render: (args) => (
    <Container {...args}>
      <Block>Container</Block>
    </Container>
  ),
  args: {
    size: 'sm',
  },
};

export const Medium: Story = {
  render: (args) => (
    <Container {...args}>
      <Block>Container</Block>
    </Container>
  ),
  args: {
    size: 'md',
  },
};

export const Large: Story = {
  render: (args) => (
    <Container {...args}>
      <Block>Container</Block>
    </Container>
  ),
  args: {
    size: 'lg',
  },
};

export const ExtraLarge: Story = {
  render: (args) => (
    <Container {...args}>
      <Block>Container</Block>
    </Container>
  ),
  args: {
    size: 'xl',
  },
};

export const TwoXL: Story = {
  render: (args) => (
    <Container {...args}>
      <Block>Container</Block>
    </Container>
  ),
  args: {
    size: '2xl',
  },
};
