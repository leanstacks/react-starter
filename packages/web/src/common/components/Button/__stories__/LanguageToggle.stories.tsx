import type { Meta, StoryObj } from '@storybook/react-vite';

import LanguageToggle from '../LanguageToggle';

const meta = {
  title: 'Common/Button/LanguageToggle',
  component: LanguageToggle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: { description: 'Additional CSS classes.' },
  },
} satisfies Meta<typeof LanguageToggle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
