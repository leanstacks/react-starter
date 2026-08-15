import { useQuery } from '@tanstack/react-query';

import storage from '@/common/utils/storage';
import { User } from './useGetUser';
import { QueryKey, StorageKey } from '@/common/utils/constants';

/**
 * An API hook which fetches the currently authenticated `User`.
 * @returns Returns a `UseQueryResult` with `User` data.
 */
export const useGetCurrentUser = () => {
  const getCurrentUser = (): Promise<User> => {
    return new Promise((resolve, reject) => {
      try {
        const storedUser = storage.getJsonItem<User>(StorageKey.User);
        if (storedUser) {
          return resolve(storedUser);
        }
        return reject(new Error('Not found'));
      } catch (err) {
        return reject(err);
      }
    });
  };

  return useQuery({
    queryKey: [QueryKey.Users, 'current'],
    queryFn: getCurrentUser,
  });
};
