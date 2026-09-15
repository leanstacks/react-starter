import { render, screen } from '@/test/test-utils';
import { describe, expect, it, vi } from 'vitest';
import { UseQueryResult } from '@tanstack/react-query';

import { todosFixture } from '@/__fixtures__/todos';
import { userFixture1 } from '@/__fixtures__/users';
import * as UseGetUser from '@/common/api/useGetUser';

import { TaskView } from './TaskView';

describe('TaskView', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<TaskView task={todosFixture[0]} />);
    await screen.findByTestId('task-view');

    // ASSERT
    expect(screen.getByTestId('task-view')).toBeDefined();
  });

  it('should show user loading state', async () => {
    // ARRANGE
    const useGetUserSpy = vi.spyOn(UseGetUser, 'useGetUser');
    useGetUserSpy.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    } as unknown as UseQueryResult<UseGetUser.User, Error>);
    render(<TaskView task={todosFixture[0]} />);
    const loading = await screen.findByTestId('task-view-user-loading');

    // ASSERT
    expect(loading).toBeDefined();
  });

  it('should show user error state', async () => {
    // ARRANGE
    const useGetUserSpy = vi.spyOn(UseGetUser, 'useGetUser');
    useGetUserSpy.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
    } as unknown as UseQueryResult<UseGetUser.User, Error>);
    render(<TaskView task={todosFixture[0]} />);
    const error = await screen.findByTestId('task-view-user-error');

    // ASSERT
    expect(error).toBeDefined();
  });

  it('should show user content', async () => {
    // ARRANGE
    const useGetUserSpy = vi.spyOn(UseGetUser, 'useGetUser');
    useGetUserSpy.mockReturnValue({
      data: userFixture1,
      isLoading: false,
      isError: false,
    } as unknown as UseQueryResult<UseGetUser.User, Error>);
    render(<TaskView task={todosFixture[0]} />);
    const userName = await screen.findByTestId('task-view-user-name');

    // ASSERT
    expect(userName).toHaveTextContent(userFixture1.name);
  });

  it('should show complete task', async () => {
    // ARRANGE
    const useGetUserSpy = vi.spyOn(UseGetUser, 'useGetUser');
    useGetUserSpy.mockReturnValue({
      data: userFixture1,
      isLoading: false,
      isError: false,
    } as unknown as UseQueryResult<UseGetUser.User, Error>);
    render(<TaskView task={{ ...todosFixture[0], completed: true }} />);
    const status = await screen.findByTestId('task-view-status');

    // ASSERT
    expect(status).toHaveTextContent(/^COMPLETE$/i);
  });

  it('should show incomplete task', async () => {
    // ARRANGE
    const useGetUserSpy = vi.spyOn(UseGetUser, 'useGetUser');
    useGetUserSpy.mockReturnValue({
      data: userFixture1,
      isLoading: false,
      isError: false,
    } as unknown as UseQueryResult<UseGetUser.User, Error>);
    render(<TaskView task={{ ...todosFixture[0], completed: false }} />);
    const status = await screen.findByTestId('task-view-status');

    // ASSERT
    expect(status).toHaveTextContent(/^INCOMPLETE$/i);
  });
});
