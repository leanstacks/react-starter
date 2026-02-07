import { PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { BaseComponentProps } from 'common/utils/types';
import { Task } from 'pages/Tasks/api/useGetUserTasks';
import { useDeleteTask } from 'pages/Tasks/api/useDeleteTask';
import { useToasts } from 'common/hooks/useToasts';
import Dialog from 'common/components/Dialog/Dialog';
import ErrorAlert from 'common/components/Alert/ErrorAlert';

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
const TaskDeleteDialog = ({ children, className, task, testId = 'dialog-task-delete' }: TaskDeleteDialogProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { createToast } = useToasts();
  const { mutate: deleteTask, isPending, error } = useDeleteTask();

  /**
   * Performs task deletion.
   */
  const doDelete = () => {
    deleteTask(
      { task },
      {
        onSuccess: () => {
          createToast({
            text: `Task deleted.`,
            isAutoDismiss: true,
          });
          navigate(-1);
        },
      },
    );
  };

  return (
    <Dialog className={className} testId={testId}>
      {({ close }) => (
        <>
          <Dialog.Trigger testId={`${testId}-trigger`}>{children}</Dialog.Trigger>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Are you sure?</Dialog.Title>
              <Dialog.Subtitle>Deleting a task is permanent.</Dialog.Subtitle>
            </Dialog.Header>
            <Dialog.Body>
              {error && (
                <ErrorAlert
                  description={`${t('errors.unable-to-process')} ${error.message}`}
                  className="mb-4"
                  testId={`${testId}-error`}
                />
              )}
              <div>
                Delete task <span className="text-neutral-500">{task.title}</span>.
              </div>
            </Dialog.Body>
            <Dialog.Separator />
            <Dialog.Footer>
              <Dialog.ButtonBar>
                <Dialog.Button onClick={() => close()} disabled={isPending} testId={`${testId}-button-cancel`}>
                  Cancel
                </Dialog.Button>
                <Dialog.Button
                  onClick={doDelete}
                  variant="danger"
                  disabled={isPending}
                  testId={`${testId}-button-delete`}
                >
                  Delete
                </Dialog.Button>
              </Dialog.ButtonBar>
            </Dialog.Footer>
          </Dialog.Content>
        </>
      )}
    </Dialog>
  );
};

export default TaskDeleteDialog;
