import { describe, expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { toast } from 'sonner';

import { render, screen } from '@/test/test-utils';
import { todosFixture } from '@/__fixtures__/todos';
import { Button } from '@react-starter/shared/components/shadcn/button';

import { TaskDeleteDialog } from './TaskDeleteDialog';

vi.mock('sonner', () => ({
  toast: {
    promise: vi.fn((promise, _data) => {
      // Ensure the promise is caught to prevent unhandled rejection in tests
      promise.catch(() => {
        // Silently catch errors - they're handled by the component
      });
      return { unwrap: () => promise };
    }),
  },
}));

describe('TaskDeleteDialog', () => {
  it('should render successfully', async () => {
    // ARRANGE
    const user = userEvent.setup();
    const task = todosFixture[0];
    render(
      <div>
        <TaskDeleteDialog
          task={task}
          data-testid="dialog"
          trigger={<Button data-testid="dialog-trigger">Open</Button>}
        />
      </div>,
    );

    // ACT
    const dialogTrigger = await screen.findByTestId('dialog-trigger');
    await user.click(dialogTrigger);

    // ASSERT
    expect(screen.getByRole('dialog')).toBeDefined();
  });

  it('should close dialog when cancel button clicked', async () => {
    // ARRANGE
    const user = userEvent.setup();
    const task = todosFixture[0];
    render(
      <div>
        <TaskDeleteDialog
          task={task}
          data-testid="dialog"
          trigger={<Button data-testid="dialog-trigger">Open</Button>}
        />
      </div>,
    );

    // ACT - OPEN DIALOG
    const dialogTrigger = await screen.findByTestId('dialog-trigger');
    await user.click(dialogTrigger);

    // ASSERT - DIALOG IS OPEN
    expect(screen.getByRole('dialog')).toBeDefined();

    // ACT - CLICK CANCEL BUTTON
    const cancelButton = await screen.getByTestId(`task-delete-dialog-button-cancel-${task.id}`);
    await user.click(cancelButton);

    // ASSERT - DIALOG IS CLOSED
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('should delete task when delete button clicked', async () => {
    // ARRANGE
    const user = userEvent.setup();
    const task = todosFixture[0];

    render(
      <div>
        <TaskDeleteDialog
          task={task}
          data-testid="dialog"
          trigger={<Button data-testid="dialog-trigger">Open</Button>}
        />
      </div>,
    );

    // ACT - OPEN DIALOG
    const dialogTrigger = await screen.findByTestId('dialog-trigger');
    await user.click(dialogTrigger);

    // ASSERT - DIALOG IS OPEN
    expect(screen.getByRole('dialog')).toBeDefined();

    // ACT - CLICK DELETE BUTTON
    const deleteButton = await screen.getByTestId(`task-delete-dialog-button-delete-${task.id}`);
    await user.click(deleteButton);

    // ASSERT - TOAST IS CALLED
    expect(toast.promise).toHaveBeenCalled();
  });

  it('should display error when there is a problem deleting task', async () => {
    // ARRANGE
    const user = userEvent.setup();
    const task = { ...todosFixture[0], id: 999999 };

    render(
      <div>
        <TaskDeleteDialog
          task={task}
          data-testid="dialog"
          trigger={<Button data-testid="dialog-trigger">Open</Button>}
        />
      </div>,
    );

    // ACT - OPEN DIALOG
    const dialogTrigger = await screen.findByTestId('dialog-trigger');
    await user.click(dialogTrigger);

    // ASSERT - DIALOG IS OPEN
    expect(screen.getByRole('dialog')).toBeDefined();

    // ACT - CLICK DELETE BUTTON
    const deleteButton = screen.getByTestId(`task-delete-dialog-button-delete-${task.id}`);
    await user.click(deleteButton);

    // ASSERT - ERROR IS SHOWN
    expect(screen.getByTestId(`task-delete-dialog-error-${task.id}`)).toBeDefined();
  });
});
