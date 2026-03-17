import { useEffect } from 'react';

import { BaseComponentProps } from 'common/utils/types';
import { useSettings } from 'common/hooks/useSettings';

/**
 * The `ThemeValue` type defines the possible theme values that can be used in the application.
 * - 'light': Represents the light theme.
 * - 'dark': Represents the dark theme.
 * - 'system': Represents the system theme, which will follow the user's operating system preference.
 */
export type ThemeValue = 'light' | 'dark' | 'system';

/**
 * Properties for the `Theme` component.
 * @see {@link BaseComponentProps}
 */
export interface ThemeProps extends BaseComponentProps {
  defaultTheme?: ThemeValue;
}

/**
 * The `Theme` component uses the user settings (preferences) and renders the CSS for the preferred theme.
 * @param props - Component properties, `ThemeProps`.
 */
const Theme = ({ className, defaultTheme = 'system', testId = 'theme' }: ThemeProps) => {
  const settings = useSettings();
  const theme = settings?.theme || defaultTheme;

  /**
   * The `useEffect` hook applies the appropriate theme class to the root element based on the user's theme preference.
   * It listens for changes to the `theme` variable and updates the root element's class accordingly.
   * If the theme is set to 'system', it detects the system's preferred color scheme and applies either
   * 'light' or 'dark' class to the root element.
   */
  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  return <div className={className} data-testid={testId} />;
};

export default Theme;
