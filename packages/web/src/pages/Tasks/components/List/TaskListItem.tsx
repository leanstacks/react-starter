import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Circle, CircleCheckBig, Edit, EllipsisVertical, Eye, Trash } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { Item, ItemActions, ItemContent, ItemMedia, ItemTitle } from '@react-starter/shared/components/shadcn/item';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@react-starter/shared/components/shadcn/dropdown-menu';
import { Button } from '@react-starter/shared/components/shadcn/button';
import { toast } from '@react-starter/shared/components/shadcn/sonner';

import type { Task } from '@/common/types/task';
import { useUpdateTask } from '@/pages/Tasks/api/useUpdateTask';
import { TaskDeleteDialog } from '@/pages/Tasks/components/Delete/TaskDeleteDialog';

/**
 * Properties for the `TaskListItem` component.
 * @param task - A `Task` object.
 */
interface TaskListItemProps extends React.ComponentProps<'div'> {
  task: Task;
}

/**
 * The `TaskListItem` component renders a single `Task` within a `TaskList`.
 * @param {TaskListItemProps} props - Component properties.
 */
const TaskListItem = ({ task, ...props }: TaskListItemProps) => {
  const [isTaskDeleteDialogOpen, setIsTaskDeleteDialogOpen] = useState(false);
  const { t } = useTranslation();
  const { mutateAsync: updateTaskAsync, isPending: isPendingUpdateTask } = useUpdateTask();

  /**
   * Toggles the completion status of the task.
   */
  const handleToggleComplete = () => {
    const isComplete = !task.completed;
    const taskData = { ...task, completed: isComplete };
    const updateTaskPromise = updateTaskAsync({ task: taskData });
    toast.promise(updateTaskPromise, {
      loading: isComplete ? t('marking-complete', { ns: 'tasks' }) : t('marking-incomplete', { ns: 'tasks' }),
      success: isComplete ? t('markedComplete', { ns: 'tasks' }) : t('markedIncomplete', { ns: 'tasks' }),
      error: (error) => t('update-failed', { ns: 'tasks', message: error.message }),
    });
  };

  return (
    <Item variant="outline" size="xs" className="hover:bg-muted/50 hover:border-transparent" {...props}>
      <ItemMedia variant="icon">{task.completed ? <CircleCheckBig /> : <Circle />}</ItemMedia>
      <ItemContent>
        <ItemTitle>{task.title}</ItemTitle>
      </ItemContent>
      <ItemActions>
        <DropdownMenu>
          <DropdownMenuTrigger className="cursor-pointer" aria-label="Task actions">
            <EllipsisVertical size={16} />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-40">
            <DropdownMenuItem className="cursor-pointer" asChild>
              <Link to={`${task.id}`}>
                <Eye />
                View
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer" asChild>
              <Link to={`${task.id}/edit`}>
                <Edit />
                Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {!task.completed && (
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={handleToggleComplete}
                disabled={isPendingUpdateTask}
              >
                <CircleCheckBig />
                Mark Complete
              </DropdownMenuItem>
            )}
            {task.completed && (
              <DropdownMenuItem className="cursor-pointer" asChild>
                <Button variant="ghost" size="xs" onClick={handleToggleComplete} disabled={isPendingUpdateTask}>
                  <Circle />
                  Mark Incomplete
                </Button>
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              variant="destructive"
              onClick={() => setIsTaskDeleteDialogOpen(true)}
            >
              {/* <TaskDeleteDialog task={task}>Dialog trigger</TaskDeleteDialog> */}
              <Trash />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </ItemActions>
      <TaskDeleteDialog task={task} open={isTaskDeleteDialogOpen} onOpenChange={setIsTaskDeleteDialogOpen} />
    </Item>
  );
};

export { TaskListItem };
