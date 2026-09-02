import { useTranslation } from 'react-i18next';

import { cn } from '@react-starter/shared/utils/css';
import { BaseComponentProps } from '@react-starter/shared/types/components';
import { Badge } from '@react-starter/shared/components/shadcn/badge';
import { Skeleton } from '@react-starter/shared/components/shadcn/skeleton';

import { Task } from '@/pages/Tasks/api/useGetUserTasks';
import { useGetUser } from '@/common/api/useGetUser';

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
 */
export const TaskView = ({ className, task, testId = 'task-view' }: TaskViewProps) => {
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
          {isLoadingUser && <Skeleton className="h-4 w-40" data-testid={`${testId}-user-loading`} />}
          {isErrorUser && <span data-testid={`${testId}-user-error`}>{t('unable-to-find-short')}</span>}
          {user && <span data-testid={`${testId}-user-name`}>{user.name}</span>}
        </div>
      </div>

      <div className="mt-4">
        <div className="text-xs font-bold uppercase">Status</div>
        <Badge className={cn({ 'bg-blue-600!': task.completed })} data-testid={`${testId}-status`}>
          {task.completed ? 'COMPLETE' : 'INCOMPLETE'}
        </Badge>
      </div>
    </div>
  );
};
