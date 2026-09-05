import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import { donutChartDataFixture } from '@react-starter/shared/__fixtures__/charts';

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
