import { useMemo } from 'react';

import { BaseComponentProps } from 'common/utils/types';
import { SignDisplay } from 'common/utils/constants';
import { formatNumber } from 'common/utils/numbers';

/**
 * Properties for the `Percent` component.
 * @param {number} [minimumFractionDigits] - Optional. The minimum number of fraction digits to use. Default: `0`
 * @param {number} [maximumFractionDigits] - Optional. The maximum number of fraction digits to use. Default: the larger of `minimumFractionDigits` and `0`
 * @param {SignDisplay} [signDisplay] - Optional. When to display the sign for the number. Default: `auto`
 * @param {number} value - The percent as a decimal value, e.g. `0.34` renders 34%.
 * @see {@link BaseComponentProps}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#options NumberFormatOptions}
 */
export interface PercentProps extends BaseComponentProps {
  maximumFractionDigits?: number;
  minimumFractionDigits?: number;
  signDisplay?: SignDisplay;
  value: number;
}

/**
 * The `Percent` React component formats and renders a percent value.
 * @param {PercentProps} props - Component properties.
 */
const Percent = ({
  className,
  maximumFractionDigits,
  minimumFractionDigits,
  signDisplay,
  value,
  testId = 'percent',
}: PercentProps) => {
  const val = useMemo(() => {
    const formatOptions: Intl.NumberFormatOptions = {
      style: 'percent',
      maximumFractionDigits,
      minimumFractionDigits,
      signDisplay,
    };
    return formatNumber(value, formatOptions);
  }, [value, maximumFractionDigits, minimumFractionDigits, signDisplay]);

  return (
    <span className={className} data-testid={testId}>
      {val}
    </span>
  );
};

export default Percent;
