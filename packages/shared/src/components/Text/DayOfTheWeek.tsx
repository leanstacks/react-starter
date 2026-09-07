import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import isTomorrow from 'dayjs/plugin/isTomorrow';
import isYesterday from 'dayjs/plugin/isYesterday';

import { DateFormat } from '@react-starter/shared/utils/constants';
import { Date, DateProps } from '@react-starter/shared/components/Text/Date';

dayjs.extend(isToday);
dayjs.extend(isTomorrow);
dayjs.extend(isYesterday);

const TODAY = 'Today';
const TOMORROW = 'Tomorrow';
const YESTERDAY = 'Yesterday';

/**
 * Properties for the `DayOfTheWeek` component. Extends `DateProps`.
 * @param {boolean} [relative] - Optional. Indicates if the day of the week should be expressed relative to the current day, i.e. `Yesterday`, `Today`, `Tomorrow`.
 * @see {@link DateProps}
 * @see {@link https://en.wikipedia.org/wiki/ISO_8601 | ISO 8601}
 */
interface DayOfTheWeekProps extends DateProps {
  relative?: boolean;
}

/**
 * The `DayOfTheWeek` React component renders the day of the week,
 * e.g. `Monday`, for the supplied date value.
 * @param {DayOfTheWeekProps} props - Component properties, `DayOfTheWeekProps`.
 */
const DayOfTheWeek = ({ date, relative = false, ...props }: DayOfTheWeekProps) => {
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
      return <span {...props}>{relativeDayOfTheWeek}</span>;
    }
  }

  return <Date date={date} format={DateFormat.DAY_OF_WEEK} {...props} />;
};

export { DayOfTheWeek };
