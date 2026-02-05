import { Outlet } from 'react-router-dom';

import { useGetCurrentUser } from 'common/api/useGetCurrentUser';
import Avatar from 'common/components/Icon/Avatar';
import Skeleton from 'common/components/Loader/Skeleton';
import MenuNavLink from 'common/components/Menu/MenuNavLink';
import Page from 'common/components/Content/Page';
import SettingsPageBreadcrumbs from './components/SettingsPageBreadcrumbs';
import Columns from 'common/components/Content/Columns';
import Container from 'common/components/Content/Container';

/**
 * The `SettingsPage` component renders the layout for the settings page. It
 * provides an `Outlet` for displaying settings sub-pages.
 */
const SettingsPage = () => {
  const { data: user } = useGetCurrentUser();

  return (
    <Page testId="page-settings">
      <Container className="my-4 min-h-[50vh]">
        <SettingsPageBreadcrumbs className="mb-4" />

        {user ? (
          <div className="my-6 flex items-center gap-4" data-testid="page-settings-header">
            <Avatar value={user.name} className="size-12 rounded-full text-lg" />
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
            <MenuNavLink to="appearance" icon="paintbrush" styleActive>
              Appearance
            </MenuNavLink>
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
