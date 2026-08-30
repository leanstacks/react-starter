import { Outlet } from 'react-router-dom';

import { BaseComponentProps } from '@react-starter/shared/types/components';
import { SidebarInset, SidebarProvider } from '@react-starter/shared/components/shadcn/sidebar';

import { AppSidebar } from '@/common/components/Header/AppSidebar';
import Header from '@/common/components/Header/Header';
import Footer from '@/common/components/Footer/Footer';

/**
 * The `StandardLayout` React component renders the standard page layout. It
 * wraps the content with a `SidebarProvider`, and renders a `Header` and `Footer`
 * and provides an `Outlet` for the router.
 * @param [props] - Component properties, `BaseComponentProps`.
 */
const StandardLayout = ({ className, testId = 'layout-standard' }: BaseComponentProps) => {
  return (
    <div className={className} data-testid={testId}>
      <SidebarProvider defaultOpen={false}>
        <AppSidebar />
        <SidebarInset>
          <Header />
          <main>
            <Outlet />
          </main>
          <Footer />
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};

export default StandardLayout;
