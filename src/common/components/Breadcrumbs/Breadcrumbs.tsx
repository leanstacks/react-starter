import { PropsWithChildren } from 'react';

import { BaseComponentProps } from 'common/utils/types';
import { cn } from 'common/utils/css';
import { default as CommonLink, LinkProps as CommonLinkProps } from 'common/components/Link/Link';
import FAIcon, { FAIconProps } from '../Icon/FAIcon';

/**
 * Properties for the `Breadcrumbs` component.
 */
export interface BreadcrumbsProps extends BaseComponentProps, PropsWithChildren {}

/**
 * The `Breadcrumbs` component renders a heirarchy of links as a path to the
 * current route.
 * 
 * **Example:**
 * ```
  <Breadcrumbs>
    <Breadcrumbs.List>
      <Breadcrumbs.Item>
        <Breadcrumbs.Link to="/">Home</Breadcrumbs.Link>
      </Breadcrumbs.Item>
      <Breadcrumbs.Separator />
      <Breadcrumbs.Item>
        <DropdownMenu>
          <DropdownMenu.Trigger>
            <Breadcrumbs.Ellipsis />
          </DropdownMenu.Trigger>
          <DropdownMenu.Content className="left-0">
            <DropdownMenu.Item>Components</DropdownMenu.Item>
            <DropdownMenu.Item>Settings</DropdownMenu.Item>
            <DropdownMenu.Item>Tasks</DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu>
      </Breadcrumbs.Item>
      <Breadcrumbs.Separator />
      <Breadcrumbs.Item>
        <Breadcrumbs.Link to="/app/tasks/97">
          dolorum laboriosam eos qui iure aliquam
        </Breadcrumbs.Link>
      </Breadcrumbs.Item>
      <Breadcrumbs.Separator />
      <Breadcrumbs.Item>
        <Breadcrumbs.Page>Edit</Breadcrumbs.Page>
      </Breadcrumbs.Item>
    </Breadcrumbs.List>
  </Breadcrumbs>
 * ```
 */
const Breadcrumbs = ({ children, className, testId = 'breadcrumbs' }: BreadcrumbsProps) => {
  return (
    <nav className={cn(className)} aria-label="breadcrumbs" data-testid={testId}>
      {children}
    </nav>
  );
};

/**
 * The `List` contains the list of items in the breadcrumbs. It is located immediately
 * within the `Breadcrumbs` component and contains one to many `Item` components.
 */
const List = ({ children, className, testId = 'breadcrumbs-list' }: BaseComponentProps & PropsWithChildren) => {
  return (
    <ol
      className={cn('flex flex-wrap items-center gap-2 text-sm break-words sm:gap-3', className)}
      data-testid={testId}
    >
      {children}
    </ol>
  );
};
Breadcrumbs.List = List;

/**
 * The `Item` represents a single element of the breadcrumbs list. An item typically
 * represents a single element of the path to which a user may navigate.
 *
 * An `Item` may contain any type of child; however, an item typically contains a `Link`,
 * `Page`, or a `DropdownMenu`.
 */
const Item = ({ children, className, testId = 'breadcrumbs-item' }: BaseComponentProps & PropsWithChildren) => {
  return (
    <li className={cn('last:font-bold', className)} data-testid={testId}>
      {children}
    </li>
  );
};
Breadcrumbs.Item = Item;

/**
 * A `Link` represents a navigation link item within breadcrumbs.  A link is
 * a child of an `Item`.  Use the `to` property to specify the relative path for
 * the link.
 */
const Link = ({ children, className, testId = 'breadcrumbs-link', ...props }: CommonLinkProps) => {
  return (
    <CommonLink
      className={cn('text-light-text dark:text-dark-text block max-w-40 truncate', className)}
      data-testid={testId}
      {...props}
    >
      {children}
    </CommonLink>
  );
};
Breadcrumbs.Link = Link;

/**
 * A `Page` represents an item within breadcrumbs with no associated navigation.
 * Use the `Page` as an alternative to the `Link` when the breadcrumb item is
 * not clickable. A `Page` is commonly used for the current page, i.e. the last
 * element in the breadcrumbs.
 */
const Page = ({ children, className, testId = 'breadcrumbs-page' }: BaseComponentProps & PropsWithChildren) => {
  return (
    <span className={cn('block max-w-40 truncate', className)} data-testid={testId}>
      {children}
    </span>
  );
};
Breadcrumbs.Page = Page;

/**
 * The `Separator` component renders an icon which visually separates two
 * breadcrumbs elements.  The default icon is a right chevron.
 */
const Separator = ({
  className,
  icon = 'chevronRight',
  size = 'sm',
  testId = 'breadcrumbs-separator',
  ...iconProps
}: BaseComponentProps & Omit<FAIconProps, 'icon'> & Partial<Pick<FAIconProps, 'icon'>>) => {
  return (
    <li className={cn(className)} data-testid={testId}>
      <FAIcon icon={icon} size={size} className="size-4" {...iconProps} testId={`${testId}-icon`} />
    </li>
  );
};
Breadcrumbs.Separator = Separator;

/**
 * The `Ellipsis` component renders a horizontal ellipsis icon. This is useful when
 * the number of breadcrumbs elements is too great to render all of them. Use the
 * ellipsis to represent breadcrumbs items which have been omitted to shorten the
 * overall breadcrumbs list. Alternatively, use the ellipsis as the trigger for
 * a `DropdownMenu` within the breadcrumbs to allow navigation to those routes
 * which have been omitted for brevity.
 */
const Ellipsis = ({ className, testId = 'breadcrumbs-ellipsis' }: BaseComponentProps) => {
  return (
    <span className={cn('hover:opacity-75', className)} data-testid={testId}>
      <FAIcon icon="ellipsis" className="size-4" />
      <span className="sr-only">More</span>
    </span>
  );
};
Breadcrumbs.Ellipsis = Ellipsis;

export default Breadcrumbs;
