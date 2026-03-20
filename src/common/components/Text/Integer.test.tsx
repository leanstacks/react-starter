import { describe, expect, it } from 'vitest';
import { render, screen } from 'test/test-utils';

import { SignDisplay, Unit, UnitDisplay } from 'common/utils/constants';

import Integer from './Integer';

describe('Integer', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<Integer value={1000} />);
    await screen.findByTestId('integer');

    // ASSERT
    expect(screen.getByTestId('integer')).toBeDefined();
  });

  it('should use custom test ID', async () => {
    // ARRANGE
    render(<Integer value={1000} testId="custom-testid" />);
    await screen.findByTestId('custom-testid');

    // ASSERT
    expect(screen.queryByTestId('integer')).toBeNull();
    expect(screen.getByTestId('custom-testid')).toBeDefined();
  });

  it('should use classes from className property', async () => {
    // ARRANGE
    render(<Integer value={1000} className="custom-class" />);
    await screen.findByTestId('integer');

    // ASSERT
    expect(screen.getByTestId('integer').classList).toContain('custom-class');
  });

  it('should render decimal value as integer', async () => {
    // ARRANGE
    render(<Integer value={1000.1234} />);
    await screen.findByTestId('integer');

    // ASSERT
    expect(screen.getByTestId('integer').textContent).toBe('1,000');
  });

  it('should render integer with units', async () => {
    // ARRANGE
    render(<Integer value={1000} unit={Unit.Centimeter} />);
    await screen.findByTestId('integer');

    // ASSERT
    expect(screen.getByTestId('integer').textContent).toBe('1,000 cm');
  });

  it('should render integer with units and unit display', async () => {
    // ARRANGE
    render(<Integer value={1000} unit={Unit.Centimeter} unitDisplay={UnitDisplay.Narrow} />);
    await screen.findByTestId('integer');

    // ASSERT
    expect(screen.getByTestId('integer').textContent).toBe('1,000cm');
  });

  it('should render with sign displayed always', async () => {
    // ARRANGE
    render(
      <div>
        <Integer testId="positive" value={1000} signDisplay={SignDisplay.Always} />
        <Integer testId="negative" value={-1000} signDisplay={SignDisplay.Always} />
        <Integer testId="zero" value={0} signDisplay={SignDisplay.Always} />
      </div>,
    );
    await screen.findByTestId('zero');

    // ASSERT
    expect(screen.getByTestId('positive').textContent).toBe('+1,000');
    expect(screen.getByTestId('negative').textContent).toBe('-1,000');
    expect(screen.getByTestId('zero').textContent).toBe('+0');
  });

  it('should render with sign only on negative values', async () => {
    // ARRANGE
    render(
      <div>
        <Integer testId="positive" value={1000} signDisplay={SignDisplay.Auto} />
        <Integer testId="negative" value={-1000} signDisplay={SignDisplay.Auto} />
        <Integer testId="zero" value={0} signDisplay={SignDisplay.Auto} />
      </div>,
    );
    await screen.findByTestId('zero');

    // ASSERT
    expect(screen.getByTestId('positive').textContent).toBe('1,000');
    expect(screen.getByTestId('negative').textContent).toBe('-1,000');
    expect(screen.getByTestId('zero').textContent).toBe('0');
  });

  it('should render with no sign', async () => {
    // ARRANGE
    render(
      <div>
        <Integer testId="positive" value={1000} signDisplay={SignDisplay.Never} />
        <Integer testId="negative" value={-1000} signDisplay={SignDisplay.Never} />
        <Integer testId="zero" value={0} signDisplay={SignDisplay.Never} />
      </div>,
    );
    await screen.findByTestId('zero');

    // ASSERT
    expect(screen.getByTestId('positive').textContent).toBe('1,000');
    expect(screen.getByTestId('negative').textContent).toBe('1,000');
    expect(screen.getByTestId('zero').textContent).toBe('0');
  });

  it('should render with sign displayed except for zero', async () => {
    // ARRANGE
    render(
      <div>
        <Integer testId="positive" value={1000} signDisplay={SignDisplay.ExceptZero} />
        <Integer testId="negative" value={-1000} signDisplay={SignDisplay.ExceptZero} />
        <Integer testId="zero" value={0} signDisplay={SignDisplay.ExceptZero} />
      </div>,
    );
    await screen.findByTestId('zero');

    // ASSERT
    expect(screen.getByTestId('positive').textContent).toBe('+1,000');
    expect(screen.getByTestId('negative').textContent).toBe('-1,000');
    expect(screen.getByTestId('zero').textContent).toBe('0');
  });
});
