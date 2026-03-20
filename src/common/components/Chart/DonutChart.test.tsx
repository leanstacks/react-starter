import { describe, expect, it } from 'vitest';
import { render, screen } from 'test/test-utils';

import { donutChartDataFixture } from '__fixtures__/charts';

import DonutChart from './DonutChart';

describe('DonutChart', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<DonutChart data={donutChartDataFixture} />);
    await screen.findByTestId('chart-donut');

    // ASSERT
    expect(screen.getByTestId('chart-donut')).toBeDefined();
  });
});
