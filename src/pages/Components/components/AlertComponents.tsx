import { ColumnDef, createColumnHelper } from '@tanstack/react-table';

import { BaseComponentProps } from 'common/utils/types';
import { ComponentProperty } from '../model/components';
import Table from 'common/components/Table/Table';
import CodeSnippet from 'common/components/Text/CodeSnippet';
import Heading from 'common/components/Text/Heading';
import Alert from 'common/components/Alert/Alert';

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
          <Alert variant="danger">
            <Alert.Icon icon="circleExclamation" />
            <Alert.Title>Uh oh!</Alert.Title>
            <Alert.Description>Something unexpected has occurred. Please excuse our mess.</Alert.Description>
          </Alert>
        </div>
        <CodeSnippet className="my-2" language="tsx">
          {`<Alert variant="danger">
  <Alert.Icon icon="circleExclamation" />
  <Alert.Title>Uh oh!</Alert.Title>
  <Alert.Description>
    Something unexpected has occurred. Please excuse our mess.
  </Alert.Description>
</Alert>`}
        </CodeSnippet>
      </div>

      <div className="my-8">
        <div className="mb-2 flex place-content-center rounded-sm border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
          <Alert variant="info">
            <Alert.Icon icon="circleInfo" />
            <Alert.Title>Something you should know...</Alert.Title>
            <Alert.Description>
              Mollit proident aliqua vel pariatur dolor cupidatat sunt. Tempus quis elit officia ero exercitation labore
              a. Nisi commodo nunc id et. Labore facilisis do nibh fermentum exercitation voluptate. Aute et ut est
              justo veniam. Ut do convallis reprehenderit qui. Consectetur nibh nibh est pariatur tempor. Qos laoreet
              qui labore a neque incididunt.
            </Alert.Description>
          </Alert>
        </div>
        <CodeSnippet className="my-2" language="tsx">
          {`<Alert variant="info">
  <Alert.Icon icon="circleInfo" />
  <Alert.Title>Something you should know...</Alert.Title>
  <Alert.Description>
    Mollit proident aliqua vel pariatur dolor cupidatat sunt. Tempus quis elit officia ero
    exercitation labore a. Nisi commodo nunc id et. Labore facilisis do nibh fermentum
    exercitation voluptate. Aute et ut est justo veniam. Ut do convallis reprehenderit
    qui. Consectetur nibh nibh est pariatur tempor. Qos laoreet qui labore a neque
    incididunt.
  </Alert.Description>
</Alert>`}
        </CodeSnippet>
      </div>

      <div className="my-8">
        <div className="mb-2 flex place-content-center rounded-sm border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
          <Alert variant="warning">
            <Alert.Title>Proceed with caution!</Alert.Title>
            <Alert.Description>
              Mollit proident aliqua vel pariatur dolor cupidatat sunt. Tempus quis elit officia ero exercitation labore
              a. Nisi commodo nunc id et. Labore facilisis do nibh fermentum exercitation voluptate. Aute et ut est
              justo veniam. Ut do convallis reprehenderit qui. Consectetur nibh nibh est pariatur tempor. Qos laoreet
              qui labore a neque incididunt.
            </Alert.Description>
          </Alert>
        </div>
        <CodeSnippet className="my-2" language="tsx">
          {`<Alert variant="warning">
  <Alert.Title>Proceed with caution!</Alert.Title>
  <Alert.Description>
    Mollit proident aliqua vel pariatur dolor cupidatat sunt. Tempus quis elit officia ero
    exercitation labore a. Nisi commodo nunc id et. Labore facilisis do nibh fermentum
    exercitation voluptate. Aute et ut est justo veniam. Ut do convallis reprehenderit
    qui. Consectetur nibh nibh est pariatur tempor. Qos laoreet qui labore a neque
    incididunt.
  </Alert.Description>
</Alert>`}
        </CodeSnippet>
      </div>

      <div className="my-8">
        <div className="mb-2 flex place-content-center rounded-sm border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
          <Alert variant="success">
            <Alert.Title>You did it!</Alert.Title>
            <Alert.Description>
              Mollit proident aliqua vel pariatur dolor cupidatat sunt. Tempus quis elit officia ero exercitation labore
              a. Nisi commodo nunc id et. Labore facilisis do nibh fermentum exercitation voluptate. Aute et ut est
              justo veniam. Ut do convallis reprehenderit qui. Consectetur nibh nibh est pariatur tempor. Qos laoreet
              qui labore a neque incididunt.
            </Alert.Description>
          </Alert>
        </div>
        <CodeSnippet className="my-2" language="tsx">
          {`<Alert variant="success">
  <Alert.Title>You did it!</Alert.Title>
  <Alert.Description>
    Mollit proident aliqua vel pariatur dolor cupidatat sunt. Tempus quis elit officia ero
    exercitation labore a. Nisi commodo nunc id et. Labore facilisis do nibh fermentum
    exercitation voluptate. Aute et ut est justo veniam. Ut do convallis reprehenderit
    qui. Consectetur nibh nibh est pariatur tempor. Qos laoreet qui labore a neque
    incididunt.
  </Alert.Description>
</Alert>`}
        </CodeSnippet>
      </div>
    </section>
  );
};

export default AlertComponents;
