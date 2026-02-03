import { createContext, PropsWithChildren, useContext, useState } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import noop from 'lodash/noop';

import { cn } from 'common/utils/css';
import { BaseComponentProps } from 'common/utils/types';
import Button from '../Button/Button';

/**
 * Defines the shape of the `TabsContext` value.
 */
type TabsContextValue = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

/**
 * The `TabsContext` instance.
 */
const TabsContext = createContext<TabsContextValue>({
  activeTab: '',
  setActiveTab: noop,
});

/**
 * Properties for the `Tabs` component.
 * @param defaultValue - The default (or initial) active tab.
 */
export interface TabsProps extends BaseComponentProps, PropsWithChildren {
  defaultValue: string;
}

/**
 * The `Tabs` component is used to display tabbed content. Compose tabbed
 * content using: `List`, `Tab`, and `Content` as illustrated in
 * the example.
 *
 * Note: The `defaultValue` property must match the `value` of one of the Tab
 * components.
 *
 * **Example:**
 * ```
 * <Tabs defaultValue="list">
 *   <Tabs.List>
 *     <Tabs.Tab value="list">List</Tab>
 *     <Tabs.Tab value="detail">Detail</Tab>
 *   </Tabs.List>
 *   <Tabs.Content value="list">
 *     <div className="font-bold py-8">I am the LIST tab.</div>
 *   </Tabs.Content>
 *   <Tabs.Content value="detail">
 *     <div className="font-bold py-8">I am the DETAIL tab.</div>
 *   </Tabs.Content>
 * </Tabs>
 * ```
 */
const Tabs = ({ children, className, defaultValue, testId = 'tabs' }: TabsProps): JSX.Element => {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <div className={cn(className)} data-testid={testId}>
      <TabsContext.Provider value={{ activeTab, setActiveTab }}>{children}</TabsContext.Provider>
    </div>
  );
};

/**
 * Defines the `List` component base and variant styles.
 */
const listVariants = cva('flex gap-4 border-b border-b-neutral-500/10', {
  variants: {
    align: {
      start: 'justify-start',
      stretch: '*:grow',
    },
  },
  defaultVariants: { align: 'start' },
});

/**
 * Properties for the `List` component.
 */
interface ListProps extends BaseComponentProps, PropsWithChildren, VariantProps<typeof listVariants> {}

/**
 * The `List` component is a container for one to many `Tab` components. It
 * renders a horizontal bar of clickable tabs.
 */
const List = ({ align = 'start', children, className, testId = 'tabs-list' }: ListProps): JSX.Element => {
  return (
    <div className={cn(listVariants({ align, className }))} data-testid={testId}>
      {children}
    </div>
  );
};
Tabs.List = List;

/**
 * Defines the `Tab` component base and variant styles.
 */
const tabVariants = cva('rounded-none border-0 border-b-2 px-4 text-sm font-bold uppercase', {
  variants: {
    active: {
      false: 'border-transparent',
      true: 'border-blue-300 dark:border-blue-600',
    },
  },
  defaultVariants: {
    active: false,
  },
});

/**
 * Properties for the `Tab` component.
 */
interface TabProps extends BaseComponentProps, PropsWithChildren {
  value: string;
}

/**
 * The `Tab` component renders a clickable tab button which, when clicked,
 * displays the associated tab content.
 *
 * Note: The `Tab` and its associated `TabContent` must have the same `value`
 * property value.
 */
const Tab = ({ children, className, testId = 'tabs-tab', value }: TabProps): JSX.Element => {
  const { activeTab, setActiveTab } = useContext(TabsContext);

  const active = value === activeTab;

  return (
    <Button
      variant="text"
      className={cn(tabVariants({ active, className }))}
      onClick={() => setActiveTab(value)}
      testId={testId}
    >
      {children}
    </Button>
  );
};
Tabs.Tab = Tab;

/**
 * Defines the `Content` component base and variant styles.
 */
const contentVariants = cva('', {
  variants: {
    active: {
      true: 'block',
      false: 'hidden',
    },
  },
  defaultVariants: {
    active: false,
  },
});

/**
 * Properties for the `Content` component.
 */
interface TabContentProps extends BaseComponentProps, PropsWithChildren {
  value: string;
}

/**
 * The `TabContent` component renders the content for a single tab.
 *
 * Note: The `TabContent` and its associated `Tab` must have the same `value`
 * property value.
 */
const Content = ({ children, className, testId = 'tabs-content', value }: TabContentProps): JSX.Element => {
  const { activeTab } = useContext(TabsContext);

  const active = value === activeTab;

  return (
    <div className={cn(contentVariants({ active, className }))} data-testid={testId}>
      {children}
    </div>
  );
};
Tabs.Content = Content;

export default Tabs;
