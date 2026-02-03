import { Cell, CellProps, Legend, Pie, PieChart, PieProps } from 'recharts';
import { CategoricalChartProps } from 'recharts/types/chart/generateCategoricalChart';

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
 * @see {@link CategoricalChartProps}
 * @see {@link PieProps}
 */
export interface DonutChartProps
  extends BaseComponentProps,
    Pick<CategoricalChartProps, 'height' | 'width'>,
    Pick<PieProps, 'innerRadius' | 'outerRadius' | 'paddingAngle'> {
  data: DonutChartData[];
}

/**
 * The `DonutChart` component renders a pie chart without the center.
 * @param {DonutChartProps} props - Component properties.
 * @returns {JSX.Element} JSX
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
}: DonutChartProps): JSX.Element => {
  return (
    <div className={className} data-testid={testId}>
      <PieChart height={height} width={width}>
        <Pie
          data={data}
          dataKey="value"
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          paddingAngle={paddingAngle}
          fill="#737373"
        >
          {data.map((cell, index) => (
            <Cell key={`cell-${index}`} fill={cell.fill} strokeWidth={0} />
          ))}
        </Pie>
        <Legend iconSize={8} iconType="circle" layout="vertical" align="right" verticalAlign="middle" />
      </PieChart>
    </div>
  );
};

export default DonutChart;
