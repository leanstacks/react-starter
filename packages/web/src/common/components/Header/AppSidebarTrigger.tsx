import { Menu } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { cn } from '@react-starter/shared/utils/css';
import { useSidebar } from '@react-starter/shared/components/shadcn/sidebar';
import { Button } from '@react-starter/shared/components/shadcn/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@react-starter/shared/components/shadcn/tooltip';

/**
 * The `AppSidebarTrigger` component renders a button that toggles the sidebar when clicked. A custom implementation
 * of the shadcn SidebarTrigger component to fit the application's design requirements.
 * @param props The props passed to the `AppSidebarTrigger` component, extending the `Button` component props.
 * @returns The `AppSidebarTrigger` component, which is a button that toggles the sidebar when clicked.
 */
export const AppSidebarTrigger = ({ className, onClick, ...props }: React.ComponentProps<typeof Button>) => {
  const { open, toggleSidebar } = useSidebar();
  const { t } = useTranslation();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          data-sidebar="trigger"
          data-slot="sidebar-trigger"
          variant="outline"
          size="icon"
          className={cn('cursor-pointer', className)}
          onClick={(event) => {
            onClick?.(event);
            toggleSidebar();
          }}
          {...props}
        >
          <Menu />
          <span className="sr-only">{open ? t('sidebar.toggle-close') : t('sidebar.toggle-open')}</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>{open ? t('sidebar.toggle-close') : t('sidebar.toggle-open')}</TooltipContent>
    </Tooltip>
  );
};
