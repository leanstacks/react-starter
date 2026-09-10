import { Flame } from 'lucide-react';

import { ItemGroup } from '@react-starter/shared/components/shadcn/item';
import { Empty, EmptyMedia, EmptyTitle, EmptyDescription } from '@react-starter/shared/components/shadcn/empty';

import type { Task } from '@/common/types/task';
import { TaskListItem } from '@/pages/Tasks/components/List/TaskListItem';

/**
 * Properties for the `TaskList` component.
 */
interface TaskListProps extends React.ComponentProps<'div'> {
  tasks?: Task[];
}

/**
 * The `TaskList` component renders a list of `Task` items.
 * @param {TaskListProps} props - Component properties.
 */
const TaskList = ({ tasks = [], ...props }: TaskListProps) => {
  // Return null if there are no tasks to display.
  if (tasks.length === 0) {
    return (
      <Empty data-testid="task-list-empty">
        <EmptyMedia>
          <Flame size={64} className="text-amber-600" />
        </EmptyMedia>
        <EmptyTitle>You're on fire!</EmptyTitle>
        <EmptyDescription>You have no tasks at the moment. Keep up the great work!</EmptyDescription>
      </Empty>
    );
  }

  // Render the list of tasks.
  return (
    <ItemGroup {...props}>
      {tasks.map((task) => (
        <TaskListItem key={`task-${task.id}`} task={task} data-testid={`task-item-${task.id}`} />
      ))}
    </ItemGroup>
  );
};

export { TaskList };
