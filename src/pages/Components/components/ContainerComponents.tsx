import { PropsWithChildren } from 'react';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';

import { BaseComponentProps } from 'common/utils/types';
import { ComponentProperty } from '../model/components';
import Table from 'common/components/Table/Table';
import CodeSnippet from 'common/components/Text/CodeSnippet';
import Heading from 'common/components/Text/Heading';
import Container from 'common/components/Content/Container';

/**
 * The `ContainerComponents` component renders a set of examples illustrating
 * the use of the `Container` component.
 */
const ContainerComponents = ({ className, testId = 'components-container' }: BaseComponentProps) => {
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
      name: 'size',
      description: 'Optional. The container maximum width.',
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
        Container Component
      </Heading>

      <div className="my-8">
        <div className="mb-4">
          The <span className="font-mono font-bold">Container</span> component renders a block which fixes the maximum
          width of content to a breakpoint and centers the content within the viewport. By default, a Container sets the
          maximum width of the content to the minimum width of the current breakpoint.
        </div>
        <div className="mb-4">Use the "size" property to specify a fixed maximum width for all viewport sizes.</div>
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
          Default
        </Heading>
        <div className="my-8">
          <div className="mb-2 flex place-content-center rounded-sm border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
            {/* Example */}
            <Container>
              <Block>Default</Block>
            </Container>
          </div>
          <CodeSnippet
            className="my-2"
            code={`<Container>
  <Block>Default</Block>
</Container>`}
          />
        </div>

        <Heading level={4} className="mb-2">
          Small
        </Heading>
        <div className="my-8">
          <div className="mb-2 flex place-content-center rounded-sm border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
            {/* Example */}
            <Container size="sm">
              <Block>Max Width 640px</Block>
            </Container>
          </div>
          <CodeSnippet
            className="my-2"
            code={`<Container size="sm">
  <Block>Max Width 640px</Block>
</Container`}
          />
        </div>

        <Heading level={4} className="mb-2">
          Medium
        </Heading>
        <div className="my-8">
          <div className="mb-2 flex place-content-center rounded-sm border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
            {/* Example */}
            <Container size="md">
              <Block>Max Width 768px</Block>
            </Container>
          </div>
          <CodeSnippet
            className="my-2"
            code={`<Container size="md">
  <Block>Max Width 768px</Block>
</Container`}
          />
        </div>

        <Heading level={4} className="mb-2">
          Large
        </Heading>
        <div className="my-8">
          <div className="mb-2 flex place-content-center rounded-sm border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
            {/* Example */}
            <Container size="lg">
              <Block>Max Width 1024px</Block>
            </Container>
          </div>
          <CodeSnippet
            className="my-2"
            code={`<Container size="lg">
  <Block>Max Width 1024px</Block>
</Container`}
          />
        </div>

        <Heading level={4} className="mb-2">
          Extra Large
        </Heading>
        <div className="my-8">
          <div className="mb-2 flex place-content-center rounded-sm border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
            {/* Example */}
            <Container size="xl">
              <Block>Max Width 1280px</Block>
            </Container>
          </div>
          <CodeSnippet
            className="my-2"
            code={`<Container size="xl">
  <Block>Max Width 1280px</Block>
</Container`}
          />
        </div>

        <Heading level={4} className="mb-2">
          2XL
        </Heading>
        <div className="my-8">
          <div className="mb-2 flex place-content-center rounded-sm border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
            {/* Example */}
            <Container size="2xl">
              <Block>Max Width 1536px</Block>
            </Container>
          </div>
          <CodeSnippet
            className="my-2"
            code={`<Container size="2xl">
  <Block>Max Width 1536px</Block>
</Container`}
          />
        </div>
      </div>
    </section>
  );
};

export default ContainerComponents;
