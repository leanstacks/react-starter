import { cn } from '@react-starter/shared/utils/css';

/**
 * The `Page` component renders a responsive, styled wrapper for a page of content
 * ensuring consistent spacing at various breakpoints.
 */
const Page = ({ className, ...props }: React.ComponentProps<'div'>) => {
  return <div className={cn('px-2 sm:px-8', className)} {...props} />;
};

export { Page };
