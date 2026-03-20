import { describe, expect, it } from 'vitest';
import { render, screen } from 'test/test-utils';

import { SignDisplay, Unit, UnitDisplay } from 'common/utils/constants';

import Decimal from './Decimal';

describe('Decimal', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<Decimal value={3.1415} />);
    await screen.findByTestId('decimal');

    // ASSERT
    expect(screen.getByTestId('decimal')).toBeDefined();
  });

  it('should use custom test ID', async () => {
    // ARRANGE
    render(<Decimal value={3.1415} testId="custom-testid" />);
    await screen.findByTestId('custom-testid');

    // ASSERT
    expect(screen.queryByTestId('decimal')).toBeNull();
    expect(screen.getByTestId('custom-testid')).toBeDefined();
  });

  it('should use classes from className property', async () => {
    // ARRANGE
    render(<Decimal value={3.1415} className="custom-class" />);
    await screen.findByTestId('decimal');

    // ASSERT
    expect(screen.getByTestId('decimal').classList).toContain('custom-class');
  });

  it('should render integer value as decimal', async () => {
    // ARRANGE
    render(<Decimal value={3} minimumFractionDigits={1} />);
    await screen.findByTestId('decimal');

    // ASSERT
    expect(screen.getByTestId('decimal').textContent).toBe('3.0');
  });

  it('should render decimal with units', async () => {
    // ARRANGE
    render(<Decimal value={3.1415} unit={Unit.Centimeter} />);
    await screen.findByTestId('decimal');

    // ASSERT
    expect(screen.getByTestId('decimal').textContent).toBe('3.142 cm');
  });

  it('should render decimal with units and unit display', async () => {
    // ARRANGE
    render(<Decimal value={3.1415} unit={Unit.Centimeter} unitDisplay={UnitDisplay.Narrow} />);
    await screen.findByTestId('decimal');

    // ASSERT
    expect(screen.getByTestId('decimal').textContent).toBe('3.142cm');
  });

  it('should render with minimum fraction digits', async () => {
    // ARRANGE
    render(<Decimal value={3.1415} minimumFractionDigits={6} />);
    await screen.findByTestId('decimal');

    // ASSERT
    expect(screen.getByTestId('decimal').textContent).toBe('3.141500');
  });

  it('should render with maximum fraction digits', async () => {
    // ARRANGE
    render(<Decimal value={3.1415} maximumFractionDigits={1} />);
    await screen.findByTestId('decimal');

    // ASSERT
    expect(screen.getByTestId('decimal').textContent).toBe('3.1');
  });

  it('should render with sign displayed always', async () => {
    // ARRANGE
    render(
      <div>
        <Decimal testId="positive" value={3.1415} signDisplay={SignDisplay.Always} />
        <Decimal testId="negative" value={-3.1415} signDisplay={SignDisplay.Always} />
        <Decimal testId="zero" value={0} signDisplay={SignDisplay.Always} />
      </div>,
    );
    await screen.findByTestId('zero');

    // ASSERT
    expect(screen.getByTestId('positive').textContent).toBe('+3.142');
    expect(screen.getByTestId('negative').textContent).toBe('-3.142');
    expect(screen.getByTestId('zero').textContent).toBe('+0');
  });

  it('should render with a sign only on negative values', async () => {
    // ARRANGE
    render(
      <div>
        <Decimal testId="positive" value={3.1415} signDisplay={SignDisplay.Auto} />
        <Decimal testId="negative" value={-3.1415} signDisplay={SignDisplay.Auto} />
        <Decimal testId="zero" value={0} signDisplay={SignDisplay.Auto} />
      </div>,
    );
    await screen.findByTestId('zero');

    expect(screen.getByTestId('positive').textContent).toBe('3.142');
    expect(screen.getByTestId('negative').textContent).toBe('-3.142');
    expect(screen.getByTestId('zero').textContent).toBe('0');
  });

  it('should render with no sign', async () => {
    // ARRANGE
    render(
      <div>
        <Decimal testId="positive" value={3.1415} signDisplay={SignDisplay.Never} />
        <Decimal testId="negative" value={-3.1415} signDisplay={SignDisplay.Never} />
        <Decimal testId="zero" value={0} signDisplay={SignDisplay.Never} />
      </div>,
    );
    await screen.findByTestId('zero');

    // ASSERT
    expect(screen.getByTestId('positive').textContent).toBe('3.142');
    expect(screen.getByTestId('negative').textContent).toBe('3.142');
    expect(screen.getByTestId('zero').textContent).toBe('0');
  });

  it('should render with sign displayed except for zero', async () => {
    // ARRANGE
    render(
      <div>
        <Decimal testId="positive" value={3.1415} signDisplay={SignDisplay.ExceptZero} />
        <Decimal testId="negative" value={-3.1415} signDisplay={SignDisplay.ExceptZero} />
        <Decimal testId="zero" value={0} signDisplay={SignDisplay.ExceptZero} />
      </div>,
    );
    await screen.findByTestId('zero');

    // ASSERT
    expect(screen.getByTestId('positive').textContent).toBe('+3.142');
    expect(screen.getByTestId('negative').textContent).toBe('-3.142');
    expect(screen.getByTestId('zero').textContent).toBe('0');
  });
});
