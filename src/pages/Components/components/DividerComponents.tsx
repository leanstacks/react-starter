import { ColumnDef, createColumnHelper } from '@tanstack/react-table';

import { BaseComponentProps } from 'common/utils/types';
import { ComponentProperty } from '../model/components';
import Table from 'common/components/Table/Table';
import CodeSnippet from 'common/components/Text/CodeSnippet';
import Heading from 'common/components/Text/Heading';
import Divider from 'common/components/Divider/Divider';

/**
 * The `DividerComponents` component renders a set of examples illustrating
 * the use of the `Divider` component.
 */
const DividerComponents = ({ className, testId = 'components-divider' }: BaseComponentProps) => {
  const data: ComponentProperty[] = [
    {
      name: 'className',
      description: 'Optional. Additional CSS class names.',
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

  return (
    <section className={className} data-testid={testId}>
      <Heading level={2} className="mb-4">
        Icon Component
      </Heading>

      <div className="my-8">
        <div className="mb-4">
          The <span className="font-mono font-bold">Divider</span> component renders a horizontal line to create visual
          separation of content.
        </div>

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
        <div className="my-8">
          <div className="mb-2 flex flex-col place-content-center rounded-sm border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
            {/* Example */}
            <Divider />
          </div>
          <CodeSnippet className="my-2" code={`<Divider />`} />
        </div>

        <Heading level={4} className="my-2">
          Thickness
        </Heading>
        <div className="my-8">
          <div className="mb-2 flex flex-col place-content-center rounded-sm border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
            {/* Example */}
            <Divider className="my-2" />
            <Divider className="my-2 h-1" />
            <Divider className="my-2 h-2" />
            <Divider className="my-2 h-3" />
            <Divider className="my-2 h-4" />
            <Divider className="my-2 h-6" />
          </div>
          <CodeSnippet
            className="my-2"
            code={`<>
  <Divider className="my-2" />
  <Divider className="my-2 h-1" />
  <Divider className="my-2 h-2" />
  <Divider className="my-2 h-3" />
  <Divider className="my-2 h-4" />
  <Divider className="my-2 h-6" />
</>`}
          />
        </div>

        <Heading level={4} className="my-2">
          Colors
        </Heading>
        <div className="my-8">
          <div className="mb-2 flex flex-col place-content-center rounded-sm border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
            {/* Example */}
            <Divider className="my-2 h-1" />
            <Divider className="my-2 h-1 bg-blue-600" />
            <Divider className="my-2 h-1 bg-indigo-600" />
            <Divider className="my-2 h-1 bg-red-600" />
            <Divider className="my-2 h-1 bg-green-600" />
            <Divider className="my-2 h-1 bg-yellow-600" />
            <Divider className="my-2 h-1 bg-linear-to-r from-cyan-300 to-indigo-700" />
          </div>
          <CodeSnippet
            className="my-2"
            code={`<>
  <Divider className="my-2 h-1" />
  <Divider className="my-2 h-1 bg-blue-600" />
  <Divider className="my-2 h-1 bg-indigo-600" />
  <Divider className="my-2 h-1 bg-red-600" />
  <Divider className="my-2 h-1 bg-green-600" />
  <Divider className="my-2 h-1 bg-yellow-600" />
  <Divider className="my-2 h-1 bg-linear-to-r from-cyan-400 to-pink-600" />
</>`}
          />
        </div>
      </div>
    </section>
  );
};

export default DividerComponents;
