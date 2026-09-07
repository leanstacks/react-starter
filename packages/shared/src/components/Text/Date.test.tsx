import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import { DateFormat } from '@react-starter/shared/utils/constants';
import { Date } from './Date';

describe('Date', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<Date date={0} data-testid="date" />);
    await screen.findByTestId('date');

    // ASSERT
    expect(screen.getByTestId('date')).toBeDefined();
  });

  it('should use classes from className property', async () => {
    // ARRANGE
    render(<Date date={0} className="custom-class" data-testid="date" />);
    await screen.findByTestId('date');

    // ASSERT
    expect(screen.getByTestId('date').classList).toContain('custom-class');
  });
  it('should render format Date successfully', async () => {
    // ARRANGE
    render(<Date date={0} format={DateFormat.DATE} data-testid="date" />);
    await screen.findByTestId('date');

    // ASSERT
    expect(screen.getByTestId('date')).toBeDefined();
  });

  it('should render format DayOfWeek successfully', async () => {
    // ARRANGE
    render(<Date date={0} format={DateFormat.DAY_OF_WEEK} data-testid="date" />);
    await screen.findByTestId('date');

    // ASSERT
    expect(screen.getByTestId('date')).toBeDefined();
  });

  it('should render format HoursAndMinutes successfully', async () => {
    // ARRANGE
    render(<Date date={0} format={DateFormat.HOURS_AND_MINUTES} data-testid="date" />);
    await screen.findByTestId('date');

    // ASSERT
    expect(screen.getByTestId('date')).toBeDefined();
  });

  it('should render format Time successfully', async () => {
    // ARRANGE
    render(<Date date={0} format={DateFormat.TIME} data-testid="date" />);
    await screen.findByTestId('date');

    // ASSERT
    expect(screen.getByTestId('date')).toBeDefined();
  });

  it('should render format Timestamp successfully', async () => {
    // ARRANGE
    render(<Date date={0} format={DateFormat.TIMESTAMP} data-testid="date" />);
    await screen.findByTestId('date');

    // ASSERT
    expect(screen.getByTestId('date')).toBeDefined();
  });

  it('should render format TimestampShort successfully', async () => {
    // ARRANGE
    render(<Date date={0} format={DateFormat.TIMESTAMP_SHORT} data-testid="date" />);
    await screen.findByTestId('date');

    // ASSERT
    expect(screen.getByTestId('date')).toBeDefined();
  });
});
