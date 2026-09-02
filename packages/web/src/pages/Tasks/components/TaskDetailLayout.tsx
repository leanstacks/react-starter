import { useNavigate, useParams } from 'react-router-dom';
import { Check, Pencil, Trash, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import type { BaseComponentProps } from '@react-starter/shared/types/components';
import { Skeleton } from '@react-starter/shared/components/shadcn/skeleton';
import { Button } from '@react-starter/shared/components/shadcn/button';
import { ErrorAlert } from '@react-starter/shared/components/Alert/ErrorAlert';

import { useGetTask } from '@/pages/Tasks/api/useGetTask';
import { TaskDeleteDialog } from '@/pages/Tasks/components/Delete/TaskDeleteDialog';
import { TaskView } from '@/pages/Tasks/components/View/TaskView';

/**
 * The `TaskDetailLayout` component renders a layout for viewing and maintaining
 * a single `Task`. Provides buttons and navigation to perform actions on the Task.
 * @param {BaseComponentProps} props - Component properties.
 */
const TaskDetailLayout = ({ className, testId = 'layout-task-detail' }: BaseComponentProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { taskId } = useParams();

  const { data: task, error: taskError, isLoading: isLoadingTask } = useGetTask({ taskId: Number(taskId) });

  return (
    <div className={className} data-testid={testId}>
      {/* Heading */}
      <div className="mb-1 flex items-center gap-4 border-b border-neutral-500/10 pb-1">
        {!!task && (
          <div className="flex min-w-0 flex-nowrap items-center gap-2">
            <Check />
            <h2 className="truncate text-lg font-bold">
              {t('task', { ns: 'tasks' })}: {task.title}
            </h2>
          </div>
        )}
        {isLoadingTask && <Skeleton className="h-7 w-32" />}

        {/* Menu */}
        <div className="ms-auto flex items-center gap-1">
          {task && (
            <Button
              variant="ghost"
              size="icon"
              aria-label="Edit task"
              onClick={() => navigate('edit')}
              data-testid={`${testId}-button-edit`}
            >
              <Pencil />
            </Button>
          )}
          {task && (
            <TaskDeleteDialog task={task}>
              <Button variant="ghost" size="icon" aria-label="delete task">
                <Trash />
              </Button>
            </TaskDeleteDialog>
          )}
          <Button
            variant="ghost"
            size="icon"
            aria-label="Go back to task list"
            onClick={() => navigate(-1)}
            data-testid={`${testId}-button-close`}
          >
            <X />
          </Button>
        </div>
      </div>

      {taskError && (
        <ErrorAlert
          title="Unable to retrieve task"
          description={taskError.message}
          className="my-4"
          testId={`${testId}-error-task`}
        />
      )}

      {isLoadingTask && (
        <div data-testid={`${testId}-loading`}>
          <div className="mt-4">
            <Skeleton className="mb-2 h-4 w-12" />
            <Skeleton className="h-5 w-80" />
          </div>
          <div className="mt-4">
            <Skeleton className="mb-2 h-4 w-12" />
            <Skeleton className="h-5 w-80" />
          </div>
          <div className="mt-4">
            <Skeleton className="mb-2 h-4 w-12" />
            <Skeleton className="h-5 w-80" />
          </div>
        </div>
      )}

      {task && (
        <div data-testid={`${testId}-task`}>
          <TaskView task={task} testId={`${testId}-task-view`} />
        </div>
      )}
    </div>
  );
};

export default TaskDetailLayout;
