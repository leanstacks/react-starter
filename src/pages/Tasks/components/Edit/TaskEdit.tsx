import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toNumber from 'lodash/toNumber';
import { useTranslation } from 'react-i18next';

import { cn } from 'common/utils/css';
import { BaseComponentProps } from 'common/utils/types';
import { Task } from 'pages/Tasks/api/useGetUserTasks';
import { useGetTask } from 'pages/Tasks/api/useGetTask';
import { useToasts } from 'common/hooks/useToasts';
import { useUpdateTask } from 'pages/Tasks/api/useUpdateTask';
import TaskForm, { TaskFormValues } from '../Form/TaskForm';
import Skeleton from 'common/components/Loader/Skeleton';
import ErrorAlert from 'common/components/Alert/ErrorAlert';

/**
 * Properties for the `TaskEdit` component.
 * @see {@link BaseComponentProps}
 */
export interface TaskEditProps extends BaseComponentProps {}

/**
 * The `TaskAdd` component renders the layout for updating a Task including
 * headings, the task form, etc.
 * @param {TaskEditProps} props - Component properties.
 */
const TaskEdit = ({ className, testId = 'task-edit' }: TaskEditProps) => {
  const [taskUpdateError, setTaskUpdateError] = useState('');
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { createToast } = useToasts();
  const { taskId } = useParams();
  const { data: task, error: taskFetchError, isLoading } = useGetTask({ taskId: toNumber(taskId) });
  const { mutate: updateTask } = useUpdateTask();

  /**
   * Form cancellation callback function.
   */
  const onFormCancel = () => {
    navigate(-1);
  };

  /**
   * Form submission callback function.
   * @param data - The submitted form data.
   * @returns A Promise which resolves empty when the mutation function completes.
   */
  const onFormSubmit = (data: TaskFormValues): Promise<void> => {
    return new Promise<void>((resolve) => {
      const updatedTask = { ...task, ...data } as Task;
      updateTask(
        { task: updatedTask },
        {
          onSuccess: () => {
            createToast({
              text: t('updatedTask', { ns: 'tasks' }),
              isAutoDismiss: true,
              variant: 'success',
            });
            navigate(-1);
          },
          onError: (err) => {
            setTaskUpdateError(err.message);
          },
          onSettled: () => {
            resolve();
          },
        },
      );
    });
  };

  return (
    <div className={cn(className)} data-testid={testId}>
      {/* heading */}
      <h2 className="mb-8 border-b border-neutral-500/10 pb-1 text-lg font-bold">{t('editTask', { ns: 'tasks' })}</h2>

      {/* loading state */}
      {isLoading && <Skeleton className="h-10" testId={`${testId}-loading`} />}

      {/* error state */}
      {!!taskFetchError && (
        <ErrorAlert
          description={`${t('errors.unable-to-find-short')} ${taskFetchError}`}
          className="mb-4"
          testId={`${testId}-error-fetch`}
        />
      )}

      {!!taskUpdateError && (
        <ErrorAlert
          description={`${t('errors.unable-to-process')} ${taskUpdateError}`}
          className="mb-4"
          testId={`${testId}-error-update`}
        />
      )}

      {/* form */}
      {!!task && <TaskForm task={task} onCancel={onFormCancel} onSubmit={onFormSubmit} />}
    </div>
  );
};

export default TaskEdit;
