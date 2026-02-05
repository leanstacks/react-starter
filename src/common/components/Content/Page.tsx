import { PropsWithChildren } from 'react';

import { cn } from 'common/utils/css';
import { BaseComponentProps } from 'common/utils/types';

/**
 * Properties for the `Page` React component.
 */
export interface PageProps extends BaseComponentProps, PropsWithChildren {}

/**
 * The `Page` component renders a responsive, styled wrapper for a page of content
 * ensuring consistent spacing at various breakpoints.
 */
const Page = ({ children, className, testId = 'page' }: PageProps) => {
  return (
    <div className={cn('px-2 sm:px-8', className)} data-testid={testId}>
      {children}
    </div>
  );
};

export default Page;
