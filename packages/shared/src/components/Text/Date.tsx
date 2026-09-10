import { format } from 'date-fns';

import { DateFormat } from '@react-starter/shared/utils/constants';

/**
 * Properties for the `Date` component.
 * @param {string|number} date - The date value expressed as an ISO 8601 date string or as a number of milliseconds.
 * @param {DateFormat} [format] - Optional. The format of the Date. Default: `DATE`
 * @see {@link https://en.wikipedia.org/wiki/ISO_8601 | ISO 8601}
 */
export interface DateProps extends React.ComponentProps<'span'> {
  date: string | number | Date;
  formatStr?: string;
}

/**
 * The `Date` React component formats and renders a date. Use the `format`
 * property to apply a pattern to format the date.
 * @param {Date} props - Component properties, `DateProps`.
 */
const Date = ({ date, formatStr = DateFormat.DATE, ...props }: DateProps) => {
  return <span {...props}>{format(date, formatStr)}</span>;
};

export { Date };
