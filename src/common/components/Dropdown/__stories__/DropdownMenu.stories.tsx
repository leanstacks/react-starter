import type { Meta, StoryObj } from '@storybook/react-vite';

import DropdownMenu from '../DropdownMenu';
import Button from 'common/components/Button/Button';
import FAIcon from 'common/components/Icon/FAIcon';

const meta = {
  title: 'Common/Dropdown/DropdownMenu',
  component: DropdownMenu,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="min-h-48">
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    children: { description: 'The content.' },
    className: { description: 'Additional CSS classes.' },
    testId: { description: 'The test identifier.' },
  },
} satisfies Meta<typeof DropdownMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <DropdownMenu {...args}>
      <DropdownMenu.Trigger>
        <Button>Open Menu</Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Heading>Heading</DropdownMenu.Heading>
        <DropdownMenu.Separator />
        <DropdownMenu.Item onClick={() => {}} testId="dropdown-item-add">
          <FAIcon icon="plus" />
          <span>Add</span>
        </DropdownMenu.Item>
        <DropdownMenu.Item onClick={() => {}} testId="dropdown-item-edit">
          <FAIcon icon="pencil" />
          <span>Edit</span>
        </DropdownMenu.Item>
        <DropdownMenu.Item onClick={() => {}} testId="dropdown-item-delete">
          <FAIcon icon="trash" />
          <span>Delete</span>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu>
  ),
};
