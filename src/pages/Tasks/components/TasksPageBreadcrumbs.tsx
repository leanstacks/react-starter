import { useLocation, useParams } from 'react-router-dom';
import toNumber from 'lodash/toNumber';

import { BaseComponentProps } from 'common/utils/types';
import { useGetTask } from '../api/useGetTask';
import Breadcrumbs from 'common/components/Breadcrumbs/Breadcrumbs';
import Skeleton from 'common/components/Loader/Skeleton';

/**
 * The `TasksPageBreadcrumbs` component renders the `Breadcrumbs` for the tasks
 * family of pages.
 */
const TasksPageBreadcrumbs = ({ className, testId = 'page-tasks-breadcrumbs' }: BaseComponentProps): JSX.Element => {
  const location = useLocation();
  const params = useParams();
  const pathElements = location.pathname.split('/');

  const hasTask = !!params.taskId;
  const hasTaskAdd = pathElements.includes('add');
  const hasTaskEdit = pathElements.includes('edit');

  const { data: task, isLoading: isLoadingTask } = useGetTask({ taskId: toNumber(params.taskId) });

  return (
    <Breadcrumbs className={className} testId={testId}>
      <Breadcrumbs.List>
        <Breadcrumbs.Item>
          <Breadcrumbs.Link to="/" testId={`${testId}-link-home`}>
            Home
          </Breadcrumbs.Link>
        </Breadcrumbs.Item>
        <Breadcrumbs.Separator />
        <Breadcrumbs.Item>
          <Breadcrumbs.Link to="/app/tasks" testId={`${testId}-link-tasks`}>
            Tasks
          </Breadcrumbs.Link>
        </Breadcrumbs.Item>
        {hasTaskAdd && (
          <>
            <Breadcrumbs.Separator />
            <Breadcrumbs.Item>
              <Breadcrumbs.Page testId={`${testId}-page-task-add`}>Add</Breadcrumbs.Page>
            </Breadcrumbs.Item>
          </>
        )}
        {hasTask && (
          <>
            <Breadcrumbs.Separator />
            <Breadcrumbs.Item>
              {!!task && (
                <Breadcrumbs.Link to={`/app/tasks/${task.id}`} testId={`${testId}-link-task`}>
                  {task.title}
                </Breadcrumbs.Link>
              )}
              {isLoadingTask && <Skeleton className="h-4 w-30" testId={`${testId}-item-task-loader`} />}
            </Breadcrumbs.Item>
          </>
        )}
        {hasTaskEdit && (
          <>
            <Breadcrumbs.Separator />
            <Breadcrumbs.Item>
              <Breadcrumbs.Page testId={`${testId}-page-task-edit`}>Edit</Breadcrumbs.Page>
            </Breadcrumbs.Item>
          </>
        )}
      </Breadcrumbs.List>
    </Breadcrumbs>
  );
};

export default TasksPageBreadcrumbs;
