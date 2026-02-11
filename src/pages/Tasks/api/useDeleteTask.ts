import { useMutation, useQueryClient } from '@tanstack/react-query';
import reject from 'lodash/reject';

import { QueryKey } from 'common/utils/constants';
import { config } from 'common/utils/config';
import { Task } from 'pages/Tasks/api/useGetUserTasks';
import { useAxios } from 'common/hooks/useAxios';

/**
 * The `useDeleteTask` mutation function variables.
 */
export type DeleteTaskVariables = {
  task: Task;
};

/**
 * An API hook which deletes a single `Task`. Returns a `UseMutationResult`
 * object whose `mutate` attribute is a function to delete a `Task`.
 *
 * When successful, the hook updates cached `Task` query data.
 *
 * @returns Returns a `UseMutationResult`.
 */
export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  const axios = useAxios();

  /**
   * Delete a `Task`.
   * @param {DeleteTaskVariables} variables - The mutation function variables.
   */
  const deleteTask = async ({ task }: DeleteTaskVariables): Promise<void> => {
    await axios.request({
      method: 'delete',
      url: `${config.VITE_BASE_URL_API}/todos/${task.id}`,
    });
  };

  return useMutation({
    mutationFn: deleteTask,
    onSuccess: (_data, variables) => {
      queryClient.setQueryData<Task[]>([QueryKey.Tasks, { userId: variables.task.userId }], (cachedTasks) =>
        cachedTasks ? [...reject(cachedTasks, { id: variables.task.id })] : [],
      );
    },
  });
};
