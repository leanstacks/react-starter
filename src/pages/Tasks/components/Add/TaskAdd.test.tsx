import { describe, expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { UseQueryResult } from '@tanstack/react-query';

import { render, screen, waitFor } from 'test/test-utils';
import * as UseGetCurrentUser from 'common/api/useGetCurrentUser';
import { User } from 'common/api/useGetUser';
import { userFixture1 } from '__fixtures__/users';

import TaskAdd from './TaskAdd';

// mock select functions from react-router-dom
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const original = await vi.importActual('react-router-dom');
  return {
    ...original,
    useNavigate: () => mockNavigate,
  };
});

describe('TaskAdd', () => {
  it('should render successfully', async () => {
    // ARRANGE
    const useGetCurrentUserSpy = vi.spyOn(UseGetCurrentUser, 'useGetCurrentUser');
    useGetCurrentUserSpy.mockReturnValue({
      data: userFixture1,
    } as unknown as UseQueryResult<User>);
    render(<TaskAdd />);
    await screen.findByTestId('task-add');

    // ASSERT
    expect(screen.getByTestId('task-add')).toBeDefined();
  });

  it('should call navigate on cancel', async () => {
    // ARRANGE
    const user = userEvent.setup();
    const useGetCurrentUserSpy = vi.spyOn(UseGetCurrentUser, 'useGetCurrentUser');
    useGetCurrentUserSpy.mockReturnValue({
      data: userFixture1,
    } as unknown as UseQueryResult<User>);
    render(<TaskAdd />);
    await screen.findByTestId('task-form-button-cancel');

    // ACT
    await user.click(screen.getByTestId('task-form-button-cancel'));

    // ASSERT
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  it('should call navigate on submit', async () => {
    // ARRANGE
    const user = userEvent.setup();
    const useGetCurrentUserSpy = vi.spyOn(UseGetCurrentUser, 'useGetCurrentUser');
    useGetCurrentUserSpy.mockReturnValue({
      data: userFixture1,
    } as unknown as UseQueryResult<User>);
    render(<TaskAdd />);
    await screen.findByTestId('task-form-button-submit');

    // ACT
    await user.type(screen.getByTestId('task-form-input-title-input'), 'do this thing');
    await user.click(screen.getByTestId('task-form-button-submit'));

    // ASSERT
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  it('should display task create error', async () => {
    // ARRANGE
    const user = userEvent.setup();
    const useGetCurrentUserSpy = vi.spyOn(UseGetCurrentUser, 'useGetCurrentUser');
    useGetCurrentUserSpy.mockReturnValue({
      data: userFixture1,
    } as unknown as UseQueryResult<User>);
    render(<TaskAdd />);
    await screen.findByTestId('task-form-button-submit');

    // ACT
    await user.clear(screen.getByTestId('task-form-input-title-input'));
    await user.type(screen.getByTestId('task-form-input-title-input'), '500');
    await user.click(screen.getByTestId('task-form-button-submit'));
    await waitFor(() => expect(screen.getByTestId('task-add-error-create')).toBeDefined());

    // ASSERT
    expect(screen.getByTestId('task-form-input-title-input')).toHaveValue('500');
    expect(mockNavigate).not.toHaveBeenCalled();
    expect(screen.getByTestId('task-add-error-create')).toBeDefined();
  });
});
