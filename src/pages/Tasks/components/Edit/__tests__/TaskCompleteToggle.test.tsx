import { beforeEach, describe, expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';

import { render, screen, waitFor } from 'test/test-utils';
import { Task } from 'pages/Tasks/api/useGetUserTasks';
import { todosFixture } from '__fixtures__/todos';
import * as UseToasts from 'common/hooks/useToasts';

import TaskCompleteToggle from '../TaskCompleteToggle';

describe('TaskCompleteToggle', () => {
  const incompleteTask: Task = { ...todosFixture[0], completed: false };
  const completeTask: Task = { ...todosFixture[0], completed: true };

  const useToastsSpy = vi.spyOn(UseToasts, 'useToasts');
  const mockCreateToast = vi.fn();

  beforeEach(() => {
    useToastsSpy.mockReturnValue({
      createToast: mockCreateToast,
      removeToast: vi.fn(),
      toasts: [],
    });
  });

  it('should render successfully', async () => {
    // ARRANGE
    render(<TaskCompleteToggle task={todosFixture[0]} />);
    await screen.findByTestId('toggle-task-complete');

    // ASSERT
    expect(screen.getByTestId('toggle-task-complete')).toBeDefined();
  });

  it('should use custom testId', async () => {
    // ARRANGE
    render(<TaskCompleteToggle task={todosFixture[0]} testId="custom-testId" />);
    await screen.findByTestId('custom-testId');

    // ASSERT
    expect(screen.getByTestId('custom-testId')).toBeDefined();
  });

  it('should use custom className', async () => {
    // ARRANGE
    render(<TaskCompleteToggle task={todosFixture[0]} className="custom-className" />);
    await screen.findByTestId('toggle-task-complete');

    // ASSERT
    expect(screen.getByTestId('toggle-task-complete').classList).toContain('custom-className');
  });

  it('should render incomplete task', async () => {
    // ARRANGE
    render(<TaskCompleteToggle task={incompleteTask} />);
    await screen.findByTestId('toggle-task-complete');

    // ASSERT
    expect(screen.getByTestId('toggle-task-complete')).toBeDefined();
    expect(screen.getByTestId('toggle-task-complete').title).toBe('Mark complete');
    expect(screen.getByTestId('toggle-task-complete-icon')).toHaveAttribute('data-icon', 'circle');
  });

  it('should render complete task', async () => {
    // ARRANGE
    render(<TaskCompleteToggle task={completeTask} />);
    await screen.findByTestId('toggle-task-complete');

    // ASSERT
    expect(screen.getByTestId('toggle-task-complete')).toBeDefined();
    expect(screen.getByTestId('toggle-task-complete').title).toBe('Mark incomplete');
    expect(screen.getByTestId('toggle-task-complete-icon')).toHaveAttribute('data-icon', 'circle-check');
  });

  it('should toggle task complete when clicked', async () => {
    // ARRANGE
    const user = userEvent.setup();
    render(<TaskCompleteToggle task={incompleteTask} />);
    await screen.findByTestId('toggle-task-complete');
    expect(screen.getByTestId('toggle-task-complete').title).toBe('Mark complete');
    expect(screen.getByTestId('toggle-task-complete-icon')).toHaveAttribute('data-icon', 'circle');

    // ACT
    await user.click(screen.getByTestId('toggle-task-complete'));
    await waitFor(() => expect(mockCreateToast).toHaveBeenCalledOnce());

    // ASSERT
    expect(mockCreateToast).toHaveBeenCalledOnce();
    expect(mockCreateToast).toHaveBeenCalledWith({
      text: 'Marked task complete',
      isAutoDismiss: true,
      variant: 'success',
    });
  });

  it('should toggle task incomplete when clicked', async () => {
    // ARRANGE
    const user = userEvent.setup();
    render(<TaskCompleteToggle task={completeTask} />);
    await screen.findByTestId('toggle-task-complete');
    expect(screen.getByTestId('toggle-task-complete').title).toBe('Mark incomplete');
    expect(screen.getByTestId('toggle-task-complete-icon')).toHaveAttribute('data-icon', 'circle-check');

    // ACT
    await user.click(screen.getByTestId('toggle-task-complete'));
    await waitFor(() => expect(mockCreateToast).toHaveBeenCalledOnce());

    // ASSERT
    expect(mockCreateToast).toHaveBeenCalledOnce();
    expect(mockCreateToast).toHaveBeenCalledWith({
      text: 'Marked task incomplete',
      isAutoDismiss: true,
      variant: 'success',
    });
  });

  it('should toggle icon on hover', async () => {
    // ARRANGE
    const user = userEvent.setup();
    render(
      <div data-testid="wrapper">
        <TaskCompleteToggle task={incompleteTask} testId="component" />
      </div>,
    );
    await screen.findByTestId('component');
    expect(screen.getByTestId('component-icon')).toHaveAttribute('data-icon', 'circle');

    // ACT
    await user.hover(screen.getByTestId('component'));

    // ASSERT
    expect(screen.getByTestId('component-icon')).toHaveAttribute('data-icon', 'circle-check');

    // ACT
    await user.hover(screen.getByTestId('wrapper'));

    // ASSERT
    expect(screen.getByTestId('component-icon')).toHaveAttribute('data-icon', 'circle');
  });
});
