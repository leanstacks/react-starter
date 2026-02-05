import { PropsWithChildren } from 'react';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';

import { BaseComponentProps } from 'common/utils/types';
import { ComponentProperty } from '../model/components';
import Table from 'common/components/Table/Table';
import CodeSnippet from 'common/components/Text/CodeSnippet';
import Heading from 'common/components/Text/Heading';
import Page from 'common/components/Content/Page';

/**
 * The `PageComponents` component renders a set of examples illustrating
 * the use of the `Page` component.
 */
const PageComponents = ({ className, testId = 'components-page' }: BaseComponentProps) => {
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
    <div className="flex h-full min-h-24 items-center justify-center bg-blue-500 p-4 font-bold text-white">
      {children}
    </div>
  );

  return (
    <section className={className} data-testid={testId}>
      <Heading level={2} className="mb-4">
        Page Component
      </Heading>

      <div className="my-8">
        <div className="mb-4">
          The <span className="font-mono font-bold">Page</span> component renders a responsive, styled wrapper for a
          page of content, ensuring consistent spacing at various breakpoints.
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

        <div className="my-8">
          <div className="mb-2 flex place-content-center rounded-sm border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
            {/* Example */}
            <Page testId="page-example" className="w-full bg-neutral-500/50">
              <Block>A page provides resonsive spacing (grey) for the content (blue).</Block>
            </Page>
          </div>
          <CodeSnippet
            className="my-2"
            code={`<Page testId="page-example" className="bg-neutral-500/50">
  <Block>The page content.</Block>
</Page>`}
          />
        </div>
      </div>
    </section>
  );
};

export default PageComponents;
