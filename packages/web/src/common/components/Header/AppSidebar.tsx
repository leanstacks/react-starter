import { Info, LogIn, LogOut, Sliders, UserPlus, ListChecks, Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { PropsWithTestId } from '@react-starter/shared/types/components';
import { cn } from '@react-starter/shared/utils/css';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from '@react-starter/shared/components/shadcn/sidebar';

import logo from '@/assets/img/logo.png';
import { useAuth } from '@/common/hooks/useAuth';
import { Link } from 'react-router-dom';

/**
 * The `AppSidebar` component is a shadcn `Sidebar` which contains application menu
 * items.
 */
export const AppSidebar = ({ testId = 'app-sidebar' }: PropsWithTestId) => {
  const { isAuthenticated } = useAuth();
  const { t } = useTranslation();

  return (
    <Sidebar side="left" collapsible="offcanvas" data-testid={testId}>
      <SidebarHeader className="flex flex-row items-center p-4">
        <img src={logo} alt="Logo" height="32" width="32" />
        <span className="font-bold">React Starter</span>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{t('sidebar.account')}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem className={cn({ hidden: isAuthenticated })}>
                <SidebarMenuButton asChild>
                  <Link to="/auth/signin">
                    <LogIn />
                    <span>{t('sidebar.sign-in')}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem className={cn({ hidden: isAuthenticated })}>
                <SidebarMenuButton asChild>
                  <Link to="/auth/signin">
                    <UserPlus />
                    <span>{t('sidebar.account-create')}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem className={cn({ hidden: !isAuthenticated })}>
                <SidebarMenuButton asChild>
                  <Link to="/auth/signout" data-testid={`${testId}-sign-out-button`}>
                    <LogOut />
                    <span>{t('sidebar.sign-out')}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem className={cn({ hidden: !isAuthenticated })}>
                <SidebarMenuButton asChild>
                  <Link to="/app/settings">
                    <Sliders />
                    <span>{t('sidebar.settings')}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator className={cn({ hidden: !isAuthenticated })} />
        <SidebarGroup className={cn({ hidden: !isAuthenticated })}>
          <SidebarGroupLabel>{t('sidebar.my-stuff')}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/app/tasks">
                    <ListChecks />
                    <span>{t('sidebar.tasks')}</span>
                  </Link>
                </SidebarMenuButton>
                <SidebarMenuAction asChild>
                  <Link to="/app/tasks/add">
                    <Plus /> <span className="sr-only">{t('sidebar.add-task')}</span>
                  </Link>
                </SidebarMenuAction>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/pub/about">
                    <Info />
                    <span>{t('sidebar.about')}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
};
