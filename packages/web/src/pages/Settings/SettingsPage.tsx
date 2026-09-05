import { Link, Outlet } from 'react-router-dom';
import { Palette } from 'lucide-react';

import Page from '@react-starter/shared/components/Content/Page';
import Columns from '@react-starter/shared/components/Content/Columns';
import Container from '@react-starter/shared/components/Content/Container';
import { Skeleton } from '@react-starter/shared/components/shadcn/skeleton';
import { Avatar, AvatarFallback } from '@react-starter/shared/components/shadcn/avatar';

import { useGetCurrentUser } from '@/common/api/useGetCurrentUser';
import SettingsPageBreadcrumbs from '@/pages/Settings/components/SettingsPageBreadcrumbs';
import { Button } from '@react-starter/shared/components/shadcn/button';

/**
 * The `SettingsPage` component renders the layout for the settings page. It
 * provides an `Outlet` for displaying settings sub-pages.
 */
const SettingsPage = () => {
  const { data: user } = useGetCurrentUser();

  return (
    <Page testId="page-settings">
      <Container size="lg" className="min-h-[50vh]">
        <SettingsPageBreadcrumbs className="my-4" />

        {user ? (
          <div className="my-6 flex items-center gap-4" data-testid="page-settings-header">
            <Avatar>
              <AvatarFallback className="capitalize">{user.name[0]}</AvatarFallback>
            </Avatar>
            <div className="font-bold md:text-xl">
              {user.name} ({user.username})
            </div>
          </div>
        ) : (
          <div data-testid="page-settings-header-loader">
            <Skeleton className="h-16" />
          </div>
        )}

        <Columns layout="1-3" gap="lg" className="my-6">
          <Columns.Column testId="page-settings-menu">
            <nav role="navigation">
              <ul className="*:not-last:mb-1">
                <li>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link to="appearance" aria-label="Appearance Settings">
                      <Palette />
                      Appearance
                    </Link>
                  </Button>
                </li>
              </ul>
            </nav>
          </Columns.Column>
          <Columns.Column testId="page-settings-content">
            <Outlet />
          </Columns.Column>
        </Columns>
      </Container>
    </Page>
  );
};

export default SettingsPage;
