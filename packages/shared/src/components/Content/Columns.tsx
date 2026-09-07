import { PropsWithChildren } from 'react';
import { cva, VariantProps } from 'class-variance-authority';

import { BaseComponentProps } from '@react-starter/shared/types/components';
import { cn } from '@react-starter/shared/utils/css';

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
 * The `Columns` component renders a responsive grid column layout. Use the 
 * `layout` property to specify the number of columns and their relative widths.
 * Use the `gap` property to specify the spacing between columns.
 * 
 * Compose columns using the `Column` inner component.
 * 
 * **Example:**
 * ```
  <Columns layout="1-3" gap="lg" className="my-6" data-testid="columns">
    <Column data-testid="page-menu">
      <MenuNavLink to="appearance" icon="paintbrush" styleActive>
        Appearance
      </MenuNavLink>
    </Column>
    <Column data-testid="page-content">
      <Outlet />
    </Column>
  </Columns>
 * ```
 */
const Columns = ({
  className,
  gap = 'md',
  layout = '1-1',
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof columnsVariants>) => {
  return <div className={cn(columnsVariants({ gap, layout, className }))} {...props} />;
};

/**
 * The `Column` component renders an individual column.
 */
const Column = ({ className, ...props }: BaseComponentProps & PropsWithChildren) => {
  return <div className={cn(className)} {...props} />;
};

export { Columns, Column };
