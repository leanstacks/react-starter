import type { Meta, StoryObj } from '@storybook/react-vite';

import Button from '../Button';
import FAIcon from '../../Icon/FAIcon';

const meta = {
  title: 'Common/Button/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      description: 'The content.',
      control: { type: 'select' },
      options: ['Icon_And_Text', 'No_Icon', 'Icon'],
      mapping: {
        Icon: <FAIcon icon="magnifyingGlass" />,
        Icon_And_Text: (
          <>
            <FAIcon icon="magnifyingGlass" />
            <div>Search</div>
          </>
        ),
        No_Icon: <>Submit</>,
      },
    },
    className: { description: 'Additional CSS classes.' },
    size: { description: 'The size variant.' },
    variant: { description: 'The style variant.' },
    testId: { description: 'The test identifier.' },
  },
  args: {
    children: 'Icon_And_Text',
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Solid: Story = {
  args: {
    variant: 'solid',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
  },
};

export const Text: Story = {
  args: {
    variant: 'text',
  },
};

export const IconButton: Story = {
  args: {
    children: 'Icon',
    variant: 'text',
    size: 'icon',
  },
};

export const Small: Story = {
  args: {
    variant: 'solid',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    variant: 'solid',
    size: 'lg',
  },
};
