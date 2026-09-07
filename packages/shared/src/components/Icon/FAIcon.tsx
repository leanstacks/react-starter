import { ComponentPropsWithoutRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faChevronDown, faChevronLeft, faChevronRight, faChevronUp } from '@fortawesome/free-solid-svg-icons';

import { BaseComponentProps } from '@react-starter/shared/types/components';
import { cn } from '@react-starter/shared/utils/css';

/**
 * A union type of all Font Awesome icon names (without the `fa-` prefix)
 * used in the application.
 */
type FAIconName = 'chevronDown' | 'chevronLeft' | 'chevronRight' | 'chevronUp';

/**
 * Properties for the `FAIcon` component.
 * @param {FAIconName} icon - The icon name.
 * @see {@link BaseComponentProps}
 * @see {@link FontAwesomeIcon}
 */
interface FAIconProps extends BaseComponentProps, Omit<ComponentPropsWithoutRef<typeof FontAwesomeIcon>, 'icon'> {
  icon: FAIconName;
}

/**
 * A key/value mapping of every icon used in the application.
 */
const icons: Record<FAIconName, IconProp> = {
  chevronDown: faChevronDown,
  chevronLeft: faChevronLeft,
  chevronRight: faChevronRight,
  chevronUp: faChevronUp,
};

/**
 * The `FAIcon` component renders a Font Awesome icon. Serves as a centralized place to manage
 * all Font Awesome icons used in the application.
 *
 * Note: Wraps the `FontAwesomeIcon` component.
 * @param props - The properties for the `FAIcon` component.
 * @returns The rendered `FontAwesomeIcon` component.
 */
const FAIcon = ({ className, icon, testId = 'fa-icon', ...iconProps }: FAIconProps) => {
  const faIcon = icons[icon];

  return <FontAwesomeIcon className={cn('fa-icon', className)} icon={faIcon} {...iconProps} data-testid={testId} />;
};

export { FAIcon };
