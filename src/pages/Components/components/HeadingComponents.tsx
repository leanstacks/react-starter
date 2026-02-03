import { ColumnDef, createColumnHelper } from '@tanstack/react-table';

import { BaseComponentProps } from 'common/utils/types';
import CodeSnippet from 'common/components/Text/CodeSnippet';
import { ComponentProperty } from '../model/components';
import Table from 'common/components/Table/Table';
import Heading from 'common/components/Text/Heading';

/**
 * The `HeadingComponents` React component renders a set of examples illustrating
 * the use of the `Heading` component.
 */
const HeadingComponents = ({ className, testId = 'components-heading' }: BaseComponentProps): JSX.Element => {
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
      name: 'level',
      description: 'Optional. The heading level 1 through 6. Default: 2',
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
      <div className="mb-16">
        <Heading level={2} className="mb-4">
          Heading Component
        </Heading>

        <div className="my-8">
          The <span className="font-mono font-bold">Heading</span> component displays blocks of text as HTML heading
          elements.
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
            <Heading level={1}>Heading 1</Heading>
          </div>
          <CodeSnippet className="my-2" code={`<Heading level={1}>Heading 1</Heading>`} />
        </div>

        <div className="my-8">
          <div className="mb-2 flex place-content-center rounded-sm border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
            <Heading level={2}>Heading 2</Heading>
          </div>
          <CodeSnippet className="my-2" code={`<Heading level={2}>Heading 2</Heading>`} />
        </div>

        <div className="my-8">
          <div className="mb-2 flex place-content-center rounded-sm border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
            <Heading level={3}>Heading 3</Heading>
          </div>
          <CodeSnippet className="my-2" code={`<Heading level={3}>Heading 3</Heading>`} />
        </div>

        <div className="my-8">
          <div className="mb-2 flex place-content-center rounded-sm border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
            <Heading level={4}>Heading 4</Heading>
          </div>
          <CodeSnippet className="my-2" code={`<Heading level={4}>Heading 4</Heading>`} />
        </div>

        <div className="my-8">
          <div className="mb-2 flex place-content-center rounded-sm border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
            <Heading level={5}>Heading 5</Heading>
          </div>
          <CodeSnippet className="my-2" code={`<Heading level={5}>Heading 5</Heading>`} />
        </div>

        <div className="my-8">
          <div className="mb-2 flex place-content-center rounded-sm border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
            <Heading level={6}>Heading 6</Heading>
          </div>
          <CodeSnippet className="my-2" code={`<Heading level={6}>Heading 6</Heading>`} />
        </div>
      </div>
    </section>
  );
};

export default HeadingComponents;
