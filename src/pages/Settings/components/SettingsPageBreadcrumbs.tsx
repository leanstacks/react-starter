import { useLocation } from 'react-router-dom';

import { BaseComponentProps } from 'common/utils/types';
import Breadcrumbs from 'common/components/Breadcrumbs/Breadcrumbs';

/**
 * The `SettingsPageBreadcrumbs` component renders the `Breadcrumbs` for the settings
 * family of pages.
 */
const SettingsPageBreadcrumbs = ({ className, testId = 'page-settings-breadcrumbs' }: BaseComponentProps) => {
  const location = useLocation();
  const pathElements = location.pathname.split('/');

  return (
    <Breadcrumbs className={className} testId={testId}>
      <Breadcrumbs.List>
        <Breadcrumbs.Item>
          <Breadcrumbs.Link to="/">Home</Breadcrumbs.Link>
        </Breadcrumbs.Item>
        <Breadcrumbs.Separator />
        <Breadcrumbs.Item>
          <Breadcrumbs.Link to="/app/settings">Settings</Breadcrumbs.Link>
        </Breadcrumbs.Item>
        {!!pathElements[3] && (
          <>
            <Breadcrumbs.Separator />
            <Breadcrumbs.Item>
              <Breadcrumbs.Page className="capitalize" testId={`${testId}-page-${pathElements[3]}`}>
                {pathElements[3].replace('-', ' ')}
              </Breadcrumbs.Page>
            </Breadcrumbs.Item>
          </>
        )}
      </Breadcrumbs.List>
    </Breadcrumbs>
  );
};

export default SettingsPageBreadcrumbs;
