import { useTranslation } from 'react-i18next';
import { Languages } from 'lucide-react';

import { StorageKey } from '@/common/utils/constants';
import storage from '@/common/utils/storage';
import {
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
} from '@react-starter/shared/components/shadcn/dropdown-menu';
import { Button } from '@react-starter/shared/components/shadcn/button';

/**
 * The `LanguageToggle` component renders a `Dropdown` which allows users
 * to select the language in which they wish to view the application.
 */
const LanguageToggle = () => {
  const { i18n } = useTranslation();

  /**
   * Set the application-wide langague code used for i18n.
   * @param {string} lng - A langage code, e.g. `en` or `es`.
   */
  const setLanguage = (lng: string) => {
    storage.setItem(StorageKey.Language, lng);
    i18n.changeLanguage(lng);
  };

  return (
    <DropdownMenu data-testid="dropdown-language">
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" title="Select Language" data-testid="button-language-menu-trigger">
          <Languages aria-label="Select Language" data-testid="icon-language" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-32">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Languages</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => setLanguage('en')} data-testid="dropdown-item-en">
            English
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setLanguage('fr')} data-testid="dropdown-item-fr">
            French
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setLanguage('es')} data-testid="dropdown-item-es">
            Spanish
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageToggle;
