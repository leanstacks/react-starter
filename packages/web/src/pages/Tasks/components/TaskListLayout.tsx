import { useTranslation } from 'react-i18next';
import { filter } from 'lodash';

import { cn } from '@react-starter/shared/utils/css';
import { Skeleton } from '@react-starter/shared/components/shadcn/skeleton';
import { ErrorAlert } from '@react-starter/shared/components/Alert/ErrorAlert';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@react-starter/shared/components/shadcn/accordion';

import { useGetCurrentUser } from '@/common/api/useGetCurrentUser';
import { useGetUserTasks } from '@/pages/Tasks/api/useGetUserTasks';
import { TaskList } from '@/pages/Tasks/components/List/TaskList';

/**
 * The `TaskListLayout` component renders the layout for all tasks for a single `User`.
 */
const TaskListLayout = ({ ...props }: React.ComponentProps<'div'>) => {
  const { t } = useTranslation();
  const { data: currentUser } = useGetCurrentUser();
  const { data: tasks, isLoading, error } = useGetUserTasks({ userId: currentUser?.id });

  // Filter tasks into incomplete and complete categories.
  const incompleteTasks = filter(tasks, { completed: false });
  const completeTasks = filter(tasks, { completed: true });

  // Show loading state while fetching tasks.
  if (isLoading) {
    return (
      <div className={cn(props.className, 'space-y-2')} data-testid="task-list-loading">
        <Skeleton className="h-10" />
        <Skeleton className="h-10" />
        <Skeleton className="h-10" />
      </div>
    );
  }

  // Show error state if there was an error fetching tasks.
  if (error) {
    return (
      <div data-testid="task-list-error">
        <ErrorAlert title={t('error-loading-tasks', { ns: 'tasks' })} description={error?.message} />
      </div>
    );
  }

  // Render the task list layout once tasks are successfully fetched.
  return (
    <div {...props}>
      <TaskList tasks={incompleteTasks} className="my-8" data-testid="task-list-incomplete" />

      {completeTasks?.length > 0 && (
        <Accordion type="single" collapsible className="my-8">
          <AccordionItem value="complete-tasks">
            <AccordionTrigger data-testid="task-list-complete-trigger">
              {t('status.complete', { ns: 'tasks' })}
            </AccordionTrigger>
            <AccordionContent>
              <TaskList tasks={completeTasks} data-testid="task-list-complete" />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
    </div>
  );
};

export default TaskListLayout;
