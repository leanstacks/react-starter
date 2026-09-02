import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { BaseComponentProps } from '@react-starter/shared/types/components';
import { toast } from '@react-starter/shared/components/shadcn/sonner';
import { ErrorAlert } from '@react-starter/shared/components/Alert/ErrorAlert';

import { useGetCurrentUser } from '@/common/api/useGetCurrentUser';
import { useCreateTask } from '@/pages/Tasks/api/useCreateTask';
import TaskForm, { TaskFormValues } from '@/pages/Tasks/components/Form/TaskForm';
import Heading from '@react-starter/shared/components/Text/Heading';

/**
 * The `TaskAdd` component renders the layout for creating a new Task including
 * headings, the task form, etc.
 * @param {BaseComponentProps} props - Component properties.
 */
const TaskAdd = ({ className, testId = 'task-add' }: BaseComponentProps) => {
  const [taskCreateError, setTaskCreateError] = useState('');
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data: user } = useGetCurrentUser();
  const { mutate: createTask } = useCreateTask();

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
      createTask(
        { task: data },
        {
          onSuccess: () => {
            toast(t('createdTask', { ns: 'tasks' }));
            navigate(-1);
          },
          onError: (err) => {
            setTaskCreateError(err.message);
          },
          onSettled: () => {
            resolve();
          },
        },
      );
    });
  };

  return (
    <div className={className} data-testid={testId}>
      {/* heading */}
      <Heading level={2} className="mb-4">
        {t('addTask', { ns: 'tasks' })}
      </Heading>

      {/* error state */}
      {!!taskCreateError && (
        <ErrorAlert
          description={`${t('errors.unable-to-process')} ${taskCreateError}`}
          className="mb-4"
          testId={`${testId}-error-create`}
        />
      )}

      {/* form */}
      {!!user && <TaskForm task={{ userId: user.id }} onCancel={onFormCancel} onSubmit={onFormSubmit} />}
    </div>
  );
};

export default TaskAdd;
