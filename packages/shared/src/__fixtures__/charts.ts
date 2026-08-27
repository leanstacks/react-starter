import colors from 'tailwindcss/colors';

import { DonutChartData } from '@react-starter/shared/components/Chart/DonutChart';

export const donutChartDataFixture: DonutChartData[] = [
  {
    name: 'Apples',
    value: 3,
    fill: colors.red[700],
  },
  {
    name: 'Oranges',
    value: 7,
    fill: colors.orange[300],
  },
];
