import { render, screen } from '@/test/test-utils';
import { describe, expect, it, vi } from 'vitest';
import { UseQueryResult } from '@tanstack/react-query';

import { todosFixture } from '@/__fixtures__/todos';
import * as UseGetUserTasks from '@/pages/Tasks/api/useGetUserTasks';
import { Task } from '@/common/types/task';

import { TaskList } from './TaskList';

describe('TaskList', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<TaskList tasks={todosFixture} data-testid="list-task" />);
    await screen.findByTestId('list-task');

    // ASSERT
    expect(screen.getByTestId('list-task')).toBeDefined();
  });

  it('should show empty state', async () => {
    // ARRANGE
    const useGetUserTasksSpy = vi.spyOn(UseGetUserTasks, 'useGetUserTasks');
    useGetUserTasksSpy.mockReturnValue({
      data: [],
      error: null,
      isError: false,
      isLoading: false,
    } as unknown as UseQueryResult<Task[], Error>);
    render(<TaskList tasks={[]} data-testid="task-list-empty" />);
    await screen.findByTestId('task-list-empty');

    // ASSERT
    expect(screen.getByTestId('task-list-empty')).toBeDefined();
  });

  it('should show content when loaded successfully', async () => {
    // ARRANGE
    const useGetUserTasksSpy = vi.spyOn(UseGetUserTasks, 'useGetUserTasks');
    useGetUserTasksSpy.mockReturnValue({
      data: todosFixture,
      error: null,
      isError: false,
      isLoading: false,
    } as unknown as UseQueryResult<Task[], Error>);
    render(<TaskList tasks={todosFixture} data-testid="task-list" />);
    const taskList = await screen.findByTestId('task-list');

    // ASSERT
    expect(taskList).toBeDefined();
    expect(taskList.children.length).toBe(todosFixture.length);
  });
});
