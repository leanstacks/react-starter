import { Outlet, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Plus } from 'lucide-react';

import type { PropsWithTestId } from '@react-starter/shared/types/components';
import Page from '@react-starter/shared/components/Content/Page';
import Container from '@react-starter/shared/components/Content/Container';
import Heading from '@react-starter/shared/components/Text/Heading';
import { Button } from '@react-starter/shared/components/shadcn/button';

import { useGetCurrentUser } from '@/common/api/useGetCurrentUser';
import TasksPageBreadcrumbs from '@/pages/Tasks/components/TasksPageBreadcrumbs';

/**
 * The `TasksPage` component renders the layout for the tasks family of pages.
 * It provides an `Outlet` for displaying sub-pages.
 * @param {PropsWithTestId} props - Component properties.
 */
const TasksPage = ({ testId = 'page-tasks' }: PropsWithTestId) => {
  const { t } = useTranslation();
  const { data: currentUser } = useGetCurrentUser();

  return (
    <Page testId={testId}>
      <Container size="lg" className="min-h-[75vh]">
        <TasksPageBreadcrumbs className="my-4" />

        {/* page heading */}
        <div className="my-8 flex items-center justify-between border-b pb-2">
          <Heading level={1}>{t('tasks', { ns: 'tasks' })}</Heading>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" aria-label="Add Task" data-testid={`${testId}-button-add`} asChild>
              <Link to="/app/tasks/add" aria-label="Add Task">
                <Plus />
              </Link>
            </Button>
          </div>
        </div>

        {currentUser && (
          <div data-testid={`${testId}-content`}>
            <Outlet />
          </div>
        )}
      </Container>
    </Page>
  );
};

export default TasksPage;
