import { PropsWithChildren } from 'react';

import { BaseComponentProps } from 'common/utils/types';
import { cn } from 'common/utils/css';

/**
 * Properties for the `Backdrop` component.
 * @param {function} [onClick] - Optional. A function called when clicked.
 * @see {@link BaseComponentProps}
 * @see {@link PropsWithChildren}
 */
export interface BackdropProps extends BaseComponentProps, PropsWithChildren {
  onClick?: (e: React.MouseEvent) => void | Promise<void>;
}

/**
 * The `Backdrop` component renders a semi-opaque background for another
 * component.  Usually used to partially mask background content to draw
 * attention to content in the foreground such as a `Dialog` or `Menu`.
 * @param {BackgroundProps} props - Component properties
 */
const Backdrop = ({ children, className, onClick, testId = 'backdrop' }: BackdropProps) => {
  const handleClick = (e: React.MouseEvent) => {
    onClick?.(e);
  };

  return (
    <div
      className={cn('fixed top-0 right-0 z-1000 h-screen w-screen bg-neutral-500/50', className)}
      onClick={handleClick}
      data-testid={testId}
    >
      {children}
    </div>
  );
};

export default Backdrop;
