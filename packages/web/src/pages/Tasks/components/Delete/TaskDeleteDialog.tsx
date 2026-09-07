import { PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { BaseComponentProps } from '@react-starter/shared/types/components';
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

import { Task } from '@/pages/Tasks/api/useGetUserTasks';
import { useDeleteTask } from '@/pages/Tasks/api/useDeleteTask';
import { Button } from '@react-starter/shared/components/shadcn/button';

/**
 * Properties for the `TaskDeleteDialog` component.
 */
interface TaskDeleteDialogProps extends BaseComponentProps, PropsWithChildren {
  task: Task;
}

/**
 * The `TaskDeleteDialog` renders a dialog prompting for deletion confirmation
 * of a `Task`.
 */
export const TaskDeleteDialog = ({ children, task, testId = 'dialog-task-delete' }: TaskDeleteDialogProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { mutate: deleteTask, isPending, error } = useDeleteTask();

  /**
   * Performs task deletion.
   */
  const doDelete = () => {
    deleteTask(
      { task },
      {
        onSuccess: () => {
          toast('Task deleted.');
          navigate(-1);
        },
      },
    );
  };

  return (
    <Dialog>
      <DialogTrigger data-testid={`${testId}-trigger`} asChild>
        {children}
      </DialogTrigger>
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
              testId={`${testId}-error`}
            />
          )}
          <div>
            Delete task <span className="text-muted-foreground">{task.title}</span>.
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary" disabled={isPending} data-testid={`${testId}-button-cancel`}>
              Cancel
            </Button>
          </DialogClose>
          <Button
            variant="destructive"
            onClick={() => doDelete()}
            disabled={isPending}
            data-testid={`${testId}-button-delete`}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
