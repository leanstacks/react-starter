import { Link } from 'react-router-dom';

import { PropsWithTestId } from 'common/utils/types';
import { useAuth } from 'common/hooks/useAuth';
import logo from 'assets/img/logo.png';
import ThemeToggle from 'common/components/Button/ThemeToggle';
import AppMenu from './AppMenu';
import MenuButton from 'common/components/Menu/MenuButton';
import LanguageToggle from 'common/components/Button/LanguageToggle';

/**
 * Properties for the `Header` component.
 * @see {@link PropsWithTestId}
 */
export interface HeaderProps extends PropsWithTestId {}

/**
 * The `Header` React component renders a top navigation bar for pages.
 * @param {HeaderProps} [props] - Component properties, `HeaderProps`.
 * @see {@link HeaderProps}
 */
const Header = ({ testId = 'header' }: HeaderProps) => {
  const { isAuthenticated } = useAuth();

  return (
    <header
      className="border-opacity-30 dark:border-opacity-50 flex h-16 items-center justify-between border-b border-b-neutral-500 bg-neutral-100 px-4 dark:bg-neutral-900"
      data-testid={testId}
    >
      <div className="flex items-center">
        <Link to={isAuthenticated ? '/app/tasks' : '/'}>
          <img src={logo} alt="Logo" height="32" width="32" />
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <LanguageToggle />
        <ThemeToggle />
        <MenuButton Menu={AppMenu} />
      </div>
    </header>
  );
};

export default Header;
