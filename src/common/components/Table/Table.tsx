import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';

import { cn } from 'common/utils/css';
import { BaseComponentProps } from 'common/utils/types';

/**
 * Properties for the `Table` React component.
 * @template TData - The type of the table data object.
 * @param {ColumnDef<TData>[]} columns - An array of `ColumnDef`, column definition, objects.
 * @param {TData[]} data - An array of data objects, of type `TData`,
 * which are used to populate the rows of the table.
 * @see {@link BaseComponentProps}
 */
export interface TableProps<TData = unknown> extends BaseComponentProps {
  columns: ColumnDef<TData>[];
  data: TData[];
}

/**
 * The `Table` component renders a `table` element using the column definitions
 * and data supplied in the properties.
 * This component is built using the `@tanstack/react-table` library.
 * It provides a simple and flexible way to display tabular data in a React application.
 */
const Table = <TData,>({ className, columns, data, testId = 'table' }: TableProps<TData>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table className={cn('w-full border-collapse text-left text-sm', className)} data-testid={testId}>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id} className="border-b border-neutral-400/25 py-2 pr-2 font-semibold">
                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody className="align-baseline">
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className="border-t border-neutral-400/10 py-2 pr-2">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
      <tfoot>
        {table.getFooterGroups().map((footerGroup) => (
          <tr key={footerGroup.id}>
            {footerGroup.headers.map((header) => (
              <th key={header.id} className="border-t border-neutral-400/10 py-2 pr-2 font-semibold">
                {header.isPlaceholder ? null : flexRender(header.column.columnDef.footer, header.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </tfoot>
    </table>
  );
};

export default Table;
