import { Info, LogIn, LogOut, Sliders, UserPlus, ListChecks, Plus } from 'lucide-react';

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
 * The `AppSidebar` component a `SideMenu` which contains application menu
 * items. The `AppSidebar` is typically rendered at small media breakpoints.
 */
export const AppSidebar = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Sidebar side="left" collapsible="offcanvas">
      <SidebarHeader className="flex flex-row items-center p-4">
        <img src={logo} alt="Logo" height="32" width="32" />
        <span className="font-bold">React Starter</span>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem className={cn({ hidden: isAuthenticated })}>
                <SidebarMenuButton asChild>
                  <Link to="/auth/signin">
                    <LogIn />
                    <span>Sign In</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem className={cn({ hidden: isAuthenticated })}>
                <SidebarMenuButton asChild>
                  <Link to="/auth/signin">
                    <UserPlus />
                    <span>Create Account</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem className={cn({ hidden: !isAuthenticated })}>
                <SidebarMenuButton asChild>
                  <Link to="/auth/signout">
                    <LogOut />
                    <span>Sign Out</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem className={cn({ hidden: !isAuthenticated })}>
                <SidebarMenuButton asChild>
                  <Link to="/app/settings">
                    <Sliders />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator className={cn({ hidden: !isAuthenticated })} />
        <SidebarGroup className={cn({ hidden: !isAuthenticated })}>
          <SidebarGroupLabel>My Stuff</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/app/tasks">
                    <ListChecks />
                    <span>Tasks</span>
                  </Link>
                </SidebarMenuButton>
                <SidebarMenuAction asChild>
                  <Link to="/app/tasks/add">
                    <Plus /> <span className="sr-only">Add Task</span>
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
                    <span>About</span>
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
