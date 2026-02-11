import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { User } from 'common/api/useGetUser';

import { useAxios } from 'common/hooks/useAxios';
import { QueryKey } from 'common/utils/constants';
import { config } from 'common/utils/config';

/**
 * An API hook which fetches a collection of `User` objects.
 * @returns Returns a `UseQueryResult` with `User` collection data.
 */
export const useGetUsers = (): UseQueryResult<User[], Error> => {
  const axios = useAxios();

  const getUsers = async (): Promise<User[]> => {
    const response = await axios.request({
      url: `${config.VITE_BASE_URL_API}/users`,
    });
    return response.data;
  };

  return useQuery({
    queryKey: [QueryKey.Users],
    queryFn: () => getUsers(),
  });
};
