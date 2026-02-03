import { ColumnDef, createColumnHelper } from '@tanstack/react-table';

import { BaseComponentProps } from 'common/utils/types';
import { ComponentProperty } from '../model/components';
import Table from 'common/components/Table/Table';
import CodeSnippet from 'common/components/Text/CodeSnippet';
import Heading from 'common/components/Text/Heading';
import Tabs from 'common/components/Tabs/Tabs';

/**
 * The `TabsComponents` component renders a set of examples illustrating
 * the use of the `Tabs` component.
 */
const TabsComponents = ({ className, testId = 'components-tabs' }: BaseComponentProps): JSX.Element => {
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
      name: 'defaultValue',
      description: 'The default or initial tab to be displayed.',
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
        Tabs Component
      </Heading>

      <div className="my-8">
        <div>
          The <span className="font-mono font-bold">Tabs</span> component organizes content into sections, i.e. tabs,
          allowing the user to select the section which is actively displayed.
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
          Default Tabs
        </Heading>
        <div className="my-8">
          <div className="mb-2 flex place-content-center rounded-sm border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
            {/* Tabs Example Here */}
            <Tabs defaultValue="list" className="w-full">
              <Tabs.List>
                <Tabs.Tab value="list">List</Tabs.Tab>
                <Tabs.Tab value="detail">Detail</Tabs.Tab>
              </Tabs.List>
              <Tabs.Content value="list">
                <div className="py-8 font-bold">I am the LIST tab.</div>
              </Tabs.Content>
              <Tabs.Content value="detail">
                <div className="py-8 font-bold">I am the DETAIL tab.</div>
              </Tabs.Content>
            </Tabs>
          </div>
          <CodeSnippet
            className="my-2"
            code={`<Tabs defaultValue="list" className="w-full">
  <Tabs.List>
    <Tabs.Tab value="list">List</Tabs.Tab>
    <Tabs.Tab value="detail">Detail</Tabs.Tab>
  </Tabs.List>
  <Tabs.Content value="list">
    <div className="py-8 font-bold">I am the LIST tab.</div>
  </Tabs.Content>
  <Tabs.Content value="detail">
    <div className="py-8 font-bold">I am the DETAIL tab.</div>
  </Tabs.Content>
</Tabs>`}
          />
        </div>

        <Heading level={4} className="mb-2">
          Stretched Tabs
        </Heading>
        <div className="my-8">
          <div className="mb-2 flex place-content-center rounded-sm border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
            {/* Tabs Example Here */}
            <Tabs defaultValue="list" className="w-full">
              <Tabs.List align="stretch">
                <Tabs.Tab value="list">List</Tabs.Tab>
                <Tabs.Tab value="detail">Detail</Tabs.Tab>
              </Tabs.List>
              <Tabs.Content value="list">
                <div className="py-8 font-bold">I am the LIST tab.</div>
              </Tabs.Content>
              <Tabs.Content value="detail">
                <div className="py-8 font-bold">I am the DETAIL tab.</div>
              </Tabs.Content>
            </Tabs>
          </div>
          <CodeSnippet
            className="my-2"
            code={`<Tabs defaultValue="list" className="w-full">
  <Tabs.List align="stretch">
    <Tabs.Tab value="list">List</Tabs.Tab>
    <Tabs.Tab value="detail">Detail</Tabs.Tab>
  </Tabs.List>
  <Tabs.Content value="list">
    <div className="py-8 font-bold">I am the LIST tab.</div>
  </Tabs.Content>
  <Tabs.Content value="detail">
    <div className="py-8 font-bold">I am the DETAIL tab.</div>
  </Tabs.Content>
</Tabs>`}
          />
        </div>
      </div>
    </section>
  );
};

export default TabsComponents;
