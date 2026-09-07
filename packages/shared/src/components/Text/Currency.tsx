import { useMemo } from 'react';

import { CurrencyCode, CurrencyDisplay, CurrencySign } from '@react-starter/shared/utils/constants';
import { formatNumber } from '@react-starter/shared/utils/numbers';

/**
 * Properties for the `Currency` component.
 * @param {CurrencyCode} [currency] - Optional. The ISO 4217 currency code. Default: `USD`.
 * @param {CurrencyDisplay} [currencyDisplay]  - Optional. How the currency is displayed. Default: `symbol`.
 * @param {CurrencySign} [currencySign] - Optional. How negative values are displayed. Default: `standard`.
 * @param {number} value - The amount.
 * @see {@link BaseComponentProps}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#options | NumberFormatOptions}
 */
interface CurrencyProps extends React.ComponentProps<'span'> {
  currency?: CurrencyCode;
  currencyDisplay?: CurrencyDisplay;
  currencySign?: CurrencySign;
  value: number;
}

/**
 * The `Currency` React component formats and renders a currency value.
 * @param {CurrencyProps} props - Component properties.
 */
const Currency = ({ currency = CurrencyCode.USD, currencyDisplay, currencySign, value, ...props }: CurrencyProps) => {
  const val = useMemo(() => {
    const formatOptions: Intl.NumberFormatOptions = {
      style: 'currency',
      currency,
      currencyDisplay,
      currencySign,
    };
    return formatNumber(value, formatOptions);
  }, [value, currency, currencyDisplay, currencySign]);

  return <span {...props}>{val}</span>;
};

export { Currency };
