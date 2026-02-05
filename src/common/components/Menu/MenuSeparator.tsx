import { cn } from 'common/utils/css';
import { BaseComponentProps } from 'common/utils/types';

/**
 * Properties for the `MenuSeparator` component.
 * @see {@link BaseComponentProps}
 */
export interface MenuSeparatorProps extends BaseComponentProps {}

/**
 * The `MenuSeparator` component renders a separator to deliniate the boundary
 * between sections of a `Menu`.
 * @param {MenuSeparatorProps} props - Component properties, `MenuSeparatorProps`.
 */
const MenuSeparator = ({ className, testId = 'menu-separator' }: MenuSeparatorProps) => {
  return <div className={cn('my-2 border-t border-neutral-500', className)} data-testid={testId} />;
};

export default MenuSeparator;
