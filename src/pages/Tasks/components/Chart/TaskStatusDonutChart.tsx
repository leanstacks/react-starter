import { useMemo } from 'react';
import { filter, reject } from 'lodash';
import colors from 'tailwindcss/colors';
import { useTranslation } from 'react-i18next';

import { cn } from 'common/utils/css';
import { BaseComponentProps } from 'common/utils/types';
import { Task } from 'pages/Tasks/api/useGetUserTasks';
import DonutChart, { DonutChartData, DonutChartProps } from 'common/components/Chart/DonutChart';

/**
 * Properties for the `TaskStatusDonutChart` component.
 * @param {Task[]} tasks - A collection of `Task` objects.
 * @see {@link BaseComponentProps}
 * @see {@link DonutChartProps}
 */
export interface TaskStatusDonutChartProps extends BaseComponentProps, Omit<DonutChartProps, 'data'> {
  tasks: Task[];
}

/**
 * The `TaskStatusDonutChart` component renders a `DonutChart` which displays
 * the relative count of incomplete and complete tasks.
 * @param {TaskStatusDonutChartProps} props - Component properties.
 */
const TaskStatusDonutChart = ({
  tasks,
  className,
  height = 56,
  width = 192,
  innerRadius = 12,
  outerRadius = 20,
  testId = 'chart-donut-task-status',
  ...chartProps
}: TaskStatusDonutChartProps) => {
  const { t } = useTranslation();

  if (tasks.length > 0) {
    // format the chart data
    const chartData: DonutChartData[] = useMemo(() => {
      return [
        {
          name: t('status.complete', { ns: 'tasks' }),
          value: filter(tasks, 'completed').length,
          fill: colors.green[600],
        },
        {
          name: t('status.incomplete', { ns: 'tasks' }),
          value: reject(tasks, 'completed').length,
          fill: colors.red[600],
        },
      ];
    }, [tasks]);

    // render the chart
    return (
      <DonutChart
        className={cn('text-xs', className)}
        data={chartData}
        height={height}
        width={width}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        testId={testId}
        {...chartProps}
      />
    );
  } else {
    // no tasks; render nothing
    return false;
  }
};

export default TaskStatusDonutChart;
