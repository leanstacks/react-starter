import { useTranslation } from 'react-i18next';
import { Circle, CircleCheck } from 'lucide-react';

import { BaseComponentProps } from '@react-starter/shared/types/components';
import { Button } from '@react-starter/shared/components/shadcn/button';
import { toast } from '@react-starter/shared/components/shadcn/sonner';

import { Task } from '@/pages/Tasks/api/useGetUserTasks';
import { useUpdateTask } from '@/pages/Tasks/api/useUpdateTask';

/**
 * Propeties for the `TaskCompleteToggle` component.
 * @param {Task} task - A Task object.
 * @see {@link BaseComponentProps}
 */
interface TaskCompleteToggleProps extends BaseComponentProps {
  task: Task;
}

/**
 * The `TaskCompleteToggle` component renders a `Button` which allows a user
 * to toggle the value of the Task `complete` attribute.
 * @param {TaskCompleteToggleProps} props - Component properties.
 */
const TaskCompleteToggle = ({ className, task, testId = 'toggle-task-complete' }: TaskCompleteToggleProps) => {
  const { t } = useTranslation();
  const { mutate: updateTask, isPending } = useUpdateTask();

  const buttonTitle = task.completed ? t('markIncomplete', { ns: 'tasks' }) : t('markComplete', { ns: 'tasks' });

  /**
   * Actions to perform when the task complete toggle button is clicked.
   */
  const handleButtonClick = () => {
    updateTask(
      {
        task: {
          ...task,
          completed: !task.completed,
        },
      },
      {
        onSuccess: (data) => {
          toast(data.completed ? t('markedComplete', { ns: 'tasks' }) : t('markedIncomplete', { ns: 'tasks' }));
        },
      },
    );
  };

  return (
    <Button
      className={className}
      variant="ghost"
      size="icon"
      title={buttonTitle}
      onClick={() => handleButtonClick()}
      disabled={isPending}
      data-testid={testId}
    >
      {task.completed ? <CircleCheck data-testid={`${testId}-icon`} /> : <Circle data-testid={`${testId}-icon`} />}
    </Button>
  );
};

export default TaskCompleteToggle;
