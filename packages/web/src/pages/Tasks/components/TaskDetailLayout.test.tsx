import { afterEach, describe, expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { UseQueryResult } from '@tanstack/react-query';

import { render, screen } from '@/test/test-utils';
import * as UseGetTask from '@/pages/Tasks/api/useGetTask';
import { Task } from '@/common/types/task';

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
    render(<TaskDetailLayout data-testid="layout-task-detail" />);
    await screen.findByTestId('layout-task-detail');

    // ASSERT
    expect(screen.getByTestId('task-view')).toBeDefined();
  });

  it('should display task error', async () => {
    // ARRANGE
    const useGetTaskSpy = vi.spyOn(UseGetTask, 'useGetTask');
    useGetTaskSpy.mockReturnValue({
      data: undefined,
      error: new Error(),
      isLoading: false,
    } as unknown as UseQueryResult<Task, Error>);
    render(<TaskDetailLayout data-testid="layout-task-detail" />);
    await screen.findByTestId('layout-task-detail-error');

    // ASSERT
    expect(screen.getByTestId('layout-task-detail-error')).toBeDefined();
  });

  it('should render loading state', async () => {
    // ARRANGE
    const useGetTaskSpy = vi.spyOn(UseGetTask, 'useGetTask');
    useGetTaskSpy.mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: true,
    } as unknown as UseQueryResult<Task, Error>);
    render(<TaskDetailLayout data-testid="layout-task-detail" />);
    await screen.findByTestId('layout-task-detail-loading');

    // ASSERT
    expect(screen.getByTestId('layout-task-detail-loading')).toBeDefined();
  });

  it('should navigate back using close button', async () => {
    // ARRANGE
    const user = userEvent.setup();
    render(<TaskDetailLayout data-testid="layout-task-detail" />);
    const closeButton = await screen.findByTestId('layout-task-detail-button-close');

    // ACT
    await user.click(closeButton);

    // ASSERT
    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  it('should navigate to edit', async () => {
    // ARRANGE
    const user = userEvent.setup();
    render(<TaskDetailLayout data-testid="layout-task-detail" />);
    await screen.findByTestId('layout-task-detail-button-edit');

    // ACT
    await user.click(screen.getByTestId('layout-task-detail-button-edit'));

    // ASSERT
    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith('edit');
  });
});
