import { UseQueryResult, useQuery } from '@tanstack/react-query';

import { useAxios } from 'common/hooks/useAxios';
import { Task } from 'pages/Tasks/api/useGetUserTasks';
import { QueryKey } from 'common/utils/constants';
import { config } from 'common/utils/config';

/**
 * Properties for the `useGetTask` hook.
 * @param {number} taskId - A `Task` identifier.
 */
interface UseGetTaskProps {
  taskId: number;
}

/**
 * An API hook which fetches a single `Task` object by the identifier attribute.
 * @param {UseGetTaskProps} props - Hook properties.
 * @returns Returns a `UseQueryResult` with `Task` data.
 */
export const useGetTask = ({ taskId }: UseGetTaskProps): UseQueryResult<Task> => {
  const axios = useAxios();

  const getTask = async (): Promise<Task> => {
    const response = await axios.request({
      url: `${config.VITE_BASE_URL_API}/todos/${taskId}`,
    });

    return response.data;
  };

  return useQuery({
    queryKey: [QueryKey.Tasks, taskId],
    queryFn: () => getTask(),
    enabled: !!taskId,
  });
};
