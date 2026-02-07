import { describe, expect, it } from 'vitest';
import { Navigate, Route, Routes } from 'react-router-dom';

import { render, screen } from 'test/test-utils';

import SettingsPageBreadcrumbs from '../SettingsPageBreadcrumbs';

describe('SettingsPageBreadcrumbs', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(
      <Routes>
        <Route path="/app/settings" element={<SettingsPageBreadcrumbs />} />
        <Route path="/app/settings/appearance" element={<SettingsPageBreadcrumbs />} />
        <Route path="/" element={<Navigate to="/app/settings/appearance" />} />
      </Routes>,
    );
    await screen.findByTestId('page-settings-breadcrumbs');

    // ASSERT
    expect(screen.getByTestId('page-settings-breadcrumbs')).toBeDefined();
  });

  it('should render third path element breadcrumb', async () => {
    // ARRANGE
    render(
      <Routes>
        <Route path="/app/settings" element={<SettingsPageBreadcrumbs />} />
        <Route path="/app/settings/appearance" element={<SettingsPageBreadcrumbs />} />
        <Route path="/" element={<Navigate to="/app/settings/appearance" />} />
      </Routes>,
    );
    await screen.findByTestId('page-settings-breadcrumbs-page-appearance');

    // ASSERT
    expect(screen.getByTestId('page-settings-breadcrumbs-page-appearance')).toBeDefined();
    expect(screen.getByTestId('page-settings-breadcrumbs-page-appearance')).toHaveTextContent(/appearance/i);
  });
});
