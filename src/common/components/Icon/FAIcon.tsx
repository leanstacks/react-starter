import { ComponentPropsWithoutRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faCircle as faCircleRegular } from '@fortawesome/free-regular-svg-icons';
import {
  faBars,
  faBuilding,
  faCheck,
  faChevronDown,
  faChevronRight,
  faChevronUp,
  faCircle,
  faCircleCheck,
  faCircleDot,
  faCircleExclamation,
  faCircleInfo,
  faCircleNotch,
  faCircleXmark,
  faEllipsis,
  faEllipsisVertical,
  faEnvelope,
  faLanguage,
  faLink,
  faListCheck,
  faMagnifyingGlass,
  faMapLocationDot,
  faMoon,
  faPaintBrush,
  faPencil,
  faPhone,
  faPlus,
  faPuzzlePiece,
  faRightFromBracket,
  faRightToBracket,
  faSliders,
  faSun,
  faToggleOff,
  faToggleOn,
  faTrash,
  faUsers,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';

import { BaseComponentProps } from 'common/utils/types';
import { cn } from 'common/utils/css';

/**
 * A union type of all Font Awesome icon names (without the `fa-` prefix)
 * used in the application.
 */
export type FAIconName =
  | 'bars'
  | 'building'
  | 'check'
  | 'chevronDown'
  | 'chevronRight'
  | 'chevronUp'
  | 'circle'
  | 'circleCheck'
  | 'circleDot'
  | 'circleExclamation'
  | 'circleInfo'
  | 'circleNotch'
  | 'circleRegular'
  | 'circleXmark'
  | 'ellipsis'
  | 'ellipsisVertical'
  | 'envelope'
  | 'language'
  | 'link'
  | 'listCheck'
  | 'magnifyingGlass'
  | 'mapLocationDot'
  | 'moon'
  | 'paintbrush'
  | 'pencil'
  | 'phone'
  | 'plus'
  | 'puzzlePiece'
  | 'rightFromBracket'
  | 'rightToBracket'
  | 'sliders'
  | 'sun'
  | 'toggleOff'
  | 'toggleOn'
  | 'trash'
  | 'users'
  | 'xmark';

/**
 * Properties for the `FAIcon` component.
 * @param {FAIconName} icon - The icon name.
 * @see {@link BaseComponentProps}
 * @see {@link FontAwesomeIcon}
 */
export interface FAIconProps
  extends BaseComponentProps, Omit<ComponentPropsWithoutRef<typeof FontAwesomeIcon>, 'icon'> {
  icon: FAIconName;
}

/**
 * A key/value mapping of every icon used in the application.
 */
const icons: Record<FAIconName, IconProp> = {
  bars: faBars,
  building: faBuilding,
  check: faCheck,
  chevronDown: faChevronDown,
  chevronRight: faChevronRight,
  chevronUp: faChevronUp,
  circleCheck: faCircleCheck,
  circle: faCircle,
  circleDot: faCircleDot,
  circleExclamation: faCircleExclamation,
  circleInfo: faCircleInfo,
  circleNotch: faCircleNotch,
  circleRegular: faCircleRegular,
  circleXmark: faCircleXmark,
  ellipsis: faEllipsis,
  ellipsisVertical: faEllipsisVertical,
  envelope: faEnvelope,
  language: faLanguage,
  link: faLink,
  listCheck: faListCheck,
  magnifyingGlass: faMagnifyingGlass,
  mapLocationDot: faMapLocationDot,
  moon: faMoon,
  paintbrush: faPaintBrush,
  pencil: faPencil,
  phone: faPhone,
  plus: faPlus,
  puzzlePiece: faPuzzlePiece,
  rightFromBracket: faRightFromBracket,
  rightToBracket: faRightToBracket,
  sliders: faSliders,
  sun: faSun,
  toggleOff: faToggleOff,
  toggleOn: faToggleOn,
  trash: faTrash,
  users: faUsers,
  xmark: faXmark,
};

/**
 * The `FAIcon` component renders a Font Awesome icon.
 *
 * Note: Wraps the `FontAwesomeIcon` component.
 * @param param0
 * @returns
 */
const FAIcon = ({ className, icon, testId = 'fa-icon', ...iconProps }: FAIconProps): JSX.Element => {
  const faIcon = icons[icon];

  return <FontAwesomeIcon className={cn('fa-icon', className)} icon={faIcon} {...iconProps} data-testid={testId} />;
};

export default FAIcon;
