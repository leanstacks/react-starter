import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { AlertCircleIcon, HeartHandshake } from 'lucide-react';

import { BaseComponentProps } from 'common/utils/types';
import { ComponentProperty } from '../model/components';
import Table from 'common/components/Table/Table';
import CodeSnippet from 'common/components/Text/CodeSnippet';
import Heading from 'common/components/Text/Heading';
import { Alert, AlertDescription, AlertTitle } from 'common/components/shadcn/alert';

/**
 * The `AlertComponents` React component renders a set of examples illustrating
 * the use of the `Alert` component.
 */
const AlertComponents = ({ className, testId = 'components-alert' }: BaseComponentProps) => {
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
      description: 'Optional. Style variant. Default: info',
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
        Alert Component
      </Heading>

      <div className="my-8">
        The <span className="font-mono font-bold">Alert</span> component displays a styled message block. Alerts are a
        callout to get the user's attention. Compose an Alert using combinations of: <code>Icon</code>,{' '}
        <code>Title</code>, and <code>Description</code>.
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
          <Alert>
            <HeartHandshake />
            <AlertTitle>Tip</AlertTitle>
            <AlertDescription>
              Use a default alert for general information. This may be useful in various scenarios such as providing
              helpful tips or guidance.
            </AlertDescription>
          </Alert>
        </div>
        <CodeSnippet className="my-2" language="tsx">
          {`<Alert>
  <HeartHandshake />
  <AlertTitle>Tip</AlertTitle>
  <AlertDescription>
    Use a default alert for general information. This may be useful in various scenarios such as providing
    helpful tips or guidance.
  </AlertDescription>
</Alert>`}
        </CodeSnippet>
      </div>

      <div className="my-8">
        <div className="mb-2 flex place-content-center rounded-sm border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
          <Alert variant="destructive">
            <AlertCircleIcon />
            <AlertTitle>Uh oh!</AlertTitle>
            <AlertDescription>Something unexpected has occurred. Please excuse our mess.</AlertDescription>
          </Alert>
        </div>
        <CodeSnippet className="my-2" language="tsx">
          {`<Alert variant="destructive">
  <AlertCircleIcon />
  <AlertTitle>Uh oh!</AlertTitle>
  <AlertDescription>
    Something unexpected has occurred. Please excuse our mess.
  </AlertDescription>
</Alert>`}
        </CodeSnippet>
      </div>

      <div className="my-8">
        <div className="mb-2 flex place-content-center rounded-sm border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
          <Alert variant="warning">
            <AlertTitle>Proceed with caution!</AlertTitle>
            <AlertDescription>
              Mollit proident aliqua vel pariatur dolor cupidatat sunt. Tempus quis elit officia ero exercitation labore
              a. Nisi commodo nunc id et. Labore facilisis do nibh fermentum exercitation voluptate. Aute et ut est
              justo veniam. Ut do convallis reprehenderit qui. Consectetur nibh nibh est pariatur tempor. Qos laoreet
              qui labore a neque incididunt.
            </AlertDescription>
          </Alert>
        </div>
        <CodeSnippet className="my-2" language="tsx">
          {`<Alert variant="warning">
  <AlertTitle>Proceed with caution!</AlertTitle>
  <AlertDescription>
    Mollit proident aliqua vel pariatur dolor cupidatat sunt. Tempus quis elit officia ero
    exercitation labore a. Nisi commodo nunc id et. Labore facilisis do nibh fermentum
    exercitation voluptate. Aute et ut est justo veniam. Ut do convallis reprehenderit
    qui. Consectetur nibh nibh est pariatur tempor. Qos laoreet qui labore a neque
    incididunt.
  </AlertDescription>
</Alert>`}
        </CodeSnippet>
      </div>

      <div className="my-8">
        <div className="mb-2 flex place-content-center rounded-sm border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
          <Alert variant="success">
            <AlertTitle>You did it!</AlertTitle>
            <AlertDescription>
              Mollit proident aliqua vel pariatur dolor cupidatat sunt. Tempus quis elit officia ero exercitation labore
              a. Nisi commodo nunc id et. Labore facilisis do nibh fermentum exercitation voluptate. Aute et ut est
              justo veniam. Ut do convallis reprehenderit qui. Consectetur nibh nibh est pariatur tempor. Qos laoreet
              qui labore a neque incididunt.
            </AlertDescription>
          </Alert>
        </div>
        <CodeSnippet className="my-2" language="tsx">
          {`<Alert variant="success">
  <AlertTitle>You did it!</AlertTitle>
  <AlertDescription>
    Mollit proident aliqua vel pariatur dolor cupidatat sunt. Tempus quis elit officia ero
    exercitation labore a. Nisi commodo nunc id et. Labore facilisis do nibh fermentum
    exercitation voluptate. Aute et ut est justo veniam. Ut do convallis reprehenderit
    qui. Consectetur nibh nibh est pariatur tempor. Qos laoreet qui labore a neque
    incididunt.
  </AlertDescription>
</Alert>`}
        </CodeSnippet>
      </div>
    </section>
  );
};

export default AlertComponents;
