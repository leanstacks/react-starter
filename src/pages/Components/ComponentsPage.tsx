import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import Page from 'common/components/Content/Page';
import Container from 'common/components/Content/Container';
import MenuNavLink from 'common/components/Menu/MenuNavLink';
import Heading from 'common/components/Text/Heading';
import ComponentsPageBreadcrumbs from './components/ComponentsPageBreadcrumbs';
import Columns from 'common/components/Content/Columns';

/**
 * The `ComponentsPage` component renders the layout for the components page.
 * It provides an `Outlet` for displaying a variety of sub-pages containing
 * React component variations.
 */
const ComponentsPage = () => {
  const location = useLocation();
  // Scroll to top when the pathname changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <Page testId="page-components">
      <Container className="my-4 min-h-[50vh]">
        <ComponentsPageBreadcrumbs className="mb-4" />

        <Heading level={1} className="mb-4 border-b border-neutral-500/50 pb-2">
          Components
        </Heading>

        <Columns layout="1-3" gap="lg" className="my-6">
          <Columns.Column data-testid="page-components-menu">
            <MenuNavLink to="accordion" styleActive>
              Accordion
            </MenuNavLink>
            <MenuNavLink to="alert" styleActive>
              Alert
            </MenuNavLink>
            <MenuNavLink to="avatar" styleActive>
              Avatar
            </MenuNavLink>
            <MenuNavLink to="badge" styleActive>
              Badge
            </MenuNavLink>
            <MenuNavLink to="breadcrumbs" styleActive>
              Breadcrumbs
            </MenuNavLink>
            <MenuNavLink to="button" styleActive>
              Button
            </MenuNavLink>
            <MenuNavLink to="card" styleActive>
              Card
            </MenuNavLink>
            <MenuNavLink to="checkbox" styleActive>
              Checkbox
            </MenuNavLink>
            <MenuNavLink to="columns" styleActive>
              Columns
            </MenuNavLink>
            <MenuNavLink to="container" styleActive>
              Container
            </MenuNavLink>
            <MenuNavLink to="dialog" styleActive>
              Dialog
            </MenuNavLink>
            <MenuNavLink to="divider" styleActive>
              Divider
            </MenuNavLink>
            <MenuNavLink to="dropdown" styleActive>
              Dropdown
            </MenuNavLink>
            <MenuNavLink to="heading" styleActive>
              Heading
            </MenuNavLink>
            <MenuNavLink to="help-text" styleActive>
              Help Text
            </MenuNavLink>
            <MenuNavLink to="icon" styleActive>
              Icon
            </MenuNavLink>
            <MenuNavLink to="input" styleActive>
              Input
            </MenuNavLink>
            <MenuNavLink to="label" styleActive>
              Label
            </MenuNavLink>
            <MenuNavLink to="link" styleActive>
              Link
            </MenuNavLink>
            <MenuNavLink to="page" styleActive>
              Page
            </MenuNavLink>
            <MenuNavLink to="popover" styleActive>
              Popover
            </MenuNavLink>
            <MenuNavLink to="radio-group" styleActive>
              Radio Group
            </MenuNavLink>
            <MenuNavLink to="search-input" styleActive>
              Search Input
            </MenuNavLink>
            <MenuNavLink to="select" styleActive>
              Select
            </MenuNavLink>
            <MenuNavLink to="skeleton" styleActive>
              Skeleton
            </MenuNavLink>
            <MenuNavLink to="spinner" styleActive>
              Spinner
            </MenuNavLink>
            <MenuNavLink to="table" styleActive>
              Table
            </MenuNavLink>
            <MenuNavLink to="tabs" styleActive>
              Tabs
            </MenuNavLink>
            <MenuNavLink to="text" styleActive>
              Text
            </MenuNavLink>
            <MenuNavLink to="textarea" styleActive>
              Textarea
            </MenuNavLink>
            <MenuNavLink to="toast" styleActive>
              Toast
            </MenuNavLink>
            <MenuNavLink to="toggle" styleActive>
              Toggle
            </MenuNavLink>
          </Columns.Column>
          <Columns.Column data-testid="page-components-content">
            <Outlet />
          </Columns.Column>
        </Columns>
      </Container>
    </Page>
  );
};

export default ComponentsPage;
