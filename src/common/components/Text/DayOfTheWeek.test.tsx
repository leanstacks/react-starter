import { describe, expect, it } from 'vitest';
import { render, screen } from 'test/test-utils';
import dayjs from 'dayjs';

import DayOfTheWeek from './DayOfTheWeek';

describe('DayOfTheWeek', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<DayOfTheWeek date={0} />);
    await screen.findByTestId('day-of-the-week');

    // ASSERT
    expect(screen.getByTestId('day-of-the-week')).toBeDefined();
  });

  it('should use custom testID', async () => {
    // ARRANGE
    render(<DayOfTheWeek date={0} testId="custom-testid" />);
    await screen.findByTestId('custom-testid');

    // ASSERT
    expect(screen.queryByTestId('day-of-the-week')).toBeNull();
    expect(screen.getByTestId('custom-testid')).toBeDefined();
  });

  it('should use classes from className property', async () => {
    // ARRANGE
    render(<DayOfTheWeek date={0} className="custom-class" />);
    await screen.findByTestId('day-of-the-week');

    // ASSERT
    expect(screen.getByTestId('day-of-the-week').classList).toContain('custom-class');
  });

  it('should render relative Today', async () => {
    // ARRANGE
    render(<DayOfTheWeek date={new Date().toISOString()} relative />);
    await screen.findByTestId('day-of-the-week');

    // ASSERT
    expect(screen.getByTestId('day-of-the-week').textContent).toBe('Today');
  });

  it('should render relative Tomorrow', async () => {
    // ARRANGE
    const tomorrow = dayjs().add(1, 'day');
    render(<DayOfTheWeek date={tomorrow.toISOString()} relative />);
    await screen.findByTestId('day-of-the-week');

    // ASSERT
    expect(screen.getByTestId('day-of-the-week').textContent).toBe('Tomorrow');
  });

  it('should render relative Yesterday', async () => {
    // ARRANGE
    const yesterday = dayjs().subtract(1, 'day');
    render(<DayOfTheWeek date={yesterday.toISOString()} relative />);
    await screen.findByTestId('day-of-the-week');

    // ASSERT
    expect(screen.getByTestId('day-of-the-week').textContent).toBe('Yesterday');
  });

  it('should render relative day of the week', async () => {
    // ARRANGE
    const dow = dayjs('09/01/2023');
    render(<DayOfTheWeek date={dow.toISOString()} relative />);
    await screen.findByTestId('day-of-the-week');

    // ASSERT
    expect(screen.getByTestId('day-of-the-week').textContent).toBe('Friday');
  });
});
