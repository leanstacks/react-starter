import { useMemo } from 'react';

import { CurrencyCode, CurrencyDisplay, CurrencySign } from 'common/utils/constants';
import { formatNumber } from 'common/utils/numbers';
import { BaseComponentProps } from 'common/utils/types';

/**
 * Properties for the `Currency` component.
 * @param {CurrencyCode} [currency] - Optional. The ISO 4217 currency code. Default: `USD`.
 * @param {CurrencyDisplay} [currencyDisplay]  - Optional. How the currency is displayed. Default: `symbol`.
 * @param {CurrencySign} [currencySign] - Optional. How negative values are displayed. Default: `standard`.
 * @param {number} value - The amount.
 * @see {@link BaseComponentProps}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#options | NumberFormatOptions}
 */
export interface CurrencyProps extends BaseComponentProps {
  currency?: CurrencyCode;
  currencyDisplay?: CurrencyDisplay;
  currencySign?: CurrencySign;
  value: number;
}

/**
 * The `Currency` React component formats and renders a currency value.
 * @param {CurrencyProps} props - Component properties.
 */
const Currency = ({
  className,
  currency = CurrencyCode.USD,
  currencyDisplay,
  currencySign,
  value,
  testId = 'currency',
}: CurrencyProps) => {
  const val = useMemo(() => {
    const formatOptions: Intl.NumberFormatOptions = {
      style: 'currency',
      currency,
      currencyDisplay,
      currencySign,
    };
    return formatNumber(value, formatOptions);
  }, [value, currency, currencyDisplay, currencySign]);

  return (
    <span className={className} data-testid={testId}>
      {val}
    </span>
  );
};

export default Currency;
