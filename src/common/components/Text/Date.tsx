import dayjs from 'dayjs';

import { BaseComponentProps } from 'common/utils/types';
import { DateFormat } from 'common/utils/constants';

/**
 * Properties for the `Date` component.
 * @param {string|number} date - The date value expressed as an ISO 8601 date string or as a number of milliseconds.
 * @param {DateFormat} [format] - Optional. The format of the Date. Default: `DATE`
 * @see {@link BaseComponentProps}
 * @see {@link https://en.wikipedia.org/wiki/ISO_8601 | ISO 8601}
 */
export interface DateProps extends BaseComponentProps {
  date: string | number;
  format?: DateFormat;
}

/**
 * The `Date` React component formats and renders a date. Use the `format`
 * property to apply a pattern to format the date.
 * @param {Date} props - Component properties, `DateProps`.
 */
const Date = ({ className, date, testId = 'date', format = DateFormat.DATE }: DateProps) => {
  return (
    <span className={className} data-testid={testId}>
      {dayjs(date).format(format)}
    </span>
  );
};

export default Date;
