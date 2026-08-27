import { Settings } from '@/common/api/useGetSettings';

/**
 * Keys used with React Query cache.
 */
export enum QueryKey {
  Settings = 'Settings',
  Tasks = 'Tasks',
  Users = 'Users',
  UserTokens = 'UserTokens',
}

/**
 * Keys used for browser storage.
 */
export enum StorageKey {
  Language = 'react-starter.language',
  Settings = 'react-starter.settings',
  User = 'react-starter.user',
  UserTokens = 'react-starter.user-tokens',
}

/**
 * Default `Settings`, i.e. user preferences.
 */
export const DEFAULT_SETTINGS: Settings = {
  theme: 'system',
};

/**
 * URL search parameter, i.e. query string, keys.
 */
export enum SearchParam {
  tab = 'tab',
}
