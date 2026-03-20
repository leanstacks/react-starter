import { describe, expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';

import { render, screen, waitFor } from 'test/test-utils';
import { todosFixture } from '__fixtures__/todos';
import { ToastsContextValue } from 'common/providers/ToastsContext';
import * as UseToasts from 'common/hooks/useToasts';

import TaskDeleteDialog from './TaskDeleteDialog';

describe('TaskDeleteDialog', () => {
  it('should render successfully', async () => {
    // ARRANGE
    const task = todosFixture[0];
    render(
      <TaskDeleteDialog task={task} testId="dialog">
        Open
      </TaskDeleteDialog>,
    );
    await screen.findByTestId('dialog');

    // ASSERT
    expect(screen.getByTestId('dialog')).toBeDefined();
  });

  it('should close dialog when cancel button clicked', async () => {
    // ARRANGE
    const user = userEvent.setup();
    const task = todosFixture[0];
    render(
      <TaskDeleteDialog task={task} testId="dialog">
        Open
      </TaskDeleteDialog>,
    );
    await screen.findByTestId('dialog');

    // ACT
    await user.click(screen.getByTestId('dialog-trigger'));
    /* wait for dialog to open */
    await waitFor(() => expect(screen.getByTestId('dialog-content')).not.toHaveClass('hidden'));

    await user.click(screen.getByTestId('dialog-button-cancel'));
    /* wait for dialog to close */
    await waitFor(() => expect(screen.getByTestId('dialog-content')).toHaveClass('hidden'));

    // ASSERT
    expect(screen.getByTestId('dialog-content')).toHaveClass('hidden');
  });

  it('should delete task when delete button clicked', async () => {
    // ARRANGE
    const user = userEvent.setup();
    const task = todosFixture[0];
    const mockCreateToast = vi.fn();
    const useToastsSpy = vi.spyOn(UseToasts, 'useToasts');
    useToastsSpy.mockReturnValue({
      createToast: mockCreateToast,
      toasts: [],
    } as unknown as ToastsContextValue);

    render(
      <TaskDeleteDialog task={task} testId="dialog">
        Open
      </TaskDeleteDialog>,
    );
    await screen.findByTestId('dialog');

    // ACT
    await user.click(screen.getByTestId('dialog-button-delete'));

    // ASSERT
    expect(mockCreateToast).toHaveBeenCalled();
  });

  it('should display error when there is a problem deleting task', async () => {
    // ARRANGE
    const user = userEvent.setup();
    const task = { ...todosFixture[0], id: 999999 };

    render(
      <TaskDeleteDialog task={task} testId="dialog">
        Open
      </TaskDeleteDialog>,
    );
    await screen.findByTestId('dialog');

    // ACT
    await user.click(screen.getByTestId('dialog-button-delete'));
    await waitFor(() => expect(screen.getByTestId('dialog-error')).toBeDefined());

    // ASSERT
    expect(screen.getByTestId('dialog-error')).toBeDefined();
  });
});
