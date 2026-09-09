import { render, screen } from '@/test/test-utils';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { UseQueryResult } from '@tanstack/react-query';

import * as UseGetCurrentUser from '@/common/api/useGetCurrentUser';
import type { User } from '@/common/api/useGetUser';
import { userFixture1 } from '@/__fixtures__/users';

import TaskListLayout from './TaskListLayout';

describe('TaskListLayout', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<TaskListLayout data-testid="layout-task-list" />);
    const layout = await screen.findByTestId('layout-task-list');

    // ASSERT
    expect(layout).toBeDefined();
  });

  it('should render content when user loaded', async () => {
    // ARRANGE
    const user = userEvent.setup();
    const useGetCurrentUserSpy = vi.spyOn(UseGetCurrentUser, 'useGetCurrentUser');
    useGetCurrentUserSpy.mockReturnValue({ data: userFixture1 } as unknown as UseQueryResult<User, Error>);
    render(<TaskListLayout data-testid="layout-task-list" />);
    const layout = await screen.findByTestId('layout-task-list');

    // ACT
    const completedTasksAccordionTrigger = screen.getByTestId('task-list-complete-trigger');
    await user.click(completedTasksAccordionTrigger);

    // ASSERT
    expect(layout).toBeDefined();
    expect(screen.getByTestId('task-list-incomplete')).toBeDefined();
    expect(screen.getByTestId('task-list-complete')).toBeDefined();
  });
});
