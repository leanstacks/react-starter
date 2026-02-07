import { ReactNode } from 'react';

import LoaderSuspense from 'common/components/Loader/LoaderSuspense';

/**
 * Helper function which wraps the supplied `children` with the `LoaderSuspense`
 * component.
 * @param children - The `ReactNode` to be rendered when not in suspense.
 * @see {@link https://react.dev/reference/react/lazy}
 */
export const withSuspense = (children: ReactNode) => <LoaderSuspense>{children}</LoaderSuspense>;
