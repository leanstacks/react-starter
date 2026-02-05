import { ColumnDef, createColumnHelper } from '@tanstack/react-table';

import { BaseComponentProps } from 'common/utils/types';
import { ComponentProperty } from '../model/components';
import Table from 'common/components/Table/Table';
import CodeSnippet from 'common/components/Text/CodeSnippet';
import Heading from 'common/components/Text/Heading';
import Breadcrumbs from 'common/components/Breadcrumbs/Breadcrumbs';
import DropdownMenu from 'common/components/Dropdown/DropdownMenu';

/**
 * The `BreadcrumbsComponents` React component renders a set of examples illustrating
 * the use of the `Breadcrumbs` family of components.
 */
const BreadcrumbsComponents = ({ className, testId = 'components-breadcrumbs' }: BaseComponentProps) => {
  const columnHelper = createColumnHelper<ComponentProperty>();
  const breadcrumbsData: ComponentProperty[] = [
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
          Breadcrumbs Component
        </Heading>

        <div className="my-8">
          The <span className="font-mono font-bold">Breadcrumbs</span> component displays a heirarchy of links as a path
          to the current route.
        </div>

        <div className="my-8">
          <Heading level={3} className="mb-2">
            Properties
          </Heading>
          <Table<ComponentProperty> data={breadcrumbsData} columns={columns} />
        </div>

        <Heading level={3} className="mb-2">
          Examples
        </Heading>

        <Heading level={4} className="mb-2">
          Breadcrumbs components
        </Heading>
        <div className="text-sm opacity-85">
          The Breadcrumbs component is a compound component. It has component properties which allow you to compose
          Breadcrumbs content. Those components include: List, Item, Link, Page, Ellipsis, and Separator.
        </div>
        <div className="my-8">
          <div className="mb-2 flex place-content-center rounded-sm border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
            <Breadcrumbs>
              <Breadcrumbs.List>
                <Breadcrumbs.Item>
                  <Breadcrumbs.Link to="/">Home</Breadcrumbs.Link>
                </Breadcrumbs.Item>
                <Breadcrumbs.Separator />
                <Breadcrumbs.Item>
                  <DropdownMenu>
                    <DropdownMenu.Trigger>
                      <Breadcrumbs.Ellipsis />
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content className="left-0">
                      <DropdownMenu.Item>Components</DropdownMenu.Item>
                      <DropdownMenu.Item>Settings</DropdownMenu.Item>
                      <DropdownMenu.Item>Tasks</DropdownMenu.Item>
                    </DropdownMenu.Content>
                  </DropdownMenu>
                </Breadcrumbs.Item>
                <Breadcrumbs.Separator />
                <Breadcrumbs.Item>
                  <Breadcrumbs.Link to="/app/tasks/97">dolorum laboriosam eos qui iure aliquam</Breadcrumbs.Link>
                </Breadcrumbs.Item>
                <Breadcrumbs.Separator />
                <Breadcrumbs.Item>
                  <Breadcrumbs.Page>Edit</Breadcrumbs.Page>
                </Breadcrumbs.Item>
              </Breadcrumbs.List>
            </Breadcrumbs>
          </div>
          <CodeSnippet
            className="my-2"
            code={`<Breadcrumbs>
  <Breadcrumbs.List>
    <Breadcrumbs.Item>
      <Breadcrumbs.Link to="/">Home</Breadcrumbs.Link>
    </Breadcrumbs.Item>
    <Breadcrumbs.Separator />
    <Breadcrumbs.Item>
      <DropdownMenu>
        <DropdownMenu.Trigger>
          <Breadcrumbs.Ellipsis />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content className="left-0">
          <DropdownMenu.Item>Components</DropdownMenu.Item>
          <DropdownMenu.Item>Settings</DropdownMenu.Item>
          <DropdownMenu.Item>Tasks</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu>
    </Breadcrumbs.Item>
    <Breadcrumbs.Separator />
    <Breadcrumbs.Item>
      <Breadcrumbs.Link to="/app/tasks/97">
        dolorum laboriosam eos qui iure aliquam
      </Breadcrumbs.Link>
    </Breadcrumbs.Item>
    <Breadcrumbs.Separator />
    <Breadcrumbs.Item>
      <Breadcrumbs.Page>Edit</Breadcrumbs.Page>
    </Breadcrumbs.Item>
  </Breadcrumbs.List>
</Breadcrumbs>`}
          />
        </div>
      </div>
    </section>
  );
};

export default BreadcrumbsComponents;
