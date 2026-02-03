import { describe, expect, it } from 'vitest';
import { Navigate, Route, Routes } from 'react-router-dom';

import { render, screen } from 'test/test-utils';

import ComponentsPageBreadcrumbs from '../ComponentsPageBreadcrumbs';

describe('ComponentsPageBreadcrumbs', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(
      <Routes>
        <Route path="/pub/components" element={<ComponentsPageBreadcrumbs />} />
        <Route path="/pub/components/alert" element={<ComponentsPageBreadcrumbs />} />
        <Route path="/" element={<Navigate to="/pub/components/alert" />} />
      </Routes>,
    );
    await screen.findByTestId('page-components-breadcrumbs');

    // ASSERT
    expect(screen.getByTestId('page-components-breadcrumbs')).toBeDefined();
  });

  it('should render third path element breadcrumb', async () => {
    // ARRANGE
    render(
      <Routes>
        <Route path="/pub/components" element={<ComponentsPageBreadcrumbs />} />
        <Route path="/pub/components/alert" element={<ComponentsPageBreadcrumbs />} />
        <Route path="/" element={<Navigate to="/pub/components/alert" />} />
      </Routes>,
    );
    await screen.findByTestId('page-components-breadcrumbs-page-alert');

    // ASSERT
    expect(screen.getByTestId('page-components-breadcrumbs-page-alert')).toBeDefined();
    expect(screen.getByTestId('page-components-breadcrumbs-page-alert')).toHaveTextContent(/alert/i);
  });
});
