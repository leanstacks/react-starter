import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { UseQueryResult } from '@tanstack/react-query';

import { render, screen } from 'test/test-utils';
import * as UseGetCurrentUser from 'common/api/useGetCurrentUser';
import { User } from 'common/api/useGetUser';
import { userFixture1 } from '__fixtures__/users';

import TasksPage from './TasksPage';

// mock select functions from react-router-dom
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const original = await vi.importActual('react-router-dom');
  return {
    ...original,
    useNavigate: () => mockNavigate,
  };
});

describe('TasksPage', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<TasksPage />);
    await screen.findByTestId('page-tasks');

    // ASSERT
    expect(screen.getByTestId('page-tasks')).toBeDefined();
  });

  it('should content when user loaded', async () => {
    // ARRANGE
    const useGetCurrentUserSpy = vi.spyOn(UseGetCurrentUser, 'useGetCurrentUser');
    useGetCurrentUserSpy.mockReturnValue({
      data: userFixture1,
      error: null,
      isLoading: false,
    } as unknown as UseQueryResult<User, Error>);
    render(<TasksPage />);
    await screen.findByTestId('page-tasks-content');

    // ASSERT
    expect(screen.getByTestId('page-tasks-content')).toBeDefined();
  });

  it('should navigate when add button clicked', async () => {
    // ARRANGE
    const user = userEvent.setup();
    render(<TasksPage />);
    await screen.findByTestId('page-tasks');

    // ACT
    await user.click(screen.getByTestId('page-tasks-button-add'));

    // ASSERT
    expect(mockNavigate).toHaveBeenCalledWith('/app/tasks/add');
  });
});
