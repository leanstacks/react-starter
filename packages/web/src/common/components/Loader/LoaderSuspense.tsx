import { PropsWithChildren, Suspense } from 'react';

import Spinner from './Spinner';

/**
 * The `LoaderSuspense` component renders an animated spinning loader. Typically used
 * in the `Router` to display loading state when dynamic imports are loading.
 */
const LoaderSuspense = ({ children }: PropsWithChildren) => {
  return (
    <Suspense
      fallback={
        <div className="flex h-[50vh] items-center justify-center" data-testid="loader-suspense-fallback">
          <Spinner testId="loader-suspense-spinner">
            <Spinner.Text>Loading...</Spinner.Text>
          </Spinner>
        </div>
      }
    >
      {children}
    </Suspense>
  );
};

export default LoaderSuspense;
