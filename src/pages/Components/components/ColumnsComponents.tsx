import { PropsWithChildren } from 'react';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';

import { BaseComponentProps } from 'common/utils/types';
import { ComponentProperty } from '../model/components';
import Table from 'common/components/Table/Table';
import CodeSnippet from 'common/components/Text/CodeSnippet';
import Heading from 'common/components/Text/Heading';
import Columns from 'common/components/Content/Columns';

/**
 * The `ColumnsComponents` component renders a set of examples illustrating
 * the use of the `Columns` component.
 */
const ColumnsComponents = ({ className, testId = 'components-columns' }: BaseComponentProps) => {
  const data: ComponentProperty[] = [
    {
      name: 'children',
      description: 'The content to be displayed.',
    },
    {
      name: 'className',
      description: 'Optional. Additional CSS class names.',
    },
    {
      name: 'gap',
      description: 'Optional. The amount of space between columns.',
    },
    {
      name: 'layout',
      description: 'Optional. The column configuration.',
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

  const Block = ({ children }: PropsWithChildren) => (
    <div className="flex h-full min-h-24 items-center justify-center bg-blue-500 font-bold text-white">{children}</div>
  );

  return (
    <section className={className} data-testid={testId}>
      <Heading level={2} className="mb-4">
        Columns Component
      </Heading>

      <div className="my-8">
        <div>
          The <span className="font-mono font-bold">Columns</span> component renders a responsive grid column layout.
          Use the "layout" property to specify the number of columns and their relative widths. Use the "gap" property
          to specify the spacing between columns.
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

        <Heading level={4} className="mb-2">
          Default - Two Columns
        </Heading>
        <div className="my-8">
          <div className="mb-2 flex place-content-center rounded-sm border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
            {/* Example */}
            <Columns className="w-full">
              <Columns.Column>
                <Block>1</Block>
              </Columns.Column>
              <Columns.Column>
                <Block>2</Block>
              </Columns.Column>
            </Columns>
          </div>
          <CodeSnippet
            className="my-2"
            code={`<Columns className="w-full">
  <Columns.Column>
    <Block>1</Block>
  </Columns.Column>
  <Columns.Column>
    <Block>2</Block>
  </Columns.Column>
</Columns>`}
          />
        </div>

        <Heading level={4} className="mb-2">
          Small Left Column
        </Heading>
        <div className="my-8">
          <div className="mb-2 flex place-content-center rounded-sm border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
            {/* Example */}
            <Columns layout="1-3" className="w-full">
              <Columns.Column>
                <Block>1</Block>
              </Columns.Column>
              <Columns.Column>
                <Block>2</Block>
              </Columns.Column>
            </Columns>
          </div>
          <CodeSnippet
            className="my-2"
            code={`<Columns layout="1-3" className="w-full">
  <Columns.Column>
    <Block>1</Block>
  </Columns.Column>
  <Columns.Column>
    <Block>2</Block>
  </Columns.Column>
</Columns>`}
          />
        </div>

        <Heading level={4} className="mb-2">
          Small Right Column
        </Heading>
        <div className="my-8">
          <div className="mb-2 flex place-content-center rounded-sm border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
            {/* Example */}
            <Columns layout="3-1" className="w-full">
              <Columns.Column>
                <Block>1</Block>
              </Columns.Column>
              <Columns.Column>
                <Block>2</Block>
              </Columns.Column>
            </Columns>
          </div>
          <CodeSnippet
            className="my-2"
            code={`<Columns layout="3-1" className="w-full">
  <Columns.Column>
    <Block>1</Block>
  </Columns.Column>
  <Columns.Column>
    <Block>2</Block>
  </Columns.Column>
</Columns>`}
          />
        </div>

        <Heading level={4} className="mb-2">
          Three Columns
        </Heading>
        <div className="my-8">
          <div className="mb-2 flex place-content-center rounded-sm border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
            {/* Example */}
            <Columns layout="1-1-1" className="w-full">
              <Columns.Column>
                <Block>1</Block>
              </Columns.Column>
              <Columns.Column>
                <Block>2</Block>
              </Columns.Column>
              <Columns.Column>
                <Block>3</Block>
              </Columns.Column>
            </Columns>
          </div>
          <CodeSnippet
            className="my-2"
            code={`<Columns layout="1-1-1" className="w-full">
  <Columns.Column>
    <Block>1</Block>
  </Columns.Column>
  <Columns.Column>
    <Block>2</Block>
  </Columns.Column>
  <Columns.Column>
    <Block>3</Block>
  </Columns.Column>
</Columns>`}
          />
        </div>

        <Heading level={4} className="mb-2">
          Wide Middle Column
        </Heading>
        <div className="my-8">
          <div className="mb-2 flex place-content-center rounded-sm border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
            {/* Example */}
            <Columns layout="1-2-1" className="w-full">
              <Columns.Column>
                <Block>1</Block>
              </Columns.Column>
              <Columns.Column>
                <Block>2</Block>
              </Columns.Column>
              <Columns.Column>
                <Block>3</Block>
              </Columns.Column>
            </Columns>
          </div>
          <CodeSnippet
            className="my-2"
            code={`<Columns layout="1-2-1" className="w-full">
  <Columns.Column>
    <Block>1</Block>
  </Columns.Column>
  <Columns.Column>
    <Block>2</Block>
  </Columns.Column>
  <Columns.Column>
    <Block>3</Block>
  </Columns.Column>
</Columns>`}
          />
        </div>
      </div>
    </section>
  );
};

export default ColumnsComponents;
