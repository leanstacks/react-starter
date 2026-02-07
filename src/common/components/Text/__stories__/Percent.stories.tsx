import type { Meta, StoryObj } from '@storybook/react-vite';

import { SignDisplay } from 'common/utils/constants';

import Percent from '../Percent';

const meta = {
  title: 'Common/Text/Percent',
  component: Percent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: { description: 'Additional CSS classes.' },
    maximumFractionDigits: {
      description: 'Optional. The maximum number of fraction digits to use.',
    },
    minimumFractionDigits: {
      description: 'Optional. The minimum number of fraction digits to use.',
    },
    signDisplay: { description: 'Optional. When to display the sign for the number.' },
    testId: { description: 'The test identifier.' },
    value: { description: 'The percent as a decimal value, e.g. `0.34` renders 34%.' },
  },
} satisfies Meta<typeof Percent>;

export default meta;

type Story = StoryObj<typeof meta>;

const val = 0.14159265359;

export const Simple: Story = {
  args: { value: val },
};

export const WithMinMax: Story = {
  args: { value: Simple.args.value, minimumFractionDigits: 2, maximumFractionDigits: 6 },
};

export const WithSign: Story = {
  args: { value: Simple.args.value, signDisplay: SignDisplay.Always },
};
