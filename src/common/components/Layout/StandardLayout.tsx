import { Outlet } from 'react-router-dom';

import { BaseComponentProps } from 'common/utils/types';
import Header from 'common/components/Header/Header';
import Footer from 'common/components/Footer/Footer';
import Toasts from 'common/components/Toast/Toasts';

/**
 * Properties for the `StandardLayout` component.
 * @see {@link BaseComponentProps}
 */
export interface StandardLayoutProps extends BaseComponentProps {}

/**
 * The `StandardLayout` React component renders the standard page layout. It
 * renders a `Header` and `Footer` and provides an `Outlet` for the router.
 * @param [props] - Component properties, `StandardLayoutProps`.
 */
const StandardLayout = ({ className, testId = 'layout-standard' }: StandardLayoutProps) => {
  return (
    <div className={className} data-testid={testId}>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <Toasts />
    </div>
  );
};

export default StandardLayout;
