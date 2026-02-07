import { render, screen } from 'test/test-utils';
import { describe, expect, it, vi } from 'vitest';
import { UseQueryResult } from '@tanstack/react-query';

import * as UseGetCurrentUser from 'common/api/useGetCurrentUser';
import * as UseGetUserTasks from 'pages/Tasks/api/useGetUserTasks';
import { User } from 'common/api/useGetUser';
import { userFixture1 } from '__fixtures__/users';
import { todosFixture } from '__fixtures__/todos';

import TaskListLayout from '../TaskListLayout';

describe('TaskListLayout', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<TaskListLayout />);
    await screen.findByTestId('layout-task-list');

    // ASSERT
    expect(screen.getByTestId('layout-task-list')).toBeDefined();
  });

  it('should render content when user loaded', async () => {
    // ARRANGE
    const useGetCurrentUserSpy = vi.spyOn(UseGetCurrentUser, 'useGetCurrentUser');
    useGetCurrentUserSpy.mockReturnValue({ data: userFixture1 } as unknown as UseQueryResult<User, Error>);
    render(<TaskListLayout testId="component" />);
    await screen.findByTestId('component-list-incomplete');

    // ASSERT
    expect(screen.getByTestId('component-list-incomplete')).toBeDefined();
    expect(screen.getByTestId('component-list-complete')).toBeDefined();
  });

  it('should render task status chart when tasks loaded', async () => {
    // ARRANGE
    const useGetCurrentUserSpy = vi.spyOn(UseGetCurrentUser, 'useGetCurrentUser');
    useGetCurrentUserSpy.mockReturnValue({ data: userFixture1 } as unknown as UseQueryResult<User, Error>);
    const useGetUserTasksSpy = vi.spyOn(UseGetUserTasks, 'useGetUserTasks');
    useGetUserTasksSpy.mockReturnValue({
      data: todosFixture,
    } as unknown as UseQueryResult<UseGetUserTasks.Task[], Error>);
    render(<TaskListLayout testId="component" />);
    await screen.findByTestId('component-chart-status');

    // ASSERT
    expect(screen.getByTestId('component-chart-status')).toBeDefined();
  });
});
