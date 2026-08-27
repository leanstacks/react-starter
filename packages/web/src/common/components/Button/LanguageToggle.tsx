import { useTranslation } from 'react-i18next';

import { PropsWithClassName } from '@react-starter/shared/types/components';
import { StorageKey } from '@/common/utils/constants';
import storage from '@/common/utils/storage';
import FAIcon from '@react-starter/shared/components/Icon/FAIcon';
import DropdownMenu from '@react-starter/shared/components/Dropdown/DropdownMenu';

/**
 * The `LanguageToggle` component renders a `Dropdown` which allows users
 * to select the language in which they wish to view the application.
 * @param {PropsWithClassName} props - Component properties.
 */
const LanguageToggle = ({ className }: PropsWithClassName) => {
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
    <DropdownMenu className={className} testId="dropdown-language">
      <DropdownMenu.Trigger>
        <FAIcon icon="language" size="lg" title="Select Language" />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Heading>Languages</DropdownMenu.Heading>
        <DropdownMenu.Separator />
        <DropdownMenu.Item onClick={() => setLanguage('en')} testId="dropdown-item-en">
          English
        </DropdownMenu.Item>
        <DropdownMenu.Item onClick={() => setLanguage('fr')} testId="dropdown-item-fr">
          French
        </DropdownMenu.Item>
        <DropdownMenu.Item onClick={() => setLanguage('es')} testId="dropdown-item-es">
          Spanish
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu>
  );
};

export default LanguageToggle;
