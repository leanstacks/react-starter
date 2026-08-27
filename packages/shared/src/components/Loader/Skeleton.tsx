import { cn } from '@react-starter/shared/utils/css';
import { BaseComponentProps } from '@react-starter/shared/types/components';

/**
 * The `Skeleton` component renders an animated loader which pulses
 * faintly. Typically used when initially loading some data asynchronously.
 */
const Skeleton = ({ className, testId = 'skeleton' }: BaseComponentProps) => {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-neutral-200 dark:bg-neutral-700', className)}
      data-testid={testId}
    />
  );
};

export default Skeleton;
