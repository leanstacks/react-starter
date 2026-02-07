import { PropsWithChildren } from 'react';

import { cn } from 'common/utils/css';
import { BaseComponentProps } from 'common/utils/types';

/**
 * Properties for the `HelpText` component.
 * @see {@link BaseComponentProps}
 * @see {@link PropsWithChildren}
 */
export interface HelpTextProps extends BaseComponentProps, PropsWithChildren {}

/**
 * The `HelpText` component renders styled text typically used to display helpful
 * information with regard to another element, such as a form field.
 * @param {HelpTextProps} props - Component properties.
 */
const HelpText = ({ children, className, testId = 'help-text' }: HelpTextProps) => {
  return (
    <div className={cn('inline-block text-sm font-light', className)} data-testid={testId}>
      {children}
    </div>
  );
};

export default HelpText;
