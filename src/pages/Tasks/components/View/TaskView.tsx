import { useTranslation } from 'react-i18next';

import { cn } from 'common/utils/css';
import { BaseComponentProps } from 'common/utils/types';
import { Task } from 'pages/Tasks/api/useGetUserTasks';
import { useGetUser } from 'common/api/useGetUser';
import Badge from 'common/components/Badge/Badge';
import Skeleton from 'common/components/Loader/Skeleton';

/**
 * Properties for the `TaskView` component.
 * @param task - A `Task` object.
 * @see {@link BaseComponentProps}
 */
interface TaskViewProps extends BaseComponentProps {
  task: Task;
}

/**
 * The `TaskView` component renders the attributes of a `Task` in view mode.
 * This component is for the read-only display of a single Task.
 * @param {TaskViewProps} props - Component properties.
 * @returns JSX
 */
const TaskView = ({ className, task, testId = 'task-view' }: TaskViewProps): JSX.Element => {
  const { t } = useTranslation();
  const { data: user, isLoading: isLoadingUser, isError: isErrorUser } = useGetUser({ userId: task.userId });

  return (
    <div className={className} data-testid={testId}>
      <div className="mt-4">
        <div className="text-xs font-bold uppercase">Title</div>
        <div className="text-lg" data-testid={`${testId}-title`}>
          {task.title}
        </div>
      </div>

      <div className="mt-4">
        <div className="text-xs font-bold uppercase">Assignee</div>
        <div>
          {isLoadingUser && <Skeleton className="h-4 w-40" testId={`${testId}-user-loading`} />}
          {isErrorUser && <span data-testid={`${testId}-user-error`}>{t('unable-to-find-short')}</span>}
          {user && <span data-testid={`${testId}-user-name`}>{user.name}</span>}
        </div>
      </div>

      <div className="mt-4">
        <div className="text-xs font-bold uppercase">Status</div>
        <Badge size="sm" className={cn('inline', { 'bg-blue-600!': task.completed })} testId={`${testId}-status`}>
          {task.completed ? 'COMPLETE' : 'INCOMPLETE'}
        </Badge>
      </div>
    </div>
  );
};

export default TaskView;
