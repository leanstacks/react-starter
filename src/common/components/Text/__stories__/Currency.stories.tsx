import type { Meta, StoryObj } from '@storybook/react-vite';

import { CurrencyCode, CurrencyDisplay, CurrencySign } from 'common/utils/constants';

import Currency from '../Currency';

const meta = {
  title: 'Common/Text/Currency',
  component: Currency,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: { description: 'Additional CSS classes.' },
    currency: { description: 'Optional. The ISO 4217 currency code.' },
    currencyDisplay: { description: 'Optional How the currency is displayed.' },
    currencySign: { description: 'Optional. How negative values are displayed.' },
    testId: { description: 'The test identifier.' },
    value: { description: 'The amount.' },
  },
} satisfies Meta<typeof Currency>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Simple: Story = {
  args: { value: 1.99 },
};

export const WithCurrency: Story = {
  args: { currency: CurrencyCode.GBP, value: Simple.args.value },
};

export const WithDisplay: Story = {
  args: { currencyDisplay: CurrencyDisplay.Name, value: Simple.args.value },
};

export const WithSign: Story = {
  args: { currencySign: CurrencySign.Accounting, value: -Simple.args.value },
};
