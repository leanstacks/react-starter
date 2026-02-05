import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';

import { cn } from 'common/utils/css';
import { PropsWithTestId } from 'common/utils/types';

/**
 * Properties for the `Link` component.
 * @see {@link https://reactrouter.com/en/main/components/link | LinkProps}
 * @see {@link PropsWithTestId}
 */
export interface LinkProps extends RouterLinkProps, PropsWithTestId {}

/**
 * The `Link` React component formats and renders an `<a />` anchor HTML element using
 * the `Link` component from React Router.
 */
const Link = ({ children, className, testId = 'link', ...props }: LinkProps) => {
  return (
    <RouterLink
      className={cn(
        'font-medium underline decoration-sky-500 decoration-1 underline-offset-3 hover:decoration-2 dark:decoration-sky-400',
        className,
      )}
      data-testid={testId}
      {...props}
    >
      {children}
    </RouterLink>
  );
};

export default Link;
