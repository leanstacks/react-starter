import { describe, expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';

import { render, screen } from '@/test/test-utils';
import { todosFixture } from '@/__fixtures__/todos';
import * as sonner from '@react-starter/shared/components/shadcn/sonner';

import { TaskDeleteDialog } from './TaskDeleteDialog';
import { Button } from '@react-starter/shared/components/shadcn/button';

describe('TaskDeleteDialog', () => {
  it('should render successfully', async () => {
    // ARRANGE
    const user = userEvent.setup();
    const task = todosFixture[0];
    render(
      <div>
        <TaskDeleteDialog task={task} testId="dialog">
          <Button data-testid="dialog-trigger">Open</Button>
        </TaskDeleteDialog>
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
        <TaskDeleteDialog task={task} testId="dialog">
          <Button data-testid="dialog-trigger">Open</Button>
        </TaskDeleteDialog>
      </div>,
    );

    // ACT - OPEN DIALOG
    const dialogTrigger = await screen.findByTestId('dialog-trigger');
    await user.click(dialogTrigger);

    // ASSERT - DIALOG IS OPEN
    expect(screen.getByRole('dialog')).toBeDefined();

    // ACT - CLICK CANCEL BUTTON
    const cancelButton = await screen.getByTestId('dialog-button-cancel');
    await user.click(cancelButton);

    // ASSERT - DIALOG IS CLOSED
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('should delete task when delete button clicked', async () => {
    // ARRANGE
    const user = userEvent.setup();
    const task = todosFixture[0];
    const mockToast = vi.fn();
    const toastSpy = vi.spyOn(sonner, 'toast');
    toastSpy.mockImplementation(mockToast);

    render(
      <div>
        <TaskDeleteDialog task={task} testId="dialog">
          <Button data-testid="dialog-trigger">Open</Button>
        </TaskDeleteDialog>
      </div>,
    );

    // ACT - OPEN DIALOG
    const dialogTrigger = await screen.findByTestId('dialog-trigger');
    await user.click(dialogTrigger);

    // ASSERT - DIALOG IS OPEN
    expect(screen.getByRole('dialog')).toBeDefined();

    // ACT - CLICK DELETE BUTTON
    const deleteButton = await screen.getByTestId('dialog-button-delete');
    await user.click(deleteButton);

    // ASSERT - TOAST IS CALLED
    expect(mockToast).toHaveBeenCalled();
  });

  it('should display error when there is a problem deleting task', async () => {
    // ARRANGE
    const user = userEvent.setup();
    const task = { ...todosFixture[0], id: 999999 };

    render(
      <div>
        <TaskDeleteDialog task={task} testId="dialog">
          <Button data-testid="dialog-trigger">Open</Button>
        </TaskDeleteDialog>
      </div>,
    );

    // ACT - OPEN DIALOG
    const dialogTrigger = await screen.findByTestId('dialog-trigger');
    await user.click(dialogTrigger);

    // ASSERT - DIALOG IS OPEN
    expect(screen.getByRole('dialog')).toBeDefined();

    // ACT - CLICK DELETE BUTTON
    const deleteButton = await screen.getByTestId('dialog-button-delete');
    await user.click(deleteButton);

    // ASSERT - ERROR IS SHOWN
    expect(screen.getByTestId('dialog-error')).toBeDefined();
  });
});
