import { useTranslation } from 'react-i18next';
import { useState } from 'react';

import { cn } from 'common/utils/css';
import { BaseComponentProps } from 'common/utils/types';
import { Task } from 'pages/Tasks/api/useGetUserTasks';
import { useUpdateTask } from 'pages/Tasks/api/useUpdateTask';
import { useToasts } from 'common/hooks/useToasts';
import FAIcon from 'common/components/Icon/FAIcon';
import Button from 'common/components/Button/Button';

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
 * @returns {JSX.Element} JSX
 */
const TaskCompleteToggle = ({
  className,
  task,
  testId = 'toggle-task-complete',
}: TaskCompleteToggleProps): JSX.Element => {
  const [isHovering, setIsHovering] = useState(false);
  const { t } = useTranslation();
  const { mutate: updateTask, isPending } = useUpdateTask();
  const { createToast } = useToasts();

  const buttonTitle = task.completed ? t('markIncomplete', { ns: 'tasks' }) : t('markComplete', { ns: 'tasks' });

  const showCompleted = (task.completed && !isHovering) || (!task.completed && isHovering);

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
          createToast({
            text: data.completed ? t('markedComplete', { ns: 'tasks' }) : t('markedIncomplete', { ns: 'tasks' }),
            isAutoDismiss: true,
            variant: 'success',
          });
        },
      },
    );
  };

  return (
    <Button
      className={cn('contents border-none!', className)}
      variant="text"
      size="icon"
      title={buttonTitle}
      onClick={handleButtonClick}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      disabled={isPending}
      data-testid={testId}
    >
      <FAIcon
        icon={showCompleted ? 'circleCheck' : 'circleRegular'}
        className={cn({ 'text-green-600': showCompleted })}
        testId={`${testId}-icon`}
      />
    </Button>
  );
};

export default TaskCompleteToggle;
