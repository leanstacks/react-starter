import { afterEach, describe, expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { UseQueryResult } from '@tanstack/react-query';

import { render, screen } from 'test/test-utils';
import * as UseGetTask from 'pages/Tasks/api/useGetTask';
import { Task } from 'pages/Tasks/api/useGetUserTasks';

import TaskDetailLayout from './TaskDetailLayout';

// mock select functions from react-router-dom
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const original = await vi.importActual('react-router-dom');
  return {
    ...original,
    useNavigate: () => mockNavigate,
    useParams: () => ({
      taskId: '1',
    }),
  };
});

describe('TaskDetailLayout', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should render successfully', async () => {
    // ARRANGE
    render(<TaskDetailLayout />);
    await screen.findByTestId('layout-task-detail');

    // ASSERT
    expect(screen.getByTestId('layout-task-detail')).toBeDefined();
  });

  it('should display a task', async () => {
    // ARRANGE
    render(<TaskDetailLayout testId="component" />);
    await screen.findByTestId('component-task-view');

    // ASSERT
    expect(screen.getByTestId('component-task-view')).toBeDefined();
  });

  it('should display task error', async () => {
    // ARRANGE
    const useGetTaskSpy = vi.spyOn(UseGetTask, 'useGetTask');
    useGetTaskSpy.mockReturnValue({
      data: undefined,
      error: new Error(),
      isLoading: false,
    } as unknown as UseQueryResult<Task, Error>);
    render(<TaskDetailLayout testId="component" />);
    await screen.findByTestId('component-error-task');

    // ASSERT
    expect(screen.getByTestId('component-error-task')).toBeDefined();
  });

  it('should render loading state', async () => {
    // ARRANGE
    const useGetTaskSpy = vi.spyOn(UseGetTask, 'useGetTask');
    useGetTaskSpy.mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: true,
    } as unknown as UseQueryResult<Task, Error>);
    render(<TaskDetailLayout testId="component" />);
    await screen.findByTestId('component-loading');

    // ASSERT
    expect(screen.getByTestId('component-loading')).toBeDefined();
  });

  it('should navigate back using close button', async () => {
    // ARRANGE
    const user = userEvent.setup();
    render(<TaskDetailLayout testId="component" />);
    await screen.findByTestId('component-button-close');

    // ACT
    await user.click(screen.getByTestId('component-button-close'));

    // ASSERT
    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  it('should navigate to edit', async () => {
    // ARRANGE
    const user = userEvent.setup();
    render(<TaskDetailLayout testId="component" />);
    await screen.findByTestId('component-button-edit');

    // ACT
    await user.click(screen.getByTestId('component-button-edit'));

    // ASSERT
    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith('edit');
  });
});
