import { useMemo } from 'react';

import { formatNumber } from '@react-starter/shared/utils/numbers';
import { SignDisplay, Unit, UnitDisplay } from '@react-starter/shared/utils/constants';

/**
 * Properties for the `Integer` component.
 * @param {SignDisplay} [signDisplay] - Optional. When to display the sign for the number. Default: `auto`
 * @param {Unit} [unit] - Optional. When included, formatted value includes unit of measurement.
 * @param {UnitDisplay} [unitDisplay] - Optional. Display of the unit of measurement. Default: `short`
 * @param {number} value - The integer value, e.g. `100`.
 * @see {@link BaseComponentProps}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#options NumberFormatOptions}
 */
export interface IntegerProps extends React.ComponentProps<'span'> {
  signDisplay?: SignDisplay;
  unit?: Unit;
  unitDisplay?: UnitDisplay;
  value: number;
}

/**
 * The `Integer` React component formats and renders an integer number.
 * @param {IntegerProps} props - Component properties.
 */
const Integer = ({ signDisplay, unit, unitDisplay, value, ...props }: IntegerProps) => {
  const val = useMemo(() => {
    const formatOptions: Intl.NumberFormatOptions = { maximumFractionDigits: 0, signDisplay };
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
  }, [value, signDisplay, unit, unitDisplay]);

  return <span {...props}>{val}</span>;
};

export { Integer };
