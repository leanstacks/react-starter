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
import UserInfo from '@/pages/Tasks/components/UserInfo';

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
        <div className="mb-4 flex items-center justify-between border-b border-neutral-500/50 pb-2">
          <Heading level={1}>{t('tasks', { ns: 'tasks' })}</Heading>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              aria-label="Add Task"
              data-testid={`${testId}-button-add`}
              asChild
            >
              <Link to="/app/tasks/add" aria-label="Add Task">
                <Plus />
              </Link>
            </Button>
          </div>
        </div>

        {currentUser && (
          <div data-testid={`${testId}-content`}>
            <UserInfo userId={currentUser.id} className="mb-4" />

            <Outlet />
          </div>
        )}
      </Container>
    </Page>
  );
};

export default TasksPage;
