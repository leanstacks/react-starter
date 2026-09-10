import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Page } from '@react-starter/shared/components/Content/Page';
import { Container } from '@react-starter/shared/components/Content/Container';
import { Heading } from '@react-starter/shared/components/Text/Heading';

import TasksPageBreadcrumbs from '@/pages/Tasks/components/TasksPageBreadcrumbs';
import { AddTaskButton } from '@/pages/Tasks/components/Add/AddTaskButton';

/**
 * The `TasksPage` component renders the layout for the tasks family of pages.
 * It provides an `Outlet` for displaying sub-pages.
 */
const TasksPage = () => {
  const { t } = useTranslation();

  return (
    <Page data-testid="page-tasks">
      <Container size="md" className="min-h-[75vh]">
        <TasksPageBreadcrumbs className="my-4" />

        {/* page heading */}
        <div className="my-8 flex items-center justify-between">
          <Heading level={1}>{t('tasks', { ns: 'tasks' })}</Heading>
          <div className="flex items-center gap-4">
            <AddTaskButton data-testid="button-add-task" />
          </div>
        </div>

        <div data-testid="page-tasks-content">
          <Outlet />
        </div>
      </Container>
    </Page>
  );
};

export default TasksPage;
