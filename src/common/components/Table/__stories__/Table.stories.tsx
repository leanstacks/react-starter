import type { Meta, StoryObj } from '@storybook/react-vite';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';

import Table from '../Table';

const meta = {
  title: 'Common/Table',
  component: Table,
  decorators: [
    (Story) => (
      <div className="w-[640px]">
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    columns: { description: 'An array of `ColumnDef`, column definition, objects.' },
    data: {
      description: 'An array of data objects, of type `TData`, which are used to populate the rows of the table.',
    },
    testId: { description: 'The test identifier.' },
  },
} satisfies Meta<typeof Table>;

export default meta;

type Story = StoryObj<typeof meta>;

// the table data type
type TableData = {
  key: string;
  value: string;
};

// the table column definitions
const columnHelper = createColumnHelper<TableData>();
const simpleTableColumns = [columnHelper.accessor('key', {}), columnHelper.accessor('value', {})];
const decoratedTableColumns = [
  columnHelper.accessor('key', {
    cell: (info) => <span className="font-mono text-blue-600">{info.getValue()}</span>,
    header: () => 'Key',
  }),
  columnHelper.accessor('value', {
    header: () => 'Value',
  }),
] as ColumnDef<TableData>[];

// the data to populate the table
const myTableData: TableData[] = [
  {
    key: 'className',
    value: 'Optional. Additional CSS class names.',
  },
  {
    key: 'testId',
    value: 'Optional. Identifier for testing.',
  },
];

export const Simple: Story = {
  args: {
    // @ts-expect-error Storybook generics
    columns: simpleTableColumns,
    data: myTableData,
  },
  render: ({ columns, data }) => {
    return <Table<TableData> columns={columns as ColumnDef<TableData>[]} data={data as TableData[]} />;
  },
};

export const DecoratedColumns: Story = {
  args: {
    // @ts-expect-error Storybook generics
    columns: decoratedTableColumns,
    data: myTableData,
  },
  render: ({ columns, data }) => {
    return <Table<TableData> columns={columns as ColumnDef<TableData>[]} data={data as TableData[]} />;
  },
};
