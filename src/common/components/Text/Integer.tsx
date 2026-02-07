import { useMemo } from 'react';

import { formatNumber } from '../../utils/numbers';
import { BaseComponentProps } from 'common/utils/types';
import { SignDisplay, Unit, UnitDisplay } from 'common/utils/constants';

/**
 * Properties for the `Integer` component.
 * @param {SignDisplay} [signDisplay] - Optional. When to display the sign for the number. Default: `auto`
 * @param {Unit} [unit] - Optional. When included, formatted value includes unit of measurement.
 * @param {UnitDisplay} [unitDisplay] - Optional. Display of the unit of measurement. Default: `short`
 * @param {number} value - The integer value, e.g. `100`.
 * @see {@link BaseComponentProps}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#options NumberFormatOptions}
 */
export interface IntegerProps extends BaseComponentProps {
  signDisplay?: SignDisplay;
  unit?: Unit;
  unitDisplay?: UnitDisplay;
  value: number;
}

/**
 * The `Integer` React component formats and renders an integer number.
 * @param {IntegerProps} props - Component properties.
 */
const Integer = ({ className, signDisplay, unit, unitDisplay, value, testId = 'integer' }: IntegerProps) => {
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

  return (
    <span className={className} data-testid={testId}>
      {val}
    </span>
  );
};

export default Integer;
