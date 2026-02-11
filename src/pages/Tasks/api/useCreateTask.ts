import { useMutation, useQueryClient } from '@tanstack/react-query';
import reject from 'lodash/reject';

import { Task } from './useGetUserTasks';
import { useAxios } from 'common/hooks/useAxios';
import { QueryKey } from 'common/utils/constants';
import { config } from 'common/utils/config';

/**
 * The `CreateTaskDTO` object describes the `Task` attributes used to
 * create a new task.
 */
export type CreateTaskDTO = Omit<Task, 'id'> & Partial<Pick<Task, 'id'>>;

/**
 * The `useCreateTask` mutation function variables.
 */
export type CreateTaskVariables = {
  task: CreateTaskDTO;
};

/**
 * An API hook which creates a single `Task`. Returns a `UseMutationResult`
 * object whose ` mutate` attribute is a function to create a `Task`.
 *
 * When successful, the hook updates the cached `Task` query data.
 *
 * @returns Returns a `UseMutationResult`.
 */
export const useCreateTask = () => {
  const queryClient = useQueryClient();
  const axios = useAxios();

  /**
   * Create a `Task`.
   * @param {CreateTaskVariables} variables - The mutation function variables.
   * @returns A Promise which resolves to the created `Task`.
   */
  const createTask = async ({ task }: CreateTaskVariables): Promise<Task> => {
    const response = await axios.request({
      method: 'post',
      url: `${config.VITE_BASE_URL_API}/todos`,
      data: task,
    });
    return response.data;
  };

  return useMutation({
    mutationFn: createTask,
    onSuccess: (data, variables) => {
      // update the cached task list
      queryClient.setQueryData<Task[]>([QueryKey.Tasks, { userId: variables.task.userId }], (cachedTasks) =>
        cachedTasks ? [...reject(cachedTasks, { id: data.id }), data] : [data],
      );
      // create or update the cache for this task
      queryClient.setQueryData<Task>([QueryKey.Tasks, data.id], () => data);
    },
  });
};
