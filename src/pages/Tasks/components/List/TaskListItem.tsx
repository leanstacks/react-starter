import { cn } from 'common/utils/css';
import { BaseComponentProps } from 'common/utils/types';
import { Task } from 'pages/Tasks/api/useGetUserTasks';
import TaskCompleteToggle from 'pages/Tasks/components/Edit/TaskCompleteToggle';
import Link from 'common/components/Link/Link';

/**
 * Properties for the `TaskListItem` component.
 * @param task - A `Task` object.
 * @see {@link BaseComponentProps}
 */
interface TaskListItemProps extends BaseComponentProps {
  task: Task;
}

/**
 * The `TaskListItem` component renders a single `Task` within a `TaskList`.
 * @param {TaskListItemProps} props - Component properties.
 */
const TaskListItem = ({ className, task, testId = 'list-task-item' }: TaskListItemProps) => {
  return (
    <div className={cn('flex items-center gap-4 py-0.5', className)} data-testid={testId}>
      <TaskCompleteToggle task={task} testId={`${testId}-complete-toggle`} />
      <Link to={`${task.id}`}>{task.title}</Link>
    </div>
  );
};

export default TaskListItem;
