import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import { SignDisplay, Unit, UnitDisplay } from '@react-starter/shared/utils/constants';

import { Decimal } from './Decimal';

describe('Decimal', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<Decimal value={3.1415} data-testid="decimal" />);
    await screen.findByTestId('decimal');

    // ASSERT
    expect(screen.getByTestId('decimal')).toBeDefined();
  });

  it('should use custom test ID', async () => {
    // ARRANGE
    render(<Decimal value={3.1415} data-testid="custom-testid" />);
    await screen.findByTestId('custom-testid');

    // ASSERT
    expect(screen.queryByTestId('decimal')).toBeNull();
    expect(screen.getByTestId('custom-testid')).toBeDefined();
  });

  it('should use classes from className property', async () => {
    // ARRANGE
    render(<Decimal value={3.1415} className="custom-class" data-testid="decimal" />);
    await screen.findByTestId('decimal');

    // ASSERT
    expect(screen.getByTestId('decimal').classList).toContain('custom-class');
  });

  it('should render integer value as decimal', async () => {
    // ARRANGE
    render(<Decimal value={3} minimumFractionDigits={1} data-testid="decimal" />);
    await screen.findByTestId('decimal');

    // ASSERT
    expect(screen.getByTestId('decimal').textContent).toBe('3.0');
  });

  it('should render decimal with units', async () => {
    // ARRANGE
    render(<Decimal value={3.1415} unit={Unit.Centimeter} data-testid="decimal" />);
    await screen.findByTestId('decimal');

    // ASSERT
    expect(screen.getByTestId('decimal').textContent).toBe('3.142 cm');
  });

  it('should render decimal with units and unit display', async () => {
    // ARRANGE
    render(<Decimal value={3.1415} unit={Unit.Centimeter} unitDisplay={UnitDisplay.Narrow} data-testid="decimal" />);
    await screen.findByTestId('decimal');

    // ASSERT
    expect(screen.getByTestId('decimal').textContent).toBe('3.142cm');
  });

  it('should render with minimum fraction digits', async () => {
    // ARRANGE
    render(<Decimal value={3.1415} minimumFractionDigits={6} data-testid="decimal" />);
    await screen.findByTestId('decimal');

    // ASSERT
    expect(screen.getByTestId('decimal').textContent).toBe('3.141500');
  });

  it('should render with maximum fraction digits', async () => {
    // ARRANGE
    render(<Decimal value={3.1415} maximumFractionDigits={1} data-testid="decimal" />);
    await screen.findByTestId('decimal');

    // ASSERT
    expect(screen.getByTestId('decimal').textContent).toBe('3.1');
  });

  it('should render with sign displayed always', async () => {
    // ARRANGE
    render(
      <div>
        <Decimal data-testid="positive" value={3.1415} signDisplay={SignDisplay.Always} />
        <Decimal data-testid="negative" value={-3.1415} signDisplay={SignDisplay.Always} />
        <Decimal data-testid="zero" value={0} signDisplay={SignDisplay.Always} />
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
        <Decimal data-testid="positive" value={3.1415} signDisplay={SignDisplay.Auto} />
        <Decimal data-testid="negative" value={-3.1415} signDisplay={SignDisplay.Auto} />
        <Decimal data-testid="zero" value={0} signDisplay={SignDisplay.Auto} />
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
        <Decimal data-testid="positive" value={3.1415} signDisplay={SignDisplay.Never} />
        <Decimal data-testid="negative" value={-3.1415} signDisplay={SignDisplay.Never} />
        <Decimal data-testid="zero" value={0} signDisplay={SignDisplay.Never} />
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
        <Decimal data-testid="positive" value={3.1415} signDisplay={SignDisplay.ExceptZero} />
        <Decimal data-testid="negative" value={-3.1415} signDisplay={SignDisplay.ExceptZero} />
        <Decimal data-testid="zero" value={0} signDisplay={SignDisplay.ExceptZero} />
      </div>,
    );
    await screen.findByTestId('zero');

    // ASSERT
    expect(screen.getByTestId('positive').textContent).toBe('+3.142');
    expect(screen.getByTestId('negative').textContent).toBe('-3.142');
    expect(screen.getByTestId('zero').textContent).toBe('0');
  });
});
