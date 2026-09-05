import { useLocation } from 'react-router-dom';

import { BaseComponentProps } from '@react-starter/shared/types/components';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@react-starter/shared/components/shadcn/breadcrumb';

/**
 * The `SettingsPageBreadcrumbs` component renders the `Breadcrumbs` for the settings
 * family of pages.
 */
const SettingsPageBreadcrumbs = ({ className, testId = 'page-settings-breadcrumbs' }: BaseComponentProps) => {
  const location = useLocation();
  const pathElements = location.pathname.split('/');

  return (
    <Breadcrumb className={className} data-testid={testId}>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/app/settings">Settings</BreadcrumbLink>
        </BreadcrumbItem>
        {!!pathElements[3] && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="capitalize" data-testid={`${testId}-page-${pathElements[3]}`}>
                {pathElements[3].replace('-', ' ')}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default SettingsPageBreadcrumbs;
