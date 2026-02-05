import { PropsWithChildren } from 'react';
import { cva, VariantProps } from 'class-variance-authority';

import { BaseComponentProps } from 'common/utils/types';
import { cn } from 'common/utils/css';

/**
 * Define the `Columns` component base and variant styles.
 */
const columnsVariants = cva('grid grid-cols-1', {
  variants: {
    gap: {
      none: 'gap-0',
      sm: 'gap-2',
      md: 'gap-4',
      lg: 'gap-8',
    },
    layout: {
      '1-1': 'md:grid-cols-2',
      '1-3': 'md:grid-cols-4 *:last:md:col-span-3',
      '3-1': 'md:grid-cols-4 *:first:md:col-span-3',
      '1-1-1': 'lg:grid-cols-3',
      '1-2-1': 'lg:grid-cols-4 *:nth-2:md:col-span-2',
    },
  },
  defaultVariants: {
    gap: 'md',
    layout: '1-1',
  },
});

/**
 * Properties for the `Columns` component.
 */
export interface ColumnsProps extends BaseComponentProps, PropsWithChildren, VariantProps<typeof columnsVariants> {}

/**
 * The `Columns` component renders a responsive grid column layout. Use the 
 * `layout` property to specify the number of columns and their relative widths.
 * Use the `gap` property to specify the spacing between columns.
 * 
 * Compose columns using the `Column` inner component.
 * 
 * **Example:**
 * ```
  <Columns layout="1-3" gap="lg" className="my-6">
    <Columns.Column testId="page-menu">
      <MenuNavLink to="appearance" icon="paintbrush" styleActive>
        Appearance
      </MenuNavLink>
    </Columns.Column>
    <Columns.Column testId="page-content">
      <Outlet />
    </Columns.Column>
  </Columns>
 * ```
 */
const Columns = ({ children, className, gap = 'md', layout = '1-1', testId = 'columns' }: ColumnsProps) => {
  return (
    <div className={cn(columnsVariants({ gap, layout, className }))} data-testid={testId}>
      {children}
    </div>
  );
};

/**
 * The `Column` component renders an individual column.
 */
const Column = ({ children, className, testId = 'column' }: BaseComponentProps & PropsWithChildren) => {
  return (
    <div className={cn(className)} data-testid={testId}>
      {children}
    </div>
  );
};
Columns.Column = Column;

export default Columns;
