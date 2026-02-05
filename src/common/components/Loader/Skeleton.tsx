import { cn } from 'common/utils/css';
import { BaseComponentProps } from 'common/utils/types';

/**
 * Properties for the `Skeleton` component.
 */
export interface SkeletonProps extends BaseComponentProps {}

/**
 * The `Skeleton` component renders an animated loader which pulses
 * faintly. Typically used when initially loading some data asynchronously.
 */
const Skeleton = ({ className, testId = 'skeleton' }: SkeletonProps) => {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-neutral-200 dark:bg-neutral-700', className)}
      data-testid={testId}
    />
  );
};

export default Skeleton;
