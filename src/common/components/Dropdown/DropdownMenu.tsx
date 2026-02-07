import { createContext, PropsWithChildren, useContext, useState } from 'react';
import noop from 'lodash/noop';

import { BaseComponentProps } from 'common/utils/types';
import { cn } from 'common/utils/css';
import Backdrop from '../Backdrop/Backdrop';
import Divider, { DividerProps } from '../Divider/Divider';

/**
 * Defines the properties of the DropdownMenuContext value.
 */
type DropdownMenuContextValue = {
  isHidden: boolean;
  setIsHidden: (isHidden: boolean) => void;
};

/**
 * The DropdownMenuContext instance.
 */
const DropdownMenuContext = createContext<DropdownMenuContextValue>({
  isHidden: true,
  setIsHidden: noop,
});

/**
 * Properties for the DropdownMenu component.
 */
export interface DropdownMenuProps extends BaseComponentProps, PropsWithChildren {}

/**
 * The `DropdownMenu` component displays a context menu adjacent to the element
 * which triggers the display of the menu.
 * 
 * **Example:**
 * ```
  <DropdownMenu className={className} testId="dropdown-language">
    <DropdownMenu.Trigger>
      <FAIcon icon="language" size="2x" title="Select Language" />
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
 * ```
 */
const DropdownMenu = ({ children, className, testId = 'dropdown-menu' }: DropdownMenuProps) => {
  const [isHidden, setIsHidden] = useState(true);

  return (
    <div className={cn('relative', className)} data-testid={testId}>
      <DropdownMenuContext.Provider value={{ isHidden, setIsHidden }}>{children}</DropdownMenuContext.Provider>
    </div>
  );
};

/**
 * The `Trigger` component wraps the element used to open
 * a DropdownMenu. There should be 1 `Trigger` within a
 * DropdownMenu.
 */
const Trigger = ({ children, className, testId = 'dropdown-menu-trigger' }: BaseComponentProps & PropsWithChildren) => {
  const { isHidden, setIsHidden } = useContext(DropdownMenuContext);

  return (
    <div
      role="button"
      className={cn('cursor-pointer hover:opacity-80', className)}
      onClick={() => setIsHidden(!isHidden)}
      data-testid={testId}
    >
      {children}
    </div>
  );
};
DropdownMenu.Trigger = Trigger;

/**
 * The `Content` component wraps the contents of a DropdownMenu including,
 * headings, menu items, etc.  There should be 1 `Content` within a
 * DropdownMenu.
 */
const Content = ({ children, className, testId = 'dropdown-menu-content' }: BaseComponentProps & PropsWithChildren) => {
  const { isHidden, setIsHidden } = useContext(DropdownMenuContext);

  return (
    <>
      <Backdrop
        className={cn('bg-transparent', { hidden: isHidden })}
        onClick={() => setIsHidden(true)}
        testId={`${testId}-backdrop`}
      />
      <div
        role="menu"
        className={cn(
          'absolute right-0 z-1001 min-w-32 rounded-md border border-neutral-500 bg-white p-1 dark:bg-neutral-800',
          { hidden: isHidden },
          className,
        )}
        data-testid={testId}
      >
        {children}
      </div>
    </>
  );
};
DropdownMenu.Content = Content;

/**
 * Properties for the `Item` component.
 */
interface ItemProps extends BaseComponentProps, PropsWithChildren {
  onClick?: () => void;
}

/**
 * The `Item` component renders a single, clickable menu item within a
 * DropdownMenu.
 */
const Item = ({ children, className, onClick, testId = 'dropdown-menu-item' }: ItemProps) => {
  const { isHidden, setIsHidden } = useContext(DropdownMenuContext);

  const handleClick = () => {
    onClick?.();
    setIsHidden(!isHidden);
  };

  return (
    <div
      role="menuitem"
      className={cn(
        'flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-neutral-500/25',
        className,
      )}
      onClick={handleClick}
      data-testid={testId}
    >
      {children}
    </div>
  );
};
DropdownMenu.Item = Item;

/**
 * The `Heading` component renders a heading within a DropdownMenu. This is
 * useful for describing a group of related menu items.
 */
const Heading = ({ children, className, testId = 'dropdown-menu-heading' }: BaseComponentProps & PropsWithChildren) => {
  return (
    <h5 className={cn('px-2 py-1.5 text-sm font-bold', className)} data-testid={testId}>
      {children}
    </h5>
  );
};
DropdownMenu.Heading = Heading;

/**
 * The `Separator` component renders a horizontal divider within a DropdownMenu.
 * This is useful to organize and separate groups of related menu items.
 */
const Separator = ({ className, testId = 'dropdown-menu-separator' }: DividerProps) => {
  return <Divider className={cn('-mx-1 my-1', className)} testId={testId} />;
};
DropdownMenu.Separator = Separator;

export default DropdownMenu;
