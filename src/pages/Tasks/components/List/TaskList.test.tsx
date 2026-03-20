import { render, screen } from 'test/test-utils';
import { describe, expect, it, vi } from 'vitest';
import { UseQueryResult } from '@tanstack/react-query';

import { todosFixture } from '__fixtures__/todos';
import * as UseGetUserTasks from 'pages/Tasks/api/useGetUserTasks';

import TaskList from './TaskList';

describe('TaskList', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<TaskList userId={1} />);
    await screen.findByTestId('list-task');

    // ASSERT
    expect(screen.getByTestId('list-task')).toBeDefined();
  });

  it('should show heading', async () => {
    // ARRANGE
    const title = 'My Title';
    render(<TaskList userId={1} title={title} />);
    await screen.findByTestId('list-task-heading');

    // ASSERT
    expect(screen.getByTestId('list-task-heading-title')).toHaveTextContent(title);
  });

  it('should show heading with badge', async () => {
    // ARRANGE
    const useGetUserTasksSpy = vi.spyOn(UseGetUserTasks, 'useGetUserTasks');
    useGetUserTasksSpy.mockReturnValue({
      data: todosFixture,
      error: null,
      isError: false,
      isLoading: false,
    } as unknown as UseQueryResult<UseGetUserTasks.Task[], Error>);
    const title = 'My Title';
    render(<TaskList userId={1} title={title} showBadge />);
    await screen.findByTestId('list-task-heading-badge');

    // ASSERT
    expect(screen.getByTestId('list-task-heading-badge')).toBeDefined();
  });

  it('should show error state', async () => {
    // ARRANGE
    const useGetUserTasksSpy = vi.spyOn(UseGetUserTasks, 'useGetUserTasks');
    useGetUserTasksSpy.mockReturnValue({
      data: undefined,
      error: new Error('test'),
      isError: true,
      isLoading: false,
    } as unknown as UseQueryResult<UseGetUserTasks.Task[], Error>);
    render(<TaskList userId={1} />);
    await screen.findByTestId('list-task-error');

    // ASSERT
    expect(screen.getByTestId('list-task-error')).toBeDefined();
  });

  it('should show loading state', async () => {
    // ARRANGE
    const useGetUserTasksSpy = vi.spyOn(UseGetUserTasks, 'useGetUserTasks');
    useGetUserTasksSpy.mockReturnValue({
      data: undefined,
      error: null,
      isError: false,
      isLoading: true,
    } as unknown as UseQueryResult<UseGetUserTasks.Task[], Error>);
    render(<TaskList userId={1} />);
    await screen.findByTestId('list-task-loading');

    // ASSERT
    expect(screen.getByTestId('list-task-loading')).toBeDefined();
  });

  it('should show empty state', async () => {
    // ARRANGE
    const useGetUserTasksSpy = vi.spyOn(UseGetUserTasks, 'useGetUserTasks');
    useGetUserTasksSpy.mockReturnValue({
      data: [],
      error: null,
      isError: false,
      isLoading: false,
    } as unknown as UseQueryResult<UseGetUserTasks.Task[], Error>);
    render(<TaskList userId={1} />);
    await screen.findByTestId('list-task-empty');

    // ASSERT
    expect(screen.getByTestId('list-task-empty')).toBeDefined();
  });

  it('should show content when loaded successfully', async () => {
    // ARRANGE
    const useGetUserTasksSpy = vi.spyOn(UseGetUserTasks, 'useGetUserTasks');
    useGetUserTasksSpy.mockReturnValue({
      data: todosFixture,
      error: null,
      isError: false,
      isLoading: false,
    } as unknown as UseQueryResult<UseGetUserTasks.Task[], Error>);
    render(<TaskList userId={1} />);
    await screen.findByTestId('list-task-content');

    // ASSERT
    expect(screen.getByTestId('list-task-content')).toBeDefined();
  });
});
