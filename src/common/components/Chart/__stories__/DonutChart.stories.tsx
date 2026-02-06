import type { Meta, StoryObj } from '@storybook/react-vite';

import { donutChartDataFixture } from '__fixtures__/charts';

import DonutChart from '../DonutChart';

const meta = {
  title: 'Common/Chart/DonutChart',
  component: DonutChart,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: { description: 'Additional CSS classes.' },
    data: { description: 'A collection of `DonutChartData` objects.' },
    height: { description: 'The chart height in pixels.' },
    width: { description: 'The chart width in pixels.' },
    innerRadius: { description: 'The radius of the inside curve of the donut in pixels.' },
    outerRadius: { description: 'The radius of the outside curve of the donut in pixels.' },
    paddingAngle: { description: 'The padding between wedges in the donut chart in pixels.' },
    testId: { description: 'The test identifier.' },
  },
  args: {
    data: donutChartDataFixture,
  },
} satisfies Meta<typeof DonutChart>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Simple: Story = {};

export const Larger: Story = {
  args: {
    height: 256,
    width: 512,
    innerRadius: 96,
    outerRadius: 128,
  },
};

export const WithPadding: Story = {
  args: {
    height: 256,
    width: 512,
    innerRadius: 96,
    outerRadius: 128,
    paddingAngle: 8,
  },
};
