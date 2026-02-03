import { describe, expect, it } from 'vitest';
import { render, screen } from 'test/test-utils';

import Currency from '../Currency';
import { CurrencyCode, CurrencyDisplay, CurrencySign } from 'common/utils/constants';

describe('Currency', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<Currency value={19.99} />);
    await screen.findByTestId('currency');

    // ASSERT
    expect(screen.getByTestId('currency')).toBeDefined();
  });

  it('should use custom test ID', async () => {
    // ARRANGE
    render(<Currency value={19.99} testId="custom-testid" />);
    await screen.findByTestId('custom-testid');

    // ASSERT
    expect(screen.queryByTestId('currency')).toBeNull();
    expect(screen.getByTestId('custom-testid')).toBeDefined();
  });

  it('should use classes from className property', async () => {
    // ARRANGE
    render(<Currency value={19.99} className="custom-class" />);
    await screen.findByTestId('currency');

    // ASSERT
    expect(screen.getByTestId('currency').classList).toContain('custom-class');
  });

  it('should use default currency code', async () => {
    // ARRANGE
    render(<Currency value={19.99} />);
    await screen.findByTestId('currency');

    // ASSERT
    expect(screen.getByTestId('currency').textContent).toBe('$19.99');
  });

  it('should use specified currency code', async () => {
    // ARRANGE
    render(<Currency value={19.99} currency={CurrencyCode.CAD} />);
    await screen.findByTestId('currency');

    // ASSERT
    expect(screen.getByTestId('currency').textContent).toBe('CA$19.99');
  });

  it('should use default currency display', async () => {
    // ARRANGE
    render(<Currency value={19.99} currency={CurrencyCode.CAD} />);
    await screen.findByTestId('currency');

    // ASSERT
    expect(screen.getByTestId('currency').textContent).toBe('CA$19.99');
  });

  it('should use specified currency display', async () => {
    // ARRANGE
    render(<Currency value={19.99} currency={CurrencyCode.CAD} currencyDisplay={CurrencyDisplay.Name} />);
    await screen.findByTestId('currency');

    // ASSERT
    expect(screen.getByTestId('currency').textContent).toBe('19.99 Canadian dollars');
  });

  it('should use default currency sign', async () => {
    // ARRANGE
    render(<Currency value={-19.99} />);
    await screen.findByTestId('currency');

    // ASSERT
    expect(screen.getByTestId('currency').textContent).toBe('-$19.99');
  });

  it('should use accounting currency sign', async () => {
    // ARRANGE
    render(<Currency value={-19.99} currencySign={CurrencySign.Accounting} />);
    await screen.findByTestId('currency');

    // ASSERT
    expect(screen.getByTestId('currency').textContent).toBe('($19.99)');
  });
});
