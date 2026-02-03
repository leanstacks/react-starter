import type { Meta, StoryObj } from '@storybook/react';

import { DateFormat } from 'common/utils/constants';

import Date from '../Date';

const meta = {
  title: 'Common/Text/Date',
  component: Date,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: { description: 'Additional CSS classes.' },
    date: {
      description: 'The date value expressed as an ISO 8601 date string or as a number of milliseconds.',
    },
    format: { description: 'Optional. The format of the Date.' },
    testId: { description: 'The test identifier.' },
  },
} satisfies Meta<typeof Date>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Simple: Story = {
  args: { date: '2024-12-20T18:01:31-05:00' },
};

export const DayOfWeek: Story = {
  args: { date: Simple.args.date, format: DateFormat.DAY_OF_WEEK },
};

export const HoursAndMinutes: Story = {
  args: { date: Simple.args.date, format: DateFormat.HOURS_AND_MINUTES },
};

export const Time: Story = {
  args: { date: Simple.args.date, format: DateFormat.TIME },
};

export const TimestampShort: Story = {
  args: { date: Simple.args.date, format: DateFormat.TIMESTAMP_SHORT },
};

export const Timestamp: Story = {
  args: { date: Simple.args.date, format: DateFormat.TIMESTAMP },
};
