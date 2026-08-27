import { cn } from '@react-starter/shared/utils/css';
import { BaseComponentProps } from '@react-starter/shared/types/components';

/**
 * The `MenuSeparator` component renders a separator to delineate the boundary
 * between sections of a `Menu`.
 * @param {BaseComponentProps} props - Component properties, `BaseComponentProps`.
 */
const MenuSeparator = ({ className, testId = 'menu-separator' }: BaseComponentProps) => {
  return <div className={cn('my-2 border-t border-neutral-500', className)} data-testid={testId} />;
};

export default MenuSeparator;
