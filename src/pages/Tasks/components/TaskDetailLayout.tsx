import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { BaseComponentProps } from 'common/utils/types';
import { useGetTask } from '../api/useGetTask';
import Skeleton from 'common/components/Loader/Skeleton';
import FAIcon from 'common/components/Icon/FAIcon';
import TaskDeleteDialog from './Delete/TaskDeleteDialog';
import Button from 'common/components/Button/Button';
import TaskView from './View/TaskView';
import ErrorAlert from 'common/components/Alert/ErrorAlert';

/**
 * Properties for the `TaskDetailLayout` component.
 * @see {@link BaseComponentProps}
 */
interface TaskDetailLayoutProps extends BaseComponentProps {}

/**
 * The `TaskDetailLayout` component renders a layout for viewing and maintaining
 * a single `Task`. Provides buttons and navigation to perform actions on the Task.
 * @param {TaskDetailLayoutProps} props - Component properties.
 */
const TaskDetailLayout = ({ className, testId = 'layout-task-detail' }: TaskDetailLayoutProps) => {
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
            <FAIcon icon="check" size="lg" />
            <h2 className="truncate text-lg font-bold">
              {t('task', { ns: 'tasks' })}: {task.title}
            </h2>
          </div>
        )}
        {isLoadingTask && <Skeleton className="h-7 w-32" />}

        {/* Menu */}
        <div className="ms-auto flex items-center gap-4">
          {task && (
            <Button
              variant="text"
              size="icon"
              title="Edit"
              onClick={() => navigate('edit')}
              testId={`${testId}-button-edit`}
            >
              <FAIcon icon="pencil" />
            </Button>
          )}
          {task && (
            <TaskDeleteDialog task={task}>
              <FAIcon icon="trash" />
            </TaskDeleteDialog>
          )}
          <Button
            variant="text"
            size="icon"
            title="Close"
            onClick={() => navigate(-1)}
            testId={`${testId}-button-close`}
          >
            <FAIcon icon="xmark" />
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
