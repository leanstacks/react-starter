import { cn } from 'common/utils/css';
import { BaseComponentProps } from 'common/utils/types';

/**
 * Properties for the `Divider` component.
 */
export interface DividerProps extends BaseComponentProps {}

/**
 * The `Divider` component renders a horizontal line which visually separates
 * content.
 */
const Divider = ({ className, testId = 'divider' }: DividerProps) => {
  return <div className={cn('h-px bg-neutral-500/50', className)} data-testid={testId} />;
};

export default Divider;
