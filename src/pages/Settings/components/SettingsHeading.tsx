import { PropsWithChildren } from 'react';

import { PropsWithTestId } from 'common/utils/types';

/**
 * Properties for the `SettingsHeading` component.
 * @see {@link PropsWithChildren}
 * @see {@link PropsWithTestId}
 */
interface SettingsHeadingProps extends PropsWithChildren, PropsWithTestId {}

/**
 * The `SettingsHeading` component renders a standardized page/section
 * heading for Settings pages.
 * @param {SettingsHeadingProps} props - Component properties, `SettingsHeadingProps`.
 */
const SettingsHeading = ({ children, testId = 'settings-heading' }: SettingsHeadingProps) => {
  return (
    <div className="mb-4 border-b border-neutral-500/50 pb-2 text-4xl" data-testid={testId}>
      {children}
    </div>
  );
};

export default SettingsHeading;
