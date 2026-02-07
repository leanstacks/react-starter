import type { Meta, StoryObj } from '@storybook/react-vite';

import { SignDisplay, Unit, UnitDisplay } from 'common/utils/constants';

import Integer from '../Integer';

const meta = {
  title: 'Common/Text/Integer',
  component: Integer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: { description: 'Additional CSS classes.' },
    signDisplay: { description: 'Optional. When to display the sign for the number.' },
    testId: { description: 'The test identifier.' },
    unit: { description: 'Optional. When included, formatted value includes unit of measurement.' },
    unitDisplay: { description: 'Optional. Display of the unit of measurement.' },
    value: { description: 'The amount.' },
  },
} satisfies Meta<typeof Integer>;

export default meta;

type Story = StoryObj<typeof meta>;

const val = 3.14159265359;

export const Simple: Story = {
  args: { value: val },
};

export const WithSign: Story = {
  args: { value: Simple.args.value, signDisplay: SignDisplay.Always },
};

export const WithUnit: Story = {
  args: { value: Simple.args.value, unit: Unit.Centimeter, unitDisplay: UnitDisplay.Long },
};
