import { Moon, Sun } from 'lucide-react';

import { PropsWithClassName } from '@react-starter/shared/types/components';
import { useSetSettings } from '@/common/api/useSetSettings';
import { useSettings } from '@/common/hooks/useSettings';
import { Button } from '@react-starter/shared/components/shadcn/button';

/**
 * The `ThemeToggle` React component renders a `Button` which allows users
 * to toggle between light and dark themes.
 * @param {PropsWithClassName} [props] - Component properties, `PropsWithClassName`.
 */
const ThemeToggle = ({ className }: PropsWithClassName) => {
  const settings = useSettings();
  const { mutate: setSettings } = useSetSettings();

  return (
    <>
      {settings?.theme === 'light' ? (
        <Button
          variant="outline"
          size="icon"
          className={className}
          title="Dark Mode"
          onClick={() => setSettings({ theme: 'dark' })}
          data-testid="button-theme-dark"
        >
          <Moon data-testid="icon-dark-mode" />
        </Button>
      ) : (
        <Button
          variant="outline"
          size="icon"
          className={className}
          title="Light Mode"
          onClick={() => setSettings({ theme: 'light' })}
          data-testid="button-theme-light"
        >
          <Sun data-testid="icon-light-mode" />
        </Button>
      )}
    </>
  );
};

export default ThemeToggle;
