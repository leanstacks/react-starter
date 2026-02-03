import { ColumnDef, createColumnHelper } from '@tanstack/react-table';

import { BaseComponentProps } from 'common/utils/types';
import { ComponentProperty } from '../model/components';
import Table from 'common/components/Table/Table';
import CodeSnippet from 'common/components/Text/CodeSnippet';
import Heading from 'common/components/Text/Heading';
import Link from 'common/components/Link/Link';

/**
 * Example type for the data used in the table.
 */
type Pet = {
  id: number;
  name: string;
  species: string;
  age: number;
  owner: string;
};

/**
 * The `TableComponents` component renders a set of examples illustrating
 * the use of the `Table` component.
 */
const TableComponents = ({ className, testId = 'components-table' }: BaseComponentProps): JSX.Element => {
  const data: ComponentProperty[] = [
    {
      name: 'className',
      description: 'Optional. Additional CSS class names.',
    },
    {
      name: 'columns',
      description: 'Required. An array of column definitions.',
    },
    {
      name: 'data',
      description: 'Required. An array of data objects.',
    },
    {
      name: 'testId',
      description: 'Optional. Identifier for testing.',
    },
  ];
  const columnHelper = createColumnHelper<ComponentProperty>();
  const columns = [
    columnHelper.accessor('name', {
      cell: (info) => <span className="font-mono text-sky-700 dark:text-sky-500">{info.getValue()}</span>,
      header: () => 'Name',
    }),
    columnHelper.accessor('description', {
      cell: (info) => info.renderValue(),
      header: () => 'Description',
    }),
  ] as ColumnDef<ComponentProperty>[];

  /* setup for examples */
  const petData: Pet[] = [
    { id: 1, name: 'Fluffy', species: 'Cat', age: 3, owner: 'Alice' },
    { id: 2, name: 'Fido', species: 'Dog', age: 5, owner: 'Bob' },
    { id: 3, name: 'Goldie', species: 'Fish', age: 1, owner: 'Charlie' },
    { id: 4, name: 'Tweety', species: 'Bird', age: 2, owner: 'Diana' },
    { id: 5, name: 'Bunny', species: 'Rabbit', age: 4, owner: 'Eve' },
  ];
  const petColumns: ColumnDef<Pet>[] = [
    { header: 'ID', accessorKey: 'id' },
    { header: 'Name', accessorKey: 'name' },
    { header: 'Species', accessorKey: 'species' },
    { header: 'Age', accessorKey: 'age' },
    { header: 'Owner', accessorKey: 'owner' },
  ];
  // Using createColumnHelper to create column definitions
  const petColumnHelper = createColumnHelper<Pet>();
  const petColumnsWithHelper = [
    petColumnHelper.accessor('id', {
      cell: (info) => <span className="font-mono text-sky-700 dark:text-sky-500">{info.getValue()}</span>,
      header: () => 'ID',
    }),
    petColumnHelper.accessor('name', {
      cell: (info) => info.renderValue(),
      header: (info) => <span className="capitalize">{info.column.id}</span>,
    }),
    petColumnHelper.accessor('species', {
      cell: (info) => info.renderValue(),
      header: () => 'Species',
    }),
    petColumnHelper.accessor('age', {
      cell: (info) => info.renderValue(),
      header: () => 'Age',
    }),
    petColumnHelper.accessor('owner', {
      cell: (info) => info.renderValue(),
      header: () => 'Owner',
    }),
  ] as ColumnDef<Pet>[];

  return (
    <section className={className} data-testid={testId}>
      <Heading level={2} className="mb-4">
        Table Component
      </Heading>

      <div className="my-8">
        <div className="mb-4">
          The <span className="font-mono font-bold">Table</span> component uses the TanStack Table library to render a
          table. The table is created using the <span className="font-mono font-bold">columns</span> and{' '}
          <span className="font-mono font-bold">data</span> properties. The table is responsive and will adjust to the
          size of the container. The table is styled using Tailwind CSS.
        </div>

        <div className="mb-4">
          Begin with a data type that describes the data to be displayed in the table. The data type should include the
          properties that will be displayed in the table.
        </div>

        <CodeSnippet
          className="mb-4"
          code={`type Pet = {
  id: number;
  name: string;
  species: string;
  age: number;
  owner: string;
};`}
        />

        <div className="mb-4">
          Create the column definitions. Basic column definitions may be created with a simple array. More advanced
          column definitions may be created using the <span className="font-mono font-bold">createColumnHelper</span>{' '}
          function. The column definitions should include the properties that will be displayed in the table. The column
          definitions should also include the <span className="font-mono font-bold">accessorKey</span> property, which
          is used to access the data in the data object. Learn more about the column definitions in the official{' '}
          <Link to="https://tanstack.com/table/latest/docs/guide/column-defs" target="_blank_">
            documentation
          </Link>
          .
        </div>

        <CodeSnippet
          className="mb-4"
          code={`const petColumns = [
  { header: 'ID', accessorKey: 'id' },
  { header: 'Name', accessorKey: 'name' },
  { header: 'Species', accessorKey: 'species' },
  { header: 'Age', accessorKey: 'age' },
  { header: 'Owner', accessorKey: 'owner' },
];`}
        />

        <div className="my-8">
          <Heading level={3} className="mb-2">
            Properties
          </Heading>
          <Table<ComponentProperty> data={data} columns={columns} />
        </div>

        <Heading level={3} className="mb-2">
          Examples
        </Heading>

        <Heading level={4} className="my-2">
          Basic
        </Heading>
        <div className="mb-4 opacity-85">
          This is the most basic example of the <span className="font-mono font-bold">Table</span> component. The table
          is created using the <span className="font-mono font-bold">columns</span> and{' '}
          <span className="font-mono font-bold">data</span> properties. The table is responsive and will adjust to the
          size of the container. The table is styled using Tailwind CSS.
        </div>
        <div className="my-8">
          <div className="mb-2 flex flex-col place-content-center rounded-sm border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
            {/* Example */}
            <Table<Pet> data={petData} columns={petColumns} />
          </div>
          <CodeSnippet className="my-2" code={`<Table<Pet> data={petData} columns={petColumns} />`} />
        </div>

        <Heading level={4} className="my-2">
          Column Helper
        </Heading>
        <div className="mb-4 opacity-85">
          Column definitions are plain objects. A column helper, when created with the data type definition, returns a
          utility that allows you to create column definitions in a type-safe manner. Learn more about the column helper
          functions in the official{' '}
          <Link to="https://tanstack.com/table/latest/docs/guide/column-defs#column-helpers" target="_blank_">
            documentation
          </Link>
          .
        </div>
        <div className="my-8">
          <div className="mb-2 flex flex-col place-content-center rounded-sm border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
            {/* Example */}
            <Table<Pet> data={petData} columns={petColumnsWithHelper} />
          </div>
          <CodeSnippet
            className="my-2"
            code={`const petColumnHelper = createColumnHelper<Pet>();
const petColumnsWithHelper = [
  petColumnHelper.accessor('id', {
    cell: (info) => (
      <span className="font-mono text-sky-700 dark:text-sky-500">{info.getValue()}</span>
    ),
    header: () => 'ID',
  }),
  petColumnHelper.accessor('name', {
    cell: (info) => info.renderValue(),
    header: (info) => <span className="capitalize">{info.column.id}</span>,
  }),
  petColumnHelper.accessor('species', {
    cell: (info) => info.renderValue(),
    header: () => 'Species',
  }),
  petColumnHelper.accessor('age', {
    cell: (info) => info.renderValue(),
    header: () => 'Age',
  }),
  petColumnHelper.accessor('owner', {
    cell: (info) => info.renderValue(),
    header: () => 'Owner',
  }),
] as ColumnDef<Pet>[];`}
          />
          <CodeSnippet className="my-2" code={`<Table<Pet> data={petData} columns={petColumnsWithHelper} />`} />
        </div>
      </div>
    </section>
  );
};

export default TableComponents;
