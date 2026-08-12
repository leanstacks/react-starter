import type { Meta, StoryObj } from '@storybook/react-vite';

import Columns from '../Columns';

const meta = {
  title: 'Common/Content/Columns',
  component: Columns,
  tags: ['autodocs'],
  argTypes: {
    children: { description: 'The content.' },
    className: { description: 'Additional CSS classes.' },
    gap: {
      description: 'Optional. The gap size between columns.',
      control: { type: 'select' },
      options: ['none', 'sm', 'md', 'lg'],
    },
    layout: {
      description: 'Optional. The column layout.',
      control: { type: 'select' },
      options: ['1-1', '1-3', '3-1', '1-1-1', '1-2-1'],
    },
    testId: { description: 'The test identifier.' },
  },
} satisfies Meta<typeof Columns>;

export default meta;

const Block = () => <div className="h-full min-h-24 bg-blue-500" />;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Columns {...args}>
      <Columns.Column>
        <Block />
      </Columns.Column>
      <Columns.Column>
        <Block />
      </Columns.Column>
    </Columns>
  ),
  args: {},
};

export const SmallLeftSide: Story = {
  render: (args) => (
    <Columns {...args}>
      <Columns.Column>
        <Block />
      </Columns.Column>
      <Columns.Column>
        <Block />
      </Columns.Column>
    </Columns>
  ),
  args: {
    layout: '1-3',
  },
};

export const SmallRightSide: Story = {
  render: (args) => (
    <Columns {...args}>
      <Columns.Column>
        <Block />
      </Columns.Column>
      <Columns.Column>
        <Block />
      </Columns.Column>
    </Columns>
  ),
  args: {
    layout: '3-1',
  },
};

export const ThreeColumns: Story = {
  render: (args) => (
    <Columns {...args}>
      <Columns.Column>
        <Block />
      </Columns.Column>
      <Columns.Column>
        <Block />
      </Columns.Column>
      <Columns.Column>
        <Block />
      </Columns.Column>
    </Columns>
  ),
  args: {
    layout: '1-1-1',
  },
};

export const WideMiddleColumn: Story = {
  render: (args) => (
    <Columns {...args}>
      <Columns.Column>
        <Block />
      </Columns.Column>
      <Columns.Column>
        <Block />
      </Columns.Column>
      <Columns.Column>
        <Block />
      </Columns.Column>
    </Columns>
  ),
  args: {
    layout: '1-2-1',
  },
};
