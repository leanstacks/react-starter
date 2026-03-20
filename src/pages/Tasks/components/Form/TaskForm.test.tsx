import { describe, expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';

import { render, screen } from 'test/test-utils';
import { todosFixture } from '__fixtures__/todos';

import TaskForm from './TaskForm';

describe('TaskForm', () => {
  it('should render successfully', async () => {
    // ARRANGE
    const onCancelSpy = vi.fn();
    const onSubmitSpy = vi.fn();
    render(<TaskForm onCancel={onCancelSpy} onSubmit={onSubmitSpy} />);
    await screen.findByTestId('task-form');

    // ASSERT
    expect(screen.getByTestId('task-form')).toBeDefined();
  });

  it('should initialize field values', async () => {
    // ARRANGE
    const onCancelSpy = vi.fn();
    const onSubmitSpy = vi.fn();
    const task = todosFixture[0];
    render(<TaskForm onCancel={onCancelSpy} onSubmit={onSubmitSpy} task={task} />);
    await screen.findByTestId('task-form');

    // ASSERT
    expect(screen.getByTestId('task-form')).toBeDefined();
    expect(screen.getByTestId('task-form-input-title-input')).toHaveValue(task.title);
    expect(screen.getByTestId('task-form-input-completed-icon-off')).toBeDefined();
  });

  it('should call onCancel when cancelled', async () => {
    // ARRANGE
    const onCancelSpy = vi.fn();
    const onSubmitSpy = vi.fn();
    const user = userEvent.setup();
    render(<TaskForm onCancel={onCancelSpy} onSubmit={onSubmitSpy} />);
    await screen.findByTestId('task-form-button-cancel');

    // ACT
    await user.click(screen.getByTestId('task-form-button-cancel'));

    // ASSERT
    expect(onCancelSpy).toHaveBeenCalled();
  });

  it('should call onSubmit when submitted', async () => {
    // ARRANGE
    const onCancelSpy = vi.fn();
    const onSubmitSpy = vi.fn();
    const user = userEvent.setup();
    render(
      <TaskForm
        onCancel={onCancelSpy}
        onSubmit={onSubmitSpy}
        task={{ title: 'Do a thing', completed: false, userId: 1 }}
      />,
    );
    await screen.findByTestId('task-form-button-submit');

    // ACT
    await user.type(screen.getByTestId('task-form-input-title-input'), 'do this thing');
    await user.click(screen.getByTestId('task-form-button-submit'));

    // ASSERT
    expect(onSubmitSpy).toHaveBeenCalled();
  });
});
