import { beforeEach, describe, expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';

import * as sonner from '@react-starter/shared/components/shadcn/sonner';
import { render, screen, waitFor } from '@/test/test-utils';
import { Task } from '@/pages/Tasks/api/useGetUserTasks';
import { todosFixture } from '@/__fixtures__/todos';

import { TaskCompleteToggle } from './TaskCompleteToggle';

describe('TaskCompleteToggle', () => {
  const incompleteTask: Task = { ...todosFixture[0], completed: false };
  const completeTask: Task = { ...todosFixture[0], completed: true };

  const toastSpy = vi.spyOn(sonner, 'toast');
  const mockToast = vi.fn();

  beforeEach(() => {
    toastSpy.mockImplementation(mockToast);
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
    expect(screen.getByTestId('toggle-task-complete-icon')).toHaveClass('lucide-circle');
  });

  it('should render complete task', async () => {
    // ARRANGE
    render(<TaskCompleteToggle task={completeTask} />);
    await screen.findByTestId('toggle-task-complete');

    // ASSERT
    expect(screen.getByTestId('toggle-task-complete')).toBeDefined();
    expect(screen.getByTestId('toggle-task-complete').title).toBe('Mark incomplete');
    expect(screen.getByTestId('toggle-task-complete-icon')).toHaveClass('lucide-circle-check');
  });

  it('should toggle task complete when clicked', async () => {
    // ARRANGE
    const user = userEvent.setup();
    render(<TaskCompleteToggle task={incompleteTask} />);
    await screen.findByTestId('toggle-task-complete');
    expect(screen.getByTestId('toggle-task-complete').title).toBe('Mark complete');
    expect(screen.getByTestId('toggle-task-complete-icon')).toHaveClass('lucide-circle');

    // ACT
    await user.click(screen.getByTestId('toggle-task-complete'));
    await waitFor(() => expect(mockToast).toHaveBeenCalledOnce());

    // ASSERT
    expect(mockToast).toHaveBeenCalledOnce();
    expect(mockToast).toHaveBeenCalledWith('Marked task complete');
  });

  it('should toggle task incomplete when clicked', async () => {
    // ARRANGE
    const user = userEvent.setup();
    render(<TaskCompleteToggle task={completeTask} />);
    await screen.findByTestId('toggle-task-complete');
    expect(screen.getByTestId('toggle-task-complete').title).toBe('Mark incomplete');
    expect(screen.getByTestId('toggle-task-complete-icon')).toHaveClass('lucide-circle-check');

    // ACT
    await user.click(screen.getByTestId('toggle-task-complete'));
    await waitFor(() => expect(mockToast).toHaveBeenCalledOnce());

    // ASSERT
    expect(mockToast).toHaveBeenCalledOnce();
    expect(mockToast).toHaveBeenCalledWith('Marked task incomplete');
  });
});
