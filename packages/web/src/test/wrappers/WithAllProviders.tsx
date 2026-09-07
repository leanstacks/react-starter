import { PropsWithChildren } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';

import SettingsContextProvider from '@/common/providers/SettingsProvider';
import AuthContextProvider from '@/common/providers/AuthProvider';

import { queryClient } from '../query-client';

/**
 * The default React test wrapper. Wraps the component under test with a set
 * of React components, typically providers.
 *
 * This test wrapper includes all of the providers used in the application.
 * @param {PropsWithChildren} props - Component properties.
 */
const WithAllProviders = ({ children }: PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SettingsContextProvider>
        <AuthContextProvider>
          <MemoryRouter>{children}</MemoryRouter>
        </AuthContextProvider>
      </SettingsContextProvider>
    </QueryClientProvider>
  );
};

export default WithAllProviders;
