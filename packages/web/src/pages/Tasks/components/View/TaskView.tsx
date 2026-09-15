import { useTranslation } from 'react-i18next';
import { cn } from 'cn';

import { Badge } from '@react-starter/shared/components/shadcn/badge';
import { Skeleton } from '@react-starter/shared/components/shadcn/skeleton';

import type { Task } from '@/common/types/task';
import { useGetUser } from '@/common/api/useGetUser';

/**
 * Properties for the `TaskView` component.
 * @param task - A `Task` object.
 */
interface TaskViewProps extends React.ComponentProps<'div'> {
  task: Task;
}

/**
 * The `TaskView` component renders the attributes of a `Task` in view mode.
 * This component is for the read-only display of a single Task.
 * @param {TaskViewProps} props - Component properties.
 */
const TaskView = ({ className, task, ...props }: TaskViewProps) => {
  const { t } = useTranslation();
  const { data: user, isLoading: isLoadingUser, isError: isErrorUser } = useGetUser({ userId: task.userId });

  return (
    <div className={cn('space-y-8', className)} {...props} data-testid="task-view">
      <div>
        <div className="mb-2 text-xs font-bold uppercase">{t('label.assignee', { ns: 'tasks' })}</div>
        <div>
          {isLoadingUser && <Skeleton className="h-5 w-40" data-testid="task-view-user-loading" />}
          {isErrorUser && (
            <span className="text-destructive" data-testid="task-view-user-error">
              {t('errors.not-found', { ns: 'tasks' })}
            </span>
          )}
          {user && <span data-testid="task-view-user-name">{user.name}</span>}
        </div>
      </div>

      <div>
        <div className="mb-2 text-xs font-bold uppercase">{t('label.status', { ns: 'tasks' })}</div>
        <Badge
          variant={task.completed ? 'default' : 'destructive'}
          className="uppercase"
          data-testid="task-view-status"
        >
          {task.completed ? t('complete', { ns: 'tasks' }) : t('incomplete', { ns: 'tasks' })}
        </Badge>
      </div>
    </div>
  );
};

export { TaskView };
