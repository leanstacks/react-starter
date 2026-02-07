import { ColumnDef, createColumnHelper } from '@tanstack/react-table';

import { BaseComponentProps } from 'common/utils/types';
import { ComponentProperty } from '../model/components';
import Table from 'common/components/Table/Table';
import CodeSnippet from 'common/components/Text/CodeSnippet';
import Heading from 'common/components/Text/Heading';
import Skeleton from 'common/components/Loader/Skeleton';

/**
 * The `SkeletonComponents` component renders a set of examples illustrating
 * the use of the `Skeleton` component.
 */
const SelectComponents = ({ className, testId = 'components-skeleton' }: BaseComponentProps) => {
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
        Skeleton Component
      </Heading>

      <div className="my-8">
        <div className="mb-4">
          The <span className="font-mono font-bold">Skeleton</span> component displays an animated loader which pulses
          faintly. The skeleton component is typically used when initially loading data asynchronously.
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
        <div className="mb-4 opacity-85">This is the most basic use of the Skeleton component.</div>
        <div className="my-8">
          <div className="mb-2 flex flex-col place-content-center rounded-sm border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
            {/* Example */}
            <Skeleton className="h-5" />
          </div>
          <CodeSnippet className="my-2" language="tsx">{`<Skeleton className="h-5" />`}</CodeSnippet>
        </div>

        <Heading level={4} className="my-2">
          Dimensions
        </Heading>
        <div className="mb-4 opacity-85">Use Tailwind classes to adjust the dimensions of the component.</div>
        <div className="my-8">
          <div className="mb-2 flex flex-col place-content-center rounded-sm border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
            {/* Example */}
            <Skeleton className="mb-2 h-1 w-20" />
            <Skeleton className="mb-2 h-2 w-30" />
            <Skeleton className="mb-2 h-4 w-40" />
            <Skeleton className="mb-2 h-8 w-50" />
            <Skeleton className="mb-2 h-16 w-60" />
          </div>
          <CodeSnippet className="my-2" language="tsx">
            {`<>
  <Skeleton className="mb-2 h-1 w-20" />
  <Skeleton className="mb-2 h-2 w-30" />
  <Skeleton className="mb-2 h-4 w-40" />
  <Skeleton className="mb-2 h-8 w-50" />
  <Skeleton className="mb-2 h-16 w-60" />
</>`}
          </CodeSnippet>
        </div>

        <Heading level={4} className="my-2">
          Colors
        </Heading>
        <div className="mb-4 opacity-85">Use Tailwind classes to adjust the colors of the component.</div>
        <div className="my-8">
          <div className="mb-2 flex flex-col place-content-center rounded-sm border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
            {/* Example */}
            <Skeleton className="mb-2 h-4 bg-slate-100! dark:bg-slate-700!" />
            <Skeleton className="mb-2 h-4 bg-sky-100! dark:bg-sky-950!" />
            <Skeleton className="mb-2 h-4 bg-fuchsia-100! dark:bg-fuchsia-950!" />
            <Skeleton className="mb-2 h-4 bg-lime-100! dark:bg-lime-950!" />
            <Skeleton className="mb-2 h-4 bg-pink-100! dark:bg-pink-950!" />
          </div>
          <CodeSnippet className="my-2" language="tsx">
            {`<>
  <Skeleton className="mb-2 h-4 bg-slate-100! dark:bg-slate-700!" />
  <Skeleton className="mb-2 h-4 bg-sky-100! dark:bg-sky-950!" />
  <Skeleton className="mb-2 h-4 bg-fuchsia-100! dark:bg-fuchsia-950!" />
  <Skeleton className="mb-2 h-4 bg-lime-100! dark:bg-lime-950!" />
  <Skeleton className="mb-2 h-4 bg-pink-100! dark:bg-pink-950!" />
</>`}
          </CodeSnippet>
        </div>

        <Heading level={4} className="my-2">
          Composition
        </Heading>
        <div className="mb-4 opacity-85">
          Combine multiple Skeleton components to create more complex shapes that represent the layout of the component
          being loaded.
        </div>
        <div className="my-8">
          <div className="mb-2 flex flex-col place-content-center rounded-sm border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
            {/* Example */}
            <div className="flex items-center gap-4 rounded-sm border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
              <Skeleton className="size-16 rounded-full" />
              <div className="flex grow flex-col gap-2">
                <Skeleton className="h-6 max-w-80" />
                <Skeleton className="h-4" />
                <Skeleton className="h-4" />
              </div>
            </div>
          </div>
          <CodeSnippet className="my-2" language="tsx">
            {`<div className="flex items-center gap-4 rounded-sm border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
  <Skeleton className="size-16 rounded-full" />
  <div className="flex grow flex-col gap-2">
    <Skeleton className="h-6 max-w-80" />
    <Skeleton className="h-4" />
    <Skeleton className="h-4" />
  </div>
</div>`}
          </CodeSnippet>
        </div>
      </div>
    </section>
  );
};

export default SelectComponents;
