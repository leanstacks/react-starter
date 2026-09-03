import { Link } from 'react-router-dom';

import { PropsWithTestId } from '@react-starter/shared/types/components';
import { ButtonGroup } from '@react-starter/shared/components/shadcn/button-group';

import logo from '@/assets/img/logo.png';
import { useAuth } from '@/common/hooks/useAuth';
import { AppSidebarTrigger } from '@/common/components/Header/AppSidebarTrigger';
import { ThemeToggle } from '@/common/components/Button/ThemeToggle';
import { LanguageToggle } from '@/common/components/Button/LanguageToggle';

/**
 * The `Header` React component renders a top navigation bar for pages.
 * @param {PropsWithTestId} [props] - Component properties.
 */
const Header = ({ testId = 'header' }: PropsWithTestId) => {
  const { isAuthenticated } = useAuth();

  return (
    <header className="flex h-16 items-center justify-between border-b px-4 shadow-xs" data-testid={testId}>
      <div className="flex items-center gap-4">
        <AppSidebarTrigger />
        <Link to={isAuthenticated ? '/app/tasks' : '/'}>
          <img src={logo} alt="Logo" height="32" width="32" />
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <ButtonGroup>
          <ButtonGroup>
            <LanguageToggle />
          </ButtonGroup>
          <ButtonGroup>
            <ThemeToggle />
          </ButtonGroup>
        </ButtonGroup>
      </div>
    </header>
  );
};

export default Header;
