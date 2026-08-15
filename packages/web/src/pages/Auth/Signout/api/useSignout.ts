import { useMutation, useQueryClient } from '@tanstack/react-query';

import { QueryKey, StorageKey } from '@/common/utils/constants';
import storage from '@/common/utils/storage';

/**
 * An API hook which deauthenticates the currently authenticated user.
 * @returns Returns a `UseMutationResult`.
 */
export const useSignout = () => {
  const queryClient = useQueryClient();

  /**
   * Signs out the currently authenticated user.
   * @returns Returns a Promise which resolves empty if successfully,
   * otherwise rejects with an Error.
   */
  const signout = async (): Promise<void> => {
    // REPLACE: This is a contrived "signout" approach for demonstration purposes.
    //          You should implement authentication functionality in accordance
    //          with your IdP.

    return new Promise((resolve, reject) => {
      try {
        storage.removeItem(StorageKey.UserTokens);
        storage.removeItem(StorageKey.User);
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  };

  return useMutation({
    mutationFn: signout,
    onSuccess: () => {
      queryClient.resetQueries({ queryKey: [QueryKey.UserTokens] });
      queryClient.resetQueries({ queryKey: [QueryKey.Users] });
    },
  });
};
