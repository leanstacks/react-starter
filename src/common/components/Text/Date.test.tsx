import { describe, expect, it } from 'vitest';
import { render, screen } from 'test/test-utils';

import { DateFormat } from 'common/utils/constants';
import Date from './Date';

describe('Date', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<Date date={0} />);
    await screen.findByTestId('date');

    // ASSERT
    expect(screen.getByTestId('date')).toBeDefined();
  });

  it('should use custom testID', async () => {
    // ARRANGE
    render(<Date date={0} testId="custom-testid" />);
    await screen.findByTestId('custom-testid');

    // ASSERT
    expect(screen.queryByTestId('date')).toBeNull();
    expect(screen.getByTestId('custom-testid')).toBeDefined();
  });

  it('should use classes from className property', async () => {
    // ARRANGE
    render(<Date date={0} className="custom-class" />);
    await screen.findByTestId('date');

    // ASSERT
    expect(screen.getByTestId('date').classList).toContain('custom-class');
  });
  it('should render format Date successfully', async () => {
    // ARRANGE
    render(<Date date={0} format={DateFormat.DATE} />);
    await screen.findByTestId('date');

    // ASSERT
    expect(screen.getByTestId('date')).toBeDefined();
  });

  it('should render format DayOfWeek successfully', async () => {
    // ARRANGE
    render(<Date date={0} format={DateFormat.DAY_OF_WEEK} />);
    await screen.findAllByTestId('date');

    // ASSERT
    expect(screen.getByTestId('date')).toBeDefined();
  });

  it('should render format HoursAndMinutes successfully', async () => {
    // ARRANGE
    render(<Date date={0} format={DateFormat.HOURS_AND_MINUTES} />);
    await screen.findByTestId('date');

    // ASSERT
    expect(screen.getByTestId('date')).toBeDefined();
  });

  it('should render format Time successfully', async () => {
    // ARRANGE
    render(<Date date={0} format={DateFormat.TIME} />);
    await screen.findByTestId('date');

    // ASSERT
    expect(screen.getByTestId('date')).toBeDefined();
  });

  it('should render format Timestamp successfully', async () => {
    // ARRANGE
    render(<Date date={0} format={DateFormat.TIMESTAMP} />);
    await screen.findByTestId('date');

    // ASSERT
    expect(screen.getByTestId('date')).toBeDefined();
  });

  it('should render format TimestampShort successfully', async () => {
    // ARRANGE
    render(<Date date={0} format={DateFormat.TIMESTAMP_SHORT} />);
    await screen.findByTestId('date');

    // ASSERT
    expect(screen.getByTestId('date')).toBeDefined();
  });
});
