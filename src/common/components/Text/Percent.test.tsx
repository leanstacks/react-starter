import { describe, expect, it } from 'vitest';
import { render, screen } from 'test/test-utils';

import { SignDisplay } from 'common/utils/constants';

import Percent from './Percent';

describe('Percent', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<Percent value={0.12345678} />);
    await screen.findByTestId('percent');

    // ASSERT
    expect(screen.getByTestId('percent')).toBeDefined();
  });

  it('should use custom test ID', async () => {
    // ARRANGE
    render(<Percent value={0.12345678} testId="custom-testid" />);
    await screen.findByTestId('custom-testid');

    // ASSERT
    expect(screen.queryByTestId('percent')).toBeNull();
    expect(screen.getByTestId('custom-testid')).toBeDefined();
  });

  it('should use classes from className property', async () => {
    // ARRANGE
    render(<Percent value={0.12345678} className="custom-class" />);
    await screen.findByTestId('percent');

    // ASSERT
    expect(screen.getByTestId('percent').classList).toContain('custom-class');
  });

  it('should show a minimum number of decimal places', async () => {
    // ARRANGE
    render(<Percent value={0.12} minimumFractionDigits={2} />);
    await screen.findByTestId('percent');

    // ASSERT
    expect(screen.getByTestId('percent').textContent).toBe('12.00%');
  });

  it('should show a maximum number of decimal places', async () => {
    // ARRANGE
    render(<Percent value={0.12345678} maximumFractionDigits={2} />);
    await screen.findByTestId('percent');

    // ASSERT
    expect(screen.getByTestId('percent').textContent).toBe('12.35%');
  });

  it('should always show sign', async () => {
    // ARRANGE
    render(
      <div>
        <Percent testId="positive" value={0.12} signDisplay={SignDisplay.Always} />
        <Percent testId="negative" value={-0.12} signDisplay={SignDisplay.Always} />
        <Percent testId="zero" value={0} signDisplay={SignDisplay.Always} />
      </div>,
    );
    await screen.findByTestId('zero');

    // ASSERT
    expect(screen.getByTestId('positive').textContent).toBe('+12%');
    expect(screen.getByTestId('negative').textContent).toBe('-12%');
    expect(screen.getByTestId('zero').textContent).toBe('+0%');
  });
});
