import { useMemo } from 'react';

import { formatNumber } from '@react-starter/shared/utils/numbers';
import { SignDisplay, Unit, UnitDisplay } from '@react-starter/shared/utils/constants';

/**
 * Properties for the `Decimal` component.
 * @param {number} [minimumFractionDigits] - Optional. The minimum number of fraction digits to use. Default: `0`
 * @param {number} [maximumFractionDigits] - Optional. The maximum number of fraction digits to use. Default: the larger of `minimumFractionDigits` and `0`
 * @param {SignDisplay} [signDisplay] - Optional. When to display the sign for the number. Default: `auto`
 * @param {Unit} [unit] - Optional. When included, formatted value includes unit of measurement.
 * @param {UnitDisplay} [unitDisplay] - Optional. Display of the unit of measurement. Default: `short`
 * @param {number} value - The decimal value, e.g. `0.34` renders: 0.34
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#options | NumberFormatOptions}
 */
interface DecimalProps extends React.ComponentProps<'span'> {
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
  maximumFractionDigits,
  minimumFractionDigits,
  signDisplay,
  unit,
  unitDisplay,
  value,
  ...props
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

  return <span {...props}>{val}</span>;
};

export { Decimal };
