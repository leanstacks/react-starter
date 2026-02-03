import { useTranslation } from 'react-i18next';
import { filter } from 'lodash';
import { orderBy as order } from 'lodash';
import { times } from 'lodash';

import { Task, useGetUserTasks } from 'pages/Tasks/api/useGetUserTasks';
import { BaseComponentProps } from 'common/utils/types';
import Skeleton from 'common/components/Loader/Skeleton';
import TaskListItem from './TaskListItem';
import Badge from 'common/components/Badge/Badge';
import ErrorAlert from 'common/components/Alert/ErrorAlert';

/**
 * Type describes the possible sort order directions.
 */
type OrderDir = 'asc' | 'desc';

/**
 * Type describing all possible keys of a `Task` object.
 */
type TaskKey = keyof Task;

/**
 * Properties for the `TaskList` component.
 * @param filterBy - Optional. Object containing criteria to filter the displayed Tasks.
 * @param orderBy - Optional. Array of Task attributes to sort the displayed Tasks.
 * @param orderDir - Optional. Array of order directions to apply to the `orderBy`.
 * @param showBadge - Optional. Indicates if task count badge should be shown.
 * @param title - Optional. List title text.
 * @param userId - A `User` identifier whose tasks are to be shown.
 * @see {@link BaseComponentProps}
 */
interface TaskListProps extends BaseComponentProps {
  filterBy?: Partial<Task>;
  orderBy?: TaskKey[];
  orderDir?: OrderDir[];
  showBadge?: boolean;
  title?: string;
  userId: number;
}

/**
 * The `TaskList` component renders a list of `Task` items.  The list may be filtered
 * and ordered using properties.
 * @param {TaskListProps} props - Component properties.
 * @returns JSX
 */
const TaskList = ({
  className,
  filterBy = {},
  orderBy = [],
  orderDir = [],
  showBadge = false,
  testId = 'list-task',
  title,
  userId,
}: TaskListProps): JSX.Element => {
  const { t } = useTranslation();
  const { data: tasks, isLoading, isError } = useGetUserTasks({ userId });

  const filteredTasks = filter(tasks, filterBy);

  const orderedTasks = order(filteredTasks, orderBy, orderDir);

  const isEmpty = !isLoading && (!orderedTasks || orderedTasks?.length === 0);

  return (
    <div className={className} data-testid={testId}>
      {!!title && (
        <div className="flex items-center gap-2" data-testid={`${testId}-heading`}>
          <h2 className="text-lg font-bold" data-testid={`${testId}-heading-title`}>
            {title}
          </h2>
          {showBadge && !isLoading && (
            <Badge className="self-start" size="sm" testId={`${testId}-heading-badge`}>
              {orderedTasks.length}
            </Badge>
          )}
        </div>
      )}

      {isError && (
        <ErrorAlert description={t('errors.unable-to-retrieve')} className="mb-4" testId={`${testId}-error`} />
      )}

      {isLoading && (
        <div data-testid={`${testId}-loading`}>
          {times(3, (index) => (
            <Skeleton key={`loader-${index}`} className="mb-2 h-6" />
          ))}
        </div>
      )}

      {isEmpty && <div data-testid={`${testId}-empty`}>{t('tasks-empty', { ns: 'tasks' })}</div>}

      {orderedTasks && (
        <div data-testid={`${testId}-content`}>
          {orderedTasks.map((task, index) => (
            <TaskListItem key={`task-${index}`} task={task} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
