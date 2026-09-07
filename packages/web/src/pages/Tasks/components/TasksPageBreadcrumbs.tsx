import { Link, useLocation, useParams } from 'react-router-dom';
import toNumber from 'lodash/toNumber';

import { BaseComponentProps } from '@react-starter/shared/types/components';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@react-starter/shared/components/shadcn/breadcrumb';
import { Skeleton } from '@react-starter/shared/components/shadcn/skeleton';

import { useGetTask } from '../api/useGetTask';

/**
 * The `TasksPageBreadcrumbs` component renders the `Breadcrumbs` for the tasks
 * family of pages.
 */
const TasksPageBreadcrumbs = ({ className, testId = 'page-tasks-breadcrumbs' }: BaseComponentProps) => {
  const location = useLocation();
  const params = useParams();
  const pathElements = location.pathname.split('/');

  const hasTask = !!params.taskId;
  const hasTaskAdd = pathElements.includes('add');
  const hasTaskEdit = pathElements.includes('edit');

  const { data: task, isLoading: isLoadingTask } = useGetTask({ taskId: toNumber(params.taskId) });

  return (
    <Breadcrumb className={className} data-testid={testId}>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/" data-testid={`${testId}-link-home`}>
              Home
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/app/tasks" data-testid={`${testId}-link-tasks`}>
              Tasks
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {hasTaskAdd && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage data-testid={`${testId}-page-task-add`}>Add</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
        {hasTask && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {!!task && (
                <BreadcrumbLink asChild>
                  <Link to={`/app/tasks/${task.id}`} data-testid={`${testId}-link-task`}>
                    {task.title}
                  </Link>
                </BreadcrumbLink>
              )}
              {isLoadingTask && <Skeleton className="h-4 w-30" data-testid={`${testId}-item-task-loader`} />}
            </BreadcrumbItem>
          </>
        )}
        {hasTaskEdit && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage data-testid={`${testId}-page-task-edit`}>Edit</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default TasksPageBreadcrumbs;
