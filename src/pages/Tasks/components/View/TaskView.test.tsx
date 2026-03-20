import { render, screen } from 'test/test-utils';
import { describe, expect, it, vi } from 'vitest';
import { UseQueryResult } from '@tanstack/react-query';

import { todosFixture } from '__fixtures__/todos';
import { userFixture1 } from '__fixtures__/users';
import * as UseGetUser from 'common/api/useGetUser';

import TaskView from './TaskView';

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
    render(<TaskView task={todosFixture[0]} testId="component" />);
    await screen.findByTestId('component-user-loading');

    // ASSERT
    expect(screen.getByTestId('component-user-loading')).toBeDefined();
  });

  it('should show user error state', async () => {
    // ARRANGE
    const useGetUserSpy = vi.spyOn(UseGetUser, 'useGetUser');
    useGetUserSpy.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
    } as unknown as UseQueryResult<UseGetUser.User, Error>);
    render(<TaskView task={todosFixture[0]} testId="component" />);
    await screen.findByTestId('component-user-error');

    // ASSERT
    expect(screen.getByTestId('component-user-error')).toBeDefined();
  });

  it('should show user content', async () => {
    // ARRANGE
    const useGetUserSpy = vi.spyOn(UseGetUser, 'useGetUser');
    useGetUserSpy.mockReturnValue({
      data: userFixture1,
      isLoading: false,
      isError: false,
    } as unknown as UseQueryResult<UseGetUser.User, Error>);
    render(<TaskView task={todosFixture[0]} testId="component" />);
    await screen.findByTestId('component-user-name');

    // ASSERT
    expect(screen.getByTestId('component-user-name')).toHaveTextContent(userFixture1.name);
  });

  it('should show complete task', async () => {
    // ARRANGE
    const useGetUserSpy = vi.spyOn(UseGetUser, 'useGetUser');
    useGetUserSpy.mockReturnValue({
      data: userFixture1,
      isLoading: false,
      isError: false,
    } as unknown as UseQueryResult<UseGetUser.User, Error>);
    render(<TaskView task={{ ...todosFixture[0], completed: true }} testId="component" />);
    await screen.findByTestId('component-status');

    // ASSERT
    expect(screen.getByTestId('component-status')).toHaveTextContent(/^COMPLETE$/);
  });

  it('should show incomplete task', async () => {
    // ARRANGE
    const useGetUserSpy = vi.spyOn(UseGetUser, 'useGetUser');
    useGetUserSpy.mockReturnValue({
      data: userFixture1,
      isLoading: false,
      isError: false,
    } as unknown as UseQueryResult<UseGetUser.User, Error>);
    render(<TaskView task={{ ...todosFixture[0], completed: false }} testId="component" />);
    await screen.findByTestId('component-status');

    // ASSERT
    expect(screen.getByTestId('component-status')).toHaveTextContent(/^INCOMPLETE$/);
  });
});
