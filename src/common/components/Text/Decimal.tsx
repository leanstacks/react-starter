import { useMemo } from 'react';

import { formatNumber } from 'common/utils/numbers';
import { BaseComponentProps } from 'common/utils/types';
import { SignDisplay, Unit, UnitDisplay } from 'common/utils/constants';

/**
 * Properties for the `Decimal` component.
 * @param {number} [minimumFractionDigits] - Optional. The minimum number of fraction digits to use. Default: `0`
 * @param {number} [maximumFractionDigits] - Optional. The maximum number of fraction digits to use. Default: the larger of `minimumFractionDigits` and `0`
 * @param {SignDisplay} [signDisplay] - Optional. When to display the sign for the number. Default: `auto`
 * @param {Unit} [unit] - Optional. When included, formatted value includes unit of measurement.
 * @param {UnitDisplay} [unitDisplay] - Optional. Display of the unit of measurement. Default: `short`
 * @param {number} value - The decimal value, e.g. `0.34` renders: 0.34
 * @see {@link BaseComponentProps}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#options | NumberFormatOptions}
 */
export interface DecimalProps extends BaseComponentProps {
  maximumFractionDigits?: number;
  minimumFractionDigits?: number;
  signDisplay?: SignDisplay;
  unit?: Unit;
  unitDisplay?: UnitDisplay;
  value: number;
}

/**
 * The `Decimal` React component formats and renders a decimal number.
 * @param {DecimalProps} props - Component properties.
 */
const Decimal = ({
  className,
  maximumFractionDigits,
  minimumFractionDigits,
  signDisplay,
  unit,
  unitDisplay,
  value,
  testId = 'decimal',
}: DecimalProps) => {
  const val = useMemo(() => {
    const formatOptions: Intl.NumberFormatOptions = {
      maximumFractionDigits,
      minimumFractionDigits,
      signDisplay,
    };
    // if formatting with units
    if (unit) {
      return formatNumber(value, {
        style: 'unit',
        unit,
        unitDisplay,
        ...formatOptions,
      });
    }
    // everything else
    return formatNumber(value, formatOptions);
  }, [value, maximumFractionDigits, minimumFractionDigits, signDisplay, unit, unitDisplay]);

  return (
    <span className={className} data-testid={testId}>
      {val}
    </span>
  );
};

export default Decimal;
