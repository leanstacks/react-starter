import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import isTomorrow from 'dayjs/plugin/isTomorrow';
import isYesterday from 'dayjs/plugin/isYesterday';

import { BaseComponentProps } from 'common/utils/types';
import { DateFormat } from 'common/utils/constants';
import Date from './Date';

dayjs.extend(isToday);
dayjs.extend(isTomorrow);
dayjs.extend(isYesterday);

const TODAY = 'Today';
const TOMORROW = 'Tomorrow';
const YESTERDAY = 'Yesterday';

/**
 * Properties for the `DayOfTheWeek` component.
 * @param {string|number} date - The date value expressed as an ISO 8601 date string or as a number of milliseconds.
 * @param {boolean} [relative] - Optional. Indicates if the day of the week should be expressed relative to the current day, i.e. `Yesterday`, `Today`, `Tomorrow`.
 * @see {@link BaseComponentProps}
 * @see {@link https://en.wikipedia.org/wiki/ISO_8601 | ISO 8601}
 */
export interface DayOfTheWeekProps extends BaseComponentProps {
  date: string | number;
  relative?: boolean;
}

/**
 * The `DayOfTheWeek` React component renders the day of the week,
 * e.g. `Monday`, for the supplied date value.
 * @param {DayOfTheWeekProps} props - Component properties, `DayOfTheWeekProps`.
 */
const DayOfTheWeek = ({ className, date, relative = false, testId = 'day-of-the-week' }: DayOfTheWeekProps) => {
  if (relative) {
    let relativeDayOfTheWeek: string | null = null;
    const theDate = dayjs(date);
    if (theDate.isYesterday()) {
      relativeDayOfTheWeek = YESTERDAY;
    } else if (theDate.isToday()) {
      relativeDayOfTheWeek = TODAY;
    } else if (theDate.isTomorrow()) {
      relativeDayOfTheWeek = TOMORROW;
    }

    if (relativeDayOfTheWeek) {
      return (
        <span className={className} data-testid={testId}>
          {relativeDayOfTheWeek}
        </span>
      );
    }
  }

  return <Date date={date} format={DateFormat.DAY_OF_WEEK} className={className} testId={testId} />;
};

export default DayOfTheWeek;
