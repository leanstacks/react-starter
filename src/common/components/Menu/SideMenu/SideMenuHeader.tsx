import { PropsWithChildren } from 'react';

import { cn } from 'common/utils/css';
import { BaseComponentProps } from 'common/utils/types';
import MenuCloseButton from '../MenuCloseButton';

/**
 * Properties for the `SideMenuHeader` component.
 * @param {function} [close] - Optional. If provided, invoked when the user
 * clicks the close button.
 * @see {@link PropsWithChildren}
 * @see {@link BaseComponentProps}
 */
export interface SideMenuHeaderProps extends BaseComponentProps, PropsWithChildren {
  close?: () => void;
}

/**
 * The `SideMenuHeader` React component renders a block which appears at the
 * top of a `SideMenu`.
 *
 * The `children` content are rendered on the left side of the header. A
 * `MenuCloseButton` is rendered on the right side.
 * @param {SideMenuHeaderProps} props - Component properties, `SideMenuHeaderProps`.
 */
const SideMenuHeader = ({ children, className, close, testId = 'menu-header' }: SideMenuHeaderProps) => {
  return (
    <div className={cn('flex h-14 items-center justify-between px-2 pt-2', className)} data-testid={testId}>
      <div className="mx-2">{children}</div>
      <MenuCloseButton className="mx-2" close={close} testId={`${testId}-close-button`} />
    </div>
  );
};

export default SideMenuHeader;
