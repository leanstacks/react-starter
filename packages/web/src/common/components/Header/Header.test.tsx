import { beforeEach, describe, expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { Route, Routes } from 'react-router-dom';

import { SidebarProvider } from '@react-starter/shared/components/shadcn/sidebar';

import { render, screen } from '@/test/test-utils';
import * as UseAuth from '@/common/hooks/useAuth';
import { AppSidebar } from './AppSidebar';

import Header from './Header';

// Mock the use-mobile hook to avoid matchMedia issues in tests
vi.mock('@react-starter/shared/hooks/use-mobile', () => ({
  useIsMobile: () => false,
}));

describe('Header', () => {
  const useAuthSpy = vi.spyOn(UseAuth, 'useAuth');

  beforeEach(() => {
    useAuthSpy.mockReturnValue({
      isAuthenticated: false,
    });
  });

  it('should render successfully', async () => {
    // ARRANGE
    render(
      <SidebarProvider>
        <AppSidebar />
        <Header />
      </SidebarProvider>,
    );
    await screen.findByTestId('header');

    // ASSERT
    expect(screen.getByTestId('header')).toBeDefined();
  });

  it('should render custom testId', async () => {
    // ARRANGE
    render(
      <SidebarProvider>
        <AppSidebar />
        <Header testId="test" />
      </SidebarProvider>,
    );
    await screen.findByTestId('test');

    // ASSERT
    expect(screen.getByTestId('test')).toBeDefined();
  });

  it('should render content when not authenticated', async () => {
    // ARRANGE
    render(
      <SidebarProvider>
        <AppSidebar />
        <Header />
      </SidebarProvider>,
    );
    await screen.findByTestId('header');

    // ASSERT
    expect(screen.getByTestId('header')).toBeDefined();
  });

  it('should render content when authenticated', async () => {
    // ARRANGE
    useAuthSpy.mockReturnValueOnce({
      isAuthenticated: true,
    });
    render(
      <SidebarProvider>
        <AppSidebar />
        <Header />
      </SidebarProvider>,
    );
    await screen.findByTestId('header');

    // ASSERT
    expect(screen.getByTestId('header')).toBeDefined();
    expect(screen.getByTestId('app-sidebar-sign-out-button')).toBeDefined();
  });

  it('should navigate when sign out button clicked', async () => {
    // ARRANGE
    useAuthSpy.mockReturnValue({
      isAuthenticated: true,
    });
    render(
      <SidebarProvider>
        <AppSidebar />
        <Header />
        <Routes>
          <Route path="/" element={<div data-testid="page-home"></div>} />
          <Route path="/auth/signout" element={<div data-testid="page-sign-out"></div>} />
        </Routes>
      </SidebarProvider>,
    );
    const signOutButton = await screen.findByTestId('app-sidebar-sign-out-button');

    // ACT
    // open the side menu
    // await userEvent.click(screen.getByTestId('button-menu-icon'));

    // click the sign out menu item
    await userEvent.click(signOutButton);

    // ASSERT
    expect(screen.getByTestId('page-sign-out')).toBeDefined();
  });
});
