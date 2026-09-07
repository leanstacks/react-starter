import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@/test/test-utils';
import { queryClient } from '@/test/query-client';
import { UseQueryResult } from '@tanstack/react-query';

import { User } from '@/common/api/useGetUser';
import * as UseAuth from '@/common/hooks/useAuth';
import * as UseGetCurrentUser from '@/common/api/useGetCurrentUser';
import { userFixture1 } from '@/__fixtures__/users';

import { AppSidebar } from './AppSidebar';
import { SidebarProvider } from '@react-starter/shared/components/shadcn/sidebar';

// Mock the use-mobile hook to avoid matchMedia issues in tests
vi.mock('@react-starter/shared/hooks/use-mobile', () => ({
  useIsMobile: () => false,
}));

describe('AppSidebar', () => {
  const useAuthSpy = vi.spyOn(UseAuth, 'useAuth');
  const useGetCurrentUserSpy = vi.spyOn(UseGetCurrentUser, 'useGetCurrentUser');

  const renderWrapper = (children: React.ReactNode) => render(<SidebarProvider>{children}</SidebarProvider>);

  beforeEach(() => {
    queryClient.clear();
    useAuthSpy.mockReturnValue({
      isAuthenticated: true,
    });
    useGetCurrentUserSpy.mockReturnValue({
      data: userFixture1,
    } as unknown as UseQueryResult<User>);
  });

  it('should render successfully', async () => {
    // ARRANGE
    renderWrapper(<AppSidebar />);
    await screen.findByTestId('app-sidebar');

    // ASSERT
    expect(screen.getByTestId('app-sidebar')).toBeDefined();
  });

  it('should render authenticated content', async () => {
    // ARRANGE
    renderWrapper(<AppSidebar />);
    await screen.findByTestId('app-sidebar');

    // ASSERT
    expect(screen.getByTestId('app-sidebar')).toBeDefined();
    expect(screen.getByText('Sign Out')).toBeDefined();
    expect(screen.getByText('Settings')).toBeDefined();
    expect(screen.getByText('Tasks')).toBeDefined();
  });

  it('should render unauthenticated content', async () => {
    // ARRANGE
    useAuthSpy.mockReturnValue({
      isAuthenticated: false,
    });
    useGetCurrentUserSpy.mockReturnValue({
      data: undefined,
    } as unknown as UseQueryResult<User>);
    renderWrapper(<AppSidebar />);
    await screen.findByTestId('app-sidebar');

    // ASSERT
    expect(screen.getByTestId('app-sidebar')).toBeDefined();
    expect(screen.getByAltText('Logo')).toBeDefined();
    expect(screen.getByText(/^Sign In$/i)).toBeDefined();
    expect(screen.getByText(/Create Account/i)).toBeDefined();
  });
});
