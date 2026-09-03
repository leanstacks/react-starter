import { useTranslation } from 'react-i18next';

import type { BaseComponentProps } from '@react-starter/shared/types/components';
import { Card, CardHeader, CardTitle, CardContent } from '@react-starter/shared/components/shadcn/card';

import { useGetCurrentUser } from '@/common/api/useGetCurrentUser';
import { useGetUserTasks } from '@/pages/Tasks/api/useGetUserTasks';
import TaskList from '@/pages/Tasks/components/List/TaskList';
import { TaskStatusDonutChart } from '@/pages/Tasks/components/Chart/TaskStatusDonutChart';

/**
 * The `TaskListLayout` component renders the layout for all tasks for a
 * single `User`.
 * @param {BaseComponentProps} props - Component properties.
 */
const TaskListLayout = ({ className, testId = 'layout-task-list' }: BaseComponentProps) => {
  const { t } = useTranslation();
  const { data: currentUser } = useGetCurrentUser();
  const { data: tasks } = useGetUserTasks({ userId: currentUser?.id });

  return (
    <div className={className} data-testid={testId}>
      {!!currentUser && (
        <>
          <div className="mb-4 grid md:grid-cols-2 lg:grid-cols-3">
            {!!tasks && (
              <Card data-testid={`${testId}-chart-status`}>
                <CardHeader>
                  <CardTitle className="text-md font-bold">{t('status-of-tasks', { ns: 'tasks' })}</CardTitle>
                </CardHeader>
                <CardContent>
                  <TaskStatusDonutChart tasks={tasks} width={160} />
                </CardContent>
              </Card>
            )}
          </div>

          <TaskList
            className="mb-4"
            userId={currentUser.id}
            filterBy={{ completed: false }}
            orderBy={['title']}
            showBadge
            title={t('status.incomplete', { ns: 'tasks' })}
            testId={`${testId}-list-incomplete`}
          />

          <TaskList
            userId={currentUser.id}
            filterBy={{ completed: true }}
            orderBy={['title']}
            showBadge
            title={t('status.complete', { ns: 'tasks' })}
            testId={`${testId}-list-complete`}
          />
        </>
      )}
    </div>
  );
};

export default TaskListLayout;
