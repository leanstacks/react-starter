import { PropsWithClassName } from '@/common/utils/types';
import { useSetSettings } from '@/common/api/useSetSettings';
import { useSettings } from '@/common/hooks/useSettings';
import Button from '@react-starter/shared/components/Button/Button.js';
import FAIcon from '@/common/components/Icon/FAIcon';

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
          variant="text"
          size="icon"
          className={className}
          title="Dark Mode"
          onClick={() => setSettings({ theme: 'dark' })}
          testId="button-theme-dark"
        >
          <FAIcon icon="moon" size="lg" testId="icon-dark-mode" />
        </Button>
      ) : (
        <Button
          variant="text"
          size="icon"
          className={className}
          title="Light Mode"
          onClick={() => setSettings({ theme: 'light' })}
          testId="button-theme-light"
        >
          <FAIcon icon="sun" size="lg" testId="icon-light-mode" />
        </Button>
      )}
    </>
  );
};

export default ThemeToggle;
