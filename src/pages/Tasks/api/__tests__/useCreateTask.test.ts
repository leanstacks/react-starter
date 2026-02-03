import { describe, expect, it } from 'vitest';

import { renderHook, waitFor } from 'test/test-utils';
import { queryClient } from 'test/query-client';
import { Task } from '../useGetUserTasks';
import { QueryKey } from 'common/utils/constants';
import { todosFixture } from '__fixtures__/todos';

import { useCreateTask } from '../useCreateTask';

describe('useCreateTask', () => {
  it('should create task', async () => {
    // ARRANGE
    let isSuccess = false;
    const { result } = renderHook(() => useCreateTask());
    await waitFor(() => expect(result.current).not.toBeNull());

    // ACT
    result.current.mutate(
      { task: todosFixture[0] },
      {
        onSuccess: () => {
          isSuccess = true;
        },
      },
    );
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    // ASSERT
    expect(isSuccess).toBe(true);
  });

  it('should create cached data when none exists', async () => {
    // ARRANGE
    const taskToCreate = todosFixture[0];
    let isSuccess = false;
    const { result } = renderHook(() => useCreateTask());
    await waitFor(() => expect(result.current).not.toBeNull());

    // ACT
    result.current.mutate(
      { task: taskToCreate },
      {
        onSuccess: () => {
          isSuccess = true;
        },
      },
    );
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    // ASSERT
    expect(isSuccess).toBe(true);
    expect(queryClient.getQueryData([QueryKey.Tasks, { userId: taskToCreate.userId }])).toEqual([taskToCreate]);
    expect(queryClient.getQueryData([QueryKey.Tasks, taskToCreate.id])).toEqual(taskToCreate);
  });

  it('should update cached data when it exists', async () => {
    // ARRANGE
    const taskToCreate = todosFixture[0];
    queryClient.setQueryData([QueryKey.Tasks, { userId: taskToCreate.userId }], todosFixture);
    let isSuccess = false;
    const { result } = renderHook(() => useCreateTask());
    await waitFor(() => expect(result.current).not.toBeNull());

    // ACT
    result.current.mutate(
      { task: taskToCreate },
      {
        onSuccess: () => {
          isSuccess = true;
        },
      },
    );
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    // ASSERT
    expect(isSuccess).toBe(true);
    expect(queryClient.getQueryData<Task[]>([QueryKey.Tasks, { userId: taskToCreate.userId }])?.length).toEqual(
      todosFixture.length,
    );
  });
});
