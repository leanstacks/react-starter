import { Moon, Sun } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { Tooltip, TooltipContent, TooltipTrigger } from '@react-starter/shared/components/shadcn/tooltip';
import { Button } from '@react-starter/shared/components/shadcn/button';

import { useSetSettings } from '@/common/api/useSetSettings';
import { useSettings } from '@/common/hooks/useSettings';

/**
 * The `ThemeToggle` React component renders a `Button` which allows users
 * to toggle between light and dark themes.
 * @param {PropsWithClassName} [props] - Component properties, `PropsWithClassName`.
 */
export const ThemeToggle = ({ className }: Pick<React.ComponentProps<typeof Button>, 'className'>) => {
  const { t } = useTranslation();
  const settings = useSettings();
  const { mutate: setSettings } = useSetSettings();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        {settings?.theme === 'light' ? (
          <Button
            variant="outline"
            size="icon"
            className={className}
            aria-label={t('theme.switch-dark')}
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
            aria-label={t('theme.switch-light')}
            onClick={() => setSettings({ theme: 'light' })}
            data-testid="button-theme-light"
          >
            <Sun data-testid="icon-light-mode" />
          </Button>
        )}
      </TooltipTrigger>
      <TooltipContent>{settings?.theme === 'light' ? t('theme.switch-dark') : t('theme.switch-light')}</TooltipContent>
    </Tooltip>
  );
};
