import type { Meta, StoryObj } from '@storybook/react-vite';

import Tabs from '../Tabs';

const meta = {
  title: 'Common/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  argTypes: {
    children: { description: 'The content.' },
    className: { description: 'Additional CSS classes.' },
    defaultValue: { description: 'The default (or initial) active tab.' },
    testId: { description: 'The test identifier.' },
  },
  args: {
    defaultValue: 'one',
  },
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Tabs {...args}>
      <Tabs.List>
        <Tabs.Tab value="one">One</Tabs.Tab>
        <Tabs.Tab value="two">Two</Tabs.Tab>
      </Tabs.List>
      <Tabs.Content value="one">
        <div className="py-8 text-blue-600">I am the content for tab one!</div>
      </Tabs.Content>
      <Tabs.Content value="two">
        <div className="py-8 text-green-600">I am the content for tab two!</div>
      </Tabs.Content>
    </Tabs>
  ),
};

export const StretchedTabs: Story = {
  render: (args) => (
    <Tabs {...args}>
      <Tabs.List align="stretch">
        <Tabs.Tab value="one">One</Tabs.Tab>
        <Tabs.Tab value="two">Two</Tabs.Tab>
      </Tabs.List>
      <Tabs.Content value="one">
        <div className="py-8 text-blue-600">I am the content for tab one!</div>
      </Tabs.Content>
      <Tabs.Content value="two">
        <div className="py-8 text-green-600">I am the content for tab two!</div>
      </Tabs.Content>
    </Tabs>
  ),
};
