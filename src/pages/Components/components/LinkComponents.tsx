import { ColumnDef, createColumnHelper } from '@tanstack/react-table';

import { BaseComponentProps } from 'common/utils/types';
import { ComponentProperty } from '../model/components';
import Table from 'common/components/Table/Table';
import CodeSnippet from 'common/components/Text/CodeSnippet';
import Heading from 'common/components/Text/Heading';
import Link from 'common/components/Link/Link';

/**
 * The `LinkComponents` component renders a set of examples illustrating
 * the use of the `Link` component.
 */
const LinkComponents = ({ className, testId = 'components-link' }: BaseComponentProps) => {
  const data: ComponentProperty[] = [
    {
      name: 'className',
      description: 'Optional. Additional CSS class names.',
    },
    {
      name: 'testId',
      description: 'Optional. Identifier for testing.',
    },
    {
      name: 'to',
      description: 'The URL to link to. This can be a string or an object.',
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
        Link Component
      </Heading>

      <div className="my-8">
        <div className="mb-4">
          The <span className="font-mono font-bold">Link</span> component is a wrapper around the React Router Link
          component. It provides a way to navigate between different routes in your application without causing a full
          page reload. The Link component accepts all the same props as the React Router Link component, as well as some
          additional props for styling and testing.
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
        <div className="mb-4 opacity-85">
          This is a basic example of the <span className="font-mono font-bold">Link</span> component. It renders a HTML
          anchor element that links to the specified URL. The Link is styled with accessibility in mind.
        </div>
        <div className="my-8">
          <div className="mb-2 flex flex-col place-content-center rounded-sm border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
            {/* Example */}
            <div>
              To learn more about using the Link component view the <Link to="/pub/components/link">Link</Link> examples
              page.
            </div>
          </div>
          <CodeSnippet
            className="my-2"
            code={`<div>
  To learn more about using the Link component view the{' '}
  <Link to="/pub/components/link">Link</Link> examples page.
</div>`}
          />
        </div>

        <Heading level={4} className="my-2">
          Router Link Properties
        </Heading>
        <div className="mb-4 opacity-85">
          The Link component accepts all the same props as the React Router Link component. This includes the{' '}
          <span className="font-mono font-bold">to</span> prop, which specifies the URL to link to. Or the{' '}
          <span className="font-mono font-bold">target</span> prop, which specifies where to open the linked document.
        </div>
        <div className="my-8">
          <div className="mb-2 flex flex-col place-content-center rounded-sm border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
            {/* Example */}
            <div>
              Open an external link in a new tab. To view the official React Router documentation, refer to the{' '}
              <Link to="https://reactrouter.com/api/components/Link" target="_blank">
                Link component guide
              </Link>
              .
            </div>
          </div>
          <CodeSnippet
            className="my-2"
            code={`<div>
  Open an external link in a new tab. To view the official React Router documentation,
  refer to the{' '}
  <Link to="https://reactrouter.com/api/components/Link" target="_blank">
    Link component guide
  </Link>
  .
</div>`}
          />
        </div>
      </div>
    </section>
  );
};

export default LinkComponents;
