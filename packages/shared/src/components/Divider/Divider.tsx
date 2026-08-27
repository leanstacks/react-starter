import { cn } from '@react-starter/shared/utils/css';
import { BaseComponentProps } from '@react-starter/shared/types/components';

/**
 * The `Divider` component renders a horizontal line which visually separates
 * content.
 */
const Divider = ({ className, testId = 'divider' }: BaseComponentProps) => {
  return <div className={cn('h-px bg-neutral-500/50', className)} data-testid={testId} />;
};

export default Divider;
