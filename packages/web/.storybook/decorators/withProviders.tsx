import { Decorator } from '@storybook/react-vite';
import { QueryClientProvider } from '@tanstack/react-query';

import { queryClient } from '../../src/test/query-client';
import SettingsContextProvider from '../../src/common/providers/SettingsProvider';

/**
 * Storyboook decorator which wraps a story in the application React context
 * providers.
 */
export const withProviders = (): Decorator => (Story) => (
  <QueryClientProvider client={queryClient}>
    <SettingsContextProvider>
      <Story />
    </SettingsContextProvider>
  </QueryClientProvider>
);
