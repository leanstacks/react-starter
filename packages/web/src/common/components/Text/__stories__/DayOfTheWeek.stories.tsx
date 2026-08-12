import type { Meta, StoryObj } from '@storybook/react-vite';
import dayjs from 'dayjs';

import DayOfTheWeek from '../DayOfTheWeek';

const meta = {
  title: 'Common/Text/DayOfTheWeek',
  component: DayOfTheWeek,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: { description: 'Additional CSS classes.' },
    date: {
      description: 'The date value expressed as an ISO 8601 date string or as a number of milliseconds.',
    },
    relative: {
      description:
        'Optional. Indicates if the day of the week should be expressed relative to the current day, i.e. `Yesterday`, `Today`, `Tomorrow`.',
    },
    testId: { description: 'The test identifier.' },
  },
} satisfies Meta<typeof DayOfTheWeek>;

export default meta;

type Story = StoryObj<typeof meta>;

const today = dayjs().toISOString();

const tomorrow = dayjs().add(1, 'days').toISOString();

const yesterday = dayjs().subtract(1, 'days').toISOString();

export const Simple: Story = {
  args: { date: '2024-12-20T18:01:31-05:00' },
};

export const Relative: Story = {
  args: { date: Simple.args.date, relative: true },
};

export const Today: Story = {
  args: { date: today, relative: true },
};

export const Tomorrow: Story = {
  args: { date: tomorrow, relative: true },
};

export const Yesterday: Story = {
  args: { date: yesterday, relative: true },
};
