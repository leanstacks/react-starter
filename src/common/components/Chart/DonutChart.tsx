import { CellProps, Legend, Pie, PieChart, PieProps } from 'recharts';

import { BaseComponentProps } from 'common/utils/types';

/**
 * Describes a single piece of data for a `DonutChart` used to create a single
 * slice of the chart.
 */
export type DonutChartData = Pick<CellProps, 'fill'> & {
  name: string;
  value: number;
};

/**
 * Properties for the `DonutChart` component.
 * @param {DonutChartData[]} data - A collection of `DonutChartData` objects.
 * @see {@link BaseComponentProps}
 * @see {@link PieProps}
 * @see {@link PieProps}
 */
export interface DonutChartProps
  extends BaseComponentProps, Pick<PieProps, 'height' | 'innerRadius' | 'outerRadius' | 'paddingAngle' | 'width'> {
  data: DonutChartData[];
}

/**
 * The `DonutChart` component renders a pie chart without the center.
 * @param {DonutChartProps} props - Component properties.
 * @see {@link https://recharts.org/en-US/api/PieChart PieChart}
 */
const DonutChart = ({
  className,
  data,
  height = 96,
  width = 256,
  innerRadius = 20,
  outerRadius = 32,
  paddingAngle = 0,
  testId = 'chart-donut',
}: DonutChartProps) => {
  return (
    <div className={className} data-testid={testId}>
      <PieChart height={Number(height)} width={Number(width)}>
        <Pie
          data={data}
          dataKey="value"
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          paddingAngle={paddingAngle}
          strokeWidth={0}
        />
        <Legend iconSize={8} iconType="circle" layout="vertical" align="right" verticalAlign="middle" />
      </PieChart>
    </div>
  );
};

export default DonutChart;
