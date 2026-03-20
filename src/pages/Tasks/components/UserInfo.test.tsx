import { render, screen } from 'test/test-utils';
import { describe, expect, it, vi } from 'vitest';
import { UseQueryResult } from '@tanstack/react-query';

import * as UseGetUser from 'common/api/useGetUser';
import { userFixture1 } from '__fixtures__/users';

import UserInfo from './UserInfo';

describe('UserInfo', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<UserInfo userId={1} />);
    await screen.findByTestId('user-info');

    // ASSERT
    expect(screen.getByTestId('user-info')).toBeDefined();
  });

  it('should display loading state', async () => {
    // ARRANGE
    const useGetUserSpy = vi.spyOn(UseGetUser, 'useGetUser');
    useGetUserSpy.mockReturnValue({
      data: undefined,
      isLoading: true,
    } as unknown as UseQueryResult<UseGetUser.User, Error>);
    render(<UserInfo userId={1} />);
    await screen.findByTestId('user-info-loading');

    // ASSERT
    expect(screen.getByTestId('user-info-loading')).toBeDefined();
  });

  it('should display content when user loaded', async () => {
    // ARRANGE
    const useGetUserSpy = vi.spyOn(UseGetUser, 'useGetUser');
    useGetUserSpy.mockReturnValue({
      data: userFixture1,
      isLoading: false,
    } as unknown as UseQueryResult<UseGetUser.User, Error>);
    render(<UserInfo userId={1} testId="component" />);
    await screen.findByTestId('component-content');

    // ASSERT
    expect(screen.getByTestId('component-content')).toBeDefined();
    expect(screen.getByTestId('component-avatar')).toBeDefined();
  });
});
