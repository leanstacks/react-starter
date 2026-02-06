import type { Meta, StoryObj } from '@storybook/react-vite';

import { SignDisplay, Unit, UnitDisplay } from 'common/utils/constants';

import Decimal from '../Decimal';

const meta = {
  title: 'Common/Text/Decimal',
  component: Decimal,
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
    unit: { description: 'Optional. When included, formatted value includes unit of measurement.' },
    unitDisplay: { description: 'Optional. Display of the unit of measurement.' },
    value: { description: 'The amount.' },
  },
} satisfies Meta<typeof Decimal>;

export default meta;

type Story = StoryObj<typeof meta>;

const pi = 3.14159265359;

export const Simple: Story = {
  args: { value: pi },
};

export const WithMinMax: Story = {
  args: { value: Simple.args.value, minimumFractionDigits: 2, maximumFractionDigits: 6 },
};

export const WithSign: Story = {
  args: { value: Simple.args.value, signDisplay: SignDisplay.Always },
};

export const WithUnit: Story = {
  args: { value: Simple.args.value, unit: Unit.Centimeter, unitDisplay: UnitDisplay.Long },
};
