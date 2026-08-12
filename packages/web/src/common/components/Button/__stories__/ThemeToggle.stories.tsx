import type { Meta, StoryObj } from '@storybook/react-vite';

import { withProviders } from '../../../../../.storybook/decorators/withProviders';
import ThemeToggle from '../ThemeToggle';

const meta = {
  title: 'Common/Button/ThemeToggle',
  component: ThemeToggle,
  decorators: [withProviders()],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: { description: 'Additional CSS classes.' },
  },
} satisfies Meta<typeof ThemeToggle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
