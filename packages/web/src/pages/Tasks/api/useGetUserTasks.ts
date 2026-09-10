import { UseQueryResult, useQuery } from '@tanstack/react-query';

import { useAxios } from '@/common/hooks/useAxios';
import { QueryKey } from '@/common/utils/constants';
import { config } from '@/common/utils/config';
import type { Task } from '@/common/types/task';

/**
 * The request properties for `useGetUserTasks`.
 * @param {number} userId - A `User` identifier.
 */
interface UseGetUserTasksProps {
  userId?: number;
}

/**
 * An API hook which fetches a collection of `Task` objects which
 * are assigned to a `User`.
 * @param {UseGetUserTasksProps} props - Hook properties.
 * @returns Returns a `UseQueryResult` with `Task` collection data.
 */
export const useGetUserTasks = ({ userId }: UseGetUserTasksProps): UseQueryResult<Task[], Error> => {
  const axios = useAxios();

  const getUserTasks = async (): Promise<Task[]> => {
    const response = await axios.request({
      url: `${config.VITE_BASE_URL_API}/users/${userId}/todos`,
    });
    return response.data;
  };

  return useQuery({
    queryKey: [QueryKey.Tasks, { userId }],
    queryFn: getUserTasks,
    enabled: !!userId,
  });
};
