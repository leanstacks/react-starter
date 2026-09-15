import { Link, useNavigate, useParams } from 'react-router-dom';
import { Pencil, SearchSlash, Trash, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { Skeleton } from '@react-starter/shared/components/shadcn/skeleton';
import { Heading } from '@react-starter/shared/components/Text/Heading';
import { Tooltip, TooltipTrigger, TooltipContent } from '@react-starter/shared/components/shadcn/tooltip';
import { Button } from '@react-starter/shared/components/shadcn/button';
import { ErrorAlert } from '@react-starter/shared/components/Alert/ErrorAlert';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@react-starter/shared/components/shadcn/empty';
import { ButtonGroup, ButtonGroupSeparator } from '@react-starter/shared/components/shadcn/button-group';

import { useGetTask } from '@/pages/Tasks/api/useGetTask';
import { TaskDeleteDialog } from '@/pages/Tasks/components/Delete/TaskDeleteDialog';
import { TaskView } from '@/pages/Tasks/components/View/TaskView';

/**
 * The `TaskDetailLayout` component renders a layout for viewing and maintaining
 * a single `Task`. Provides buttons and navigation to perform actions on the Task.
 */
const TaskDetailLayout = ({ ...props }: React.ComponentProps<'div'>) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { taskId } = useParams();

  const { data: task, error, isLoading } = useGetTask({ taskId: Number(taskId) });

  // Show loading skeleton while the task data is being fetched.
  if (isLoading)
    return (
      <div data-testid="layout-task-detail-loading">
        <div className="my-8 flex items-center gap-4">
          <Skeleton className="h-8 w-48 flex-1" />
          <div className="flex items-center gap-2">
            <Skeleton className="size-8" />
            <Skeleton className="size-8" />
            <Skeleton className="size-8" />
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <Skeleton className="mb-2 h-4 w-12" />
            <Skeleton className="h-5 w-80" />
          </div>
          <div>
            <Skeleton className="mb-2 h-4 w-12" />
            <Skeleton className="h-5 w-80" />
          </div>
        </div>
      </div>
    );

  // Show error alert if there was an error fetching the task.
  if (error) {
    return (
      <ErrorAlert
        title="Unable to retrieve task"
        description={error.message}
        className="my-8"
        testId="layout-task-detail-error"
      />
    );
  }

  // Show not found if the task does not exist.
  if (!task)
    return (
      <Empty className="my-8" data-testid="layout-task-detail-not-found">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <SearchSlash />
          </EmptyMedia>
          <EmptyTitle className="capitalize">{t('errors.not-found', { ns: 'tasks' })}</EmptyTitle>
          <EmptyDescription>{t('errors.unable-to-find-task', { ns: 'tasks' })}</EmptyDescription>
        </EmptyHeader>
        <EmptyContent className="flex-row justify-center gap-2">
          <Button variant="default" asChild>
            <Link to="/app/tasks" className="capitalize">
              {t('list-tasks', { ns: 'tasks' })}
            </Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link to="/app/tasks/add" className="capitalize">
              {t('create-task', { ns: 'tasks' })}
            </Link>
          </Button>
        </EmptyContent>
      </Empty>
    );

  // Render the task detail layout once the task data is available.
  return (
    <div {...props} data-testid="layout-task-detail">
      {/* Heading */}
      <div className="my-8 flex items-start justify-between gap-4">
        <div className="flex min-w-0 flex-nowrap items-center gap-2">
          <Heading level={2}>{task.title}</Heading>
        </div>

        {/* Menu */}
        <ButtonGroup aria-label="Task actions">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                aria-label={t('edit-task', { ns: 'tasks' })}
                onClick={() => navigate('edit')}
                data-testid="layout-task-detail-button-edit"
              >
                <Pencil />
              </Button>
            </TooltipTrigger>
            <TooltipContent>{t('edit-task', { ns: 'tasks' })}</TooltipContent>
          </Tooltip>

          <ButtonGroupSeparator />

          <TaskDeleteDialog
            task={task}
            trigger={
              <Button variant="outline" size="icon" aria-label={t('delete-task', { ns: 'tasks' })}>
                <Trash />
              </Button>
            }
            onSuccess={() => navigate(-1)}
          />

          <ButtonGroupSeparator />

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                aria-label={t('go-back-to-task-list', { ns: 'tasks' })}
                onClick={() => navigate(-1)}
                data-testid="layout-task-detail-button-close"
              >
                <X />
              </Button>
            </TooltipTrigger>
            <TooltipContent>{t('go-back-to-task-list', { ns: 'tasks' })}</TooltipContent>
          </Tooltip>
        </ButtonGroup>
      </div>

      <div data-testid="layout-task-detail-task">
        <TaskView task={task} />
      </div>
    </div>
  );
};

export default TaskDetailLayout;
