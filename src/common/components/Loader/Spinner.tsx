import { PropsWithChildren } from 'react';

import { BaseComponentProps } from 'common/utils/types';
import { cn } from 'common/utils/css';
import FAIcon, { FAIconProps } from 'common/components/Icon/FAIcon';

/**
 * Properties for the `Spinner` component.
 * @param {string} [icon] - Optional. A `FAIconProps` object containing properties
 * for the icon.
 * @see {@link FAIconProps}
 */
export interface SpinnerProps extends BaseComponentProps, PropsWithChildren {
  icon?: Omit<FAIconProps, 'icon'> & Partial<Pick<FAIconProps, 'icon'>>;
}

/**
 * The `Spinner` component displays an animated spinning loader icon with
 * optional accompanying text. Typically used when some foreground or background
 * process is occurring, such as an interaction with an API.
 */
const Spinner = ({ children, className, icon, testId = 'spinner' }: SpinnerProps) => {
  return (
    <div className={cn('flex items-center gap-2', className)} data-testid={testId}>
      <FAIcon icon={icon?.icon || 'circleNotch'} spin {...icon} testId={`${testId}-icon`} />
      {children}
    </div>
  );
};

/**
 * The Text component displays optional accompanying text for the `Spinner`.
 */
const Text = ({ children, className, testId = 'spinner-text' }: BaseComponentProps & PropsWithChildren) => {
  return (
    <div className={cn(className)} data-testid={testId}>
      {children}
    </div>
  );
};
Spinner.Text = Text;

export default Spinner;
