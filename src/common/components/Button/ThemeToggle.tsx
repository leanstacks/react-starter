import { PropsWithClassName } from 'common/utils/types';
import { useSetSettings } from 'common/api/useSetSettings';
import { useSettings } from 'common/hooks/useSettings';
import { cn } from 'common/utils/css';
import Button from './Button';
import FAIcon from 'common/components/Icon/FAIcon';

/**
 * Properties for the `ThemeToggle` component.
 */
export interface ThemeToggleProps extends PropsWithClassName {}

/**
 * The `ThemeToggle` React component renders a `Button` which allows users
 * to toggle between light and dark themes.
 * @param {ThemeToggleProps} [props] - Component  properties, `ThemeProps`.
 * @see {@link ThemeToggleProps}
 */
const ThemeToggle = ({ className }: ThemeToggleProps) => {
  const settings = useSettings();
  const { mutate: setSettings } = useSetSettings();

  return (
    <>
      {settings?.theme === 'light' ? (
        <Button
          variant="text"
          size="icon"
          className={cn('text-light-text', className)}
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
          className={cn('text-dark-text', className)}
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
