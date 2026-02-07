import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';

import Avatar from 'common/components/Icon/Avatar';
import MenuNavLink from '../../MenuNavLink';
import MenuSeparator from '../../MenuSeparator';

import SideMenu from '../SideMenu';

const meta = {
  title: 'Common/Menu/SideMenu',
  component: SideMenu,
  decorators: [
    (Story) => (
      <div className="h-[500px]">
        <MemoryRouter>
          <Story />
        </MemoryRouter>
      </div>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    children: { description: 'The content.' },
    className: { description: 'Additional CSS classes.' },
    close: { description: 'Optional. Function to close the menu. ' },
    headerContent: {
      description: 'Optional. A `ReactNode` containing the content of the menu header.',
    },
    side: {
      description: 'Optional. The side of the viewport where the menu should display when shown. Default: left',
    },
    testId: { description: 'The test identifier.' },
  },
  args: {
    children: (
      <>
        <MenuNavLink to="" title="Section A">
          Section A
        </MenuNavLink>
        <MenuNavLink to="" title="Section B">
          Section B
        </MenuNavLink>
        <MenuNavLink to="" title="Section C">
          Section C
        </MenuNavLink>
        <MenuSeparator />
        <MenuNavLink to="" title="Settings">
          Settings
        </MenuNavLink>
      </>
    ),
    headerContent: (
      <div className="flex items-center">
        <Avatar value="Bob Smith" className="me-2 rounded-full" />
        <div className="text-sm">Bob Smith</div>
      </div>
    ),
  },
} satisfies Meta<typeof SideMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const RightSide: Story = {
  args: {
    side: 'right',
  },
  render: (args) => <SideMenu {...args}></SideMenu>,
};

export const LeftSide: Story = {
  render: (args) => <SideMenu {...args}></SideMenu>,
};
