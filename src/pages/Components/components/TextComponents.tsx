import { ColumnDef, createColumnHelper } from '@tanstack/react-table';

import { BaseComponentProps } from 'common/utils/types';
import CodeSnippet from 'common/components/Text/CodeSnippet';
import { ComponentProperty } from '../model/components';
import Table from 'common/components/Table/Table';
import Heading from 'common/components/Text/Heading';
import Text from 'common/components/Text/Text';

/**
 * The `TextComponents` React component renders a set of examples illustrating
 * the use of the text family of components.
 */
const TextComponents = ({ className, testId = 'components-text' }: BaseComponentProps) => {
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
    {
      name: 'variant',
      description: 'Optional. Applies default styling. Default: body copy',
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
      <div className="mb-16">
        <Heading level={2} className="mb-4">
          Text Component
        </Heading>

        <div className="my-8">
          The <span className="font-mono font-bold">Text</span> component displays styled text based upon the provided
          `variant`.
        </div>

        <div className="my-8">
          <Heading level={3} className="mb-2">
            Properties
          </Heading>
          <Table<ComponentProperty> data={data} columns={columns} />
        </div>

        <Heading level={3}>Examples</Heading>
        <div className="my-8">
          <div className="mb-2 flex place-content-center rounded-sm border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
            <Text variant="danger">Danger! Something bad has happened.</Text>
          </div>
          <CodeSnippet
            className="my-2"
            language="tsx"
          >{`<Text variant='danger'>Danger! Something bad has happened.</Text>`}</CodeSnippet>
        </div>

        <div className="my-8">
          <div className="mb-2 flex place-content-center rounded-sm border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
            <Text variant="warning">Warning! Be sure to read this first.</Text>
          </div>
          <CodeSnippet
            className="my-2"
            language="tsx"
          >{`<Text variant='warning'>Warning! Be sure to read this first.</Text>`}</CodeSnippet>
        </div>

        <div className="my-8">
          <div className="mb-2 flex place-content-center rounded-sm border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
            <Text variant="info">This is some information to be highlighted.</Text>
          </div>
          <CodeSnippet
            className="my-2"
            language="tsx"
          >{`<Text variant="info">This is some information to be highlighted.</Text>`}</CodeSnippet>
        </div>
      </div>
    </section>
  );
};

export default TextComponents;
