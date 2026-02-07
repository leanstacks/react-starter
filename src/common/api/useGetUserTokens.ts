import { UseQueryOptions, UseQueryResult, useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';

import { QueryKey, StorageKey } from 'common/utils/constants';
import storage from 'common/utils/storage';

/**
 * A `UserTokens` object contains OAuth access, id, and refresh tokens
 * and related metadata.
 */
export interface UserTokens {
  access_token: string;
  id_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  expires_at: string;
}

/**
 * An API hook which fetches OAuth tokens from the application IdP..
 * @param [options] - Optional. A UseQueryOptions object to supply additional
 * configuration to `useQuery`.
 * @returns {UserTokens} Returns a `UseQueryResult` with `UserTokens` data.
 */
export const useGetUserTokens = (options?: Partial<UseQueryOptions<UserTokens>>): UseQueryResult<UserTokens, Error> => {
  /**
   * Fetch `UserTokens` from the Identity Provider (IdP).
   * @returns The `UserTokens` if successful.
   */
  const getUserTokens = async (): Promise<UserTokens> => {
    // REPLACE: fetch tokens from your IdP
    return new Promise((resolve, reject) => {
      const storedTokens = storage.getJsonItem<UserTokens>(StorageKey.UserTokens);

      if (storedTokens) {
        // tokens found
        const now = dayjs();
        if (now.isBefore(storedTokens.expires_at)) {
          // tokens not expired
          return resolve(storedTokens);
        } else {
          // tokens expired
          return reject(new Error('Tokens expired.'));
        }
      }

      // tokens not found
      return reject(new Error('Tokens not found.'));
    });
  };

  return useQuery({
    queryKey: [QueryKey.UserTokens],
    queryFn: () => getUserTokens(),
    retry: 0,
    ...options,
  });
};
