import { useTranslation } from 'react-i18next';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@react-starter/shared/components/shadcn/dialog';
import { toast } from '@react-starter/shared/components/shadcn/sonner';
import { ErrorAlert } from '@react-starter/shared/components/Alert/ErrorAlert';

import type { Task } from '@/common/types/task';
import { useDeleteTask } from '@/pages/Tasks/api/useDeleteTask';
import { Button } from '@react-starter/shared/components/shadcn/button';

/**
 * Properties for the `TaskDeleteDialog` component.
 */
interface TaskDeleteDialogProps extends React.ComponentProps<typeof Dialog> {
  task: Task;
  trigger?: React.ReactNode;
  onSuccess?: () => void;
}

/**
 * The `TaskDeleteDialog` is a confirmation dialog for the deletion of a `Task`.
 *
 * It may be used either with a trigger element or programmatically controlled via the `open` prop.
 *
 * *Example trigger usage:*
 * ```tsx
 * <TaskDeleteDialog task={task} trigger={<Button>Delete Task</Button>} />
 * ```
 *
 * *Example programmatic usage:*
 * ```tsx
 * <TaskDeleteDialog task={task} open={isOpen} onOpenChange={setIsOpen} />
 * ```
 */
const TaskDeleteDialog = ({ onSuccess, task, trigger, ...props }: TaskDeleteDialogProps) => {
  const { t } = useTranslation();
  const { mutateAsync: deleteTaskAsync, isPending, error } = useDeleteTask();

  /**
   * Performs task deletion.
   */
  const doDelete = () => {
    const deleteTaskPromise = deleteTaskAsync(
      { task },
      {
        onSuccess: () => {
          onSuccess?.();
        },
      },
    );
    toast.promise(deleteTaskPromise, {
      loading: 'Deleting task...',
      success: 'Task deleted.',
      error: (err) => `Failed to delete task. Detail: ${err.message}`,
    });
  };

  return (
    <Dialog {...props}>
      {trigger && (
        <DialogTrigger data-testid={`task-delete-dialog-trigger-${task.id}`} asChild>
          {trigger}
        </DialogTrigger>
      )}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>Deleting a task is permanent.</DialogDescription>
        </DialogHeader>
        <div>
          {error && (
            <ErrorAlert
              description={`${t('errors.unable-to-process')} ${error.message}`}
              className="mb-4"
              testId={`task-delete-dialog-error-${task.id}`}
            />
          )}
          <div>
            Delete task <span className="text-muted-foreground">{task.title}</span>.
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant="secondary"
              disabled={isPending}
              data-testid={`task-delete-dialog-button-cancel-${task.id}`}
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            variant="destructive"
            onClick={() => doDelete()}
            disabled={isPending}
            data-testid={`task-delete-dialog-button-delete-${task.id}`}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export { TaskDeleteDialog };
