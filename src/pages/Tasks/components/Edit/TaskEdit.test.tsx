import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';

import { render, screen, waitFor } from 'test/test-utils';

import TaskEdit from './TaskEdit';

const mockNavigate = vi.fn();
let taskId = '1';

describe('TaskEdit', () => {
  beforeEach(() => {
    // mock select functions from react-router-dom
    vi.mock('react-router-dom', async () => {
      const original = await vi.importActual('react-router-dom');
      return {
        ...original,
        useNavigate: () => mockNavigate,
        useParams: () => ({ taskId }),
      };
    });
  });

  afterEach(() => {
    taskId = '1';
  });

  it('should render successfully', async () => {
    // ARRANGE
    render(<TaskEdit />);
    await screen.findByTestId('task-edit');

    // ASSERT
    expect(screen.getByTestId('task-edit')).toBeDefined();
  });

  it('should display loading state', async () => {
    // ARRANGE
    render(<TaskEdit />);
    await screen.findByTestId('task-edit-loading');

    // ASSERT
    expect(screen.getByTestId('task-edit-loading')).toBeDefined();
  });

  it('should display form when task is loaded', async () => {
    // ARRANGE
    render(<TaskEdit />);
    await screen.findByTestId('task-form');

    // ASSERT
    expect(screen.getByTestId('task-form')).toBeDefined();
    expect(screen.queryByTestId('task-edit-loading')).toBeNull();
  });

  it('should display error when task fetch fails', async () => {
    // ARRANGE
    taskId = '999999';
    render(<TaskEdit />);
    await screen.findByTestId('task-edit-error-fetch');

    // ASSERT
    expect(screen.getByTestId('task-edit-error-fetch')).toBeDefined();
  });

  it('should navigate on form cancel', async () => {
    // ARRANGE
    const user = userEvent.setup();
    render(<TaskEdit />);
    await screen.findByTestId('task-form-button-cancel');

    // ACT
    await user.click(screen.getByTestId('task-form-button-cancel'));

    // ASSERT
    expect(mockNavigate).toHaveBeenCalledExactlyOnceWith(-1);
  });

  it('should navigate on form submit', async () => {
    // ARRANGE
    const user = userEvent.setup();
    render(<TaskEdit />);
    await screen.findByTestId('task-form-button-submit');

    // ACT
    await user.clear(screen.getByTestId('task-form-input-title-input'));
    await user.type(screen.getByTestId('task-form-input-title-input'), 'updated title');
    await user.click(screen.getByTestId('task-form-button-submit'));
    await waitFor(() => expect(mockNavigate).toHaveBeenCalledExactlyOnceWith(-1));

    // ASSERT
    expect(mockNavigate).toHaveBeenCalledExactlyOnceWith(-1);
  });

  it('should display task update error', async () => {
    // ARRANGE
    const user = userEvent.setup();
    render(<TaskEdit />);
    await screen.findByTestId('task-form-button-submit');

    // ACT
    await user.clear(screen.getByTestId('task-form-input-title-input'));
    await user.type(screen.getByTestId('task-form-input-title-input'), '500');
    await user.click(screen.getByTestId('task-form-button-submit'));
    await waitFor(() => expect(screen.getByTestId('task-edit-error-update')).toBeDefined());

    // ASSERT
    expect(screen.getByTestId('task-form-input-title-input')).toHaveValue('500');
    expect(mockNavigate).not.toHaveBeenCalled();
    expect(screen.getByTestId('task-edit-error-update')).toBeDefined();
  });
});
