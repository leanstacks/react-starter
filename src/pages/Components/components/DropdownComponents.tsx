import { ColumnDef, createColumnHelper } from '@tanstack/react-table';

import { BaseComponentProps } from 'common/utils/types';
import { ComponentProperty } from '../model/components';
import Table from 'common/components/Table/Table';
import CodeSnippet from 'common/components/Text/CodeSnippet';
import Heading from 'common/components/Text/Heading';
import DropdownMenu from 'common/components/Dropdown/DropdownMenu';
import Button from 'common/components/Button/Button';
import FAIcon from 'common/components/Icon/FAIcon';

/**
 * The `DropdownComponents` component renders a set of examples illustrating
 * the use of the `DropdownMenu` component.
 */
const DropdownComponents = ({ className, testId = 'components-dropdown' }: BaseComponentProps) => {
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

  return (
    <section className={className} data-testid={testId}>
      <Heading level={2} className="mb-4">
        DropdownMenu Component
      </Heading>

      <div className="my-8">
        <div>
          The <span className="font-mono font-bold">DropdownMenu</span> component displays a context menu adjacent to
          the element which triggers the display of the menu.
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
            {/* Example Here */}
            <DropdownMenu>
              <DropdownMenu.Trigger>
                <Button>Open</Button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content className="mt-2">
                <DropdownMenu.Heading>Task</DropdownMenu.Heading>
                <DropdownMenu.Separator />
                <DropdownMenu.Item onClick={() => alert('Clicked add')} testId="item-add">
                  <FAIcon icon="plus" fixedWidth />
                  <span>Add</span>
                </DropdownMenu.Item>
                <DropdownMenu.Item onClick={() => alert('Clicked edit')} testId="item-edit">
                  <FAIcon icon="pencil" fixedWidth />
                  <span>Edit</span>
                </DropdownMenu.Item>
                <DropdownMenu.Item onClick={() => alert('Clicked delete')} testId="item-delete">
                  <FAIcon icon="trash" fixedWidth />
                  <span>Delete</span>
                </DropdownMenu.Item>
                <DropdownMenu.Item onClick={() => alert('Clicked send')} testId="item-send">
                  <FAIcon icon="envelope" fixedWidth />
                  <span>Send</span>
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu>
          </div>
          <CodeSnippet className="my-2" language="tsx">
            {`<DropdownMenu>
  <DropdownMenu.Trigger>
    <Button>Open</Button>
  </DropdownMenu.Trigger>
  <DropdownMenu.Content className="mt-2">
    <DropdownMenu.Heading>Task</DropdownMenu.Heading>
    <DropdownMenu.Separator />
    <DropdownMenu.Item onClick={() => alert('Clicked add')}>
      <FAIcon icon="plus" fixedWidth />
      <span>Add</span>
    </DropdownMenu.Item>
    <DropdownMenu.Item onClick={() => alert('Clicked edit')}>
      <FAIcon icon="pencil" fixedWidth />
      <span>Edit</span>
    </DropdownMenu.Item>
    <DropdownMenu.Item onClick={() => alert('Clicked delete')}>
      <FAIcon icon="trash" fixedWidth />
      <span>Delete</span>
    </DropdownMenu.Item>
    <DropdownMenu.Item onClick={() => alert('Clicked send')}>
      <FAIcon icon="envelope" fixedWidth />
      <span>Send</span>
    </DropdownMenu.Item>
  </DropdownMenu.Content>
</DropdownMenu>`}
          </CodeSnippet>
        </div>
      </div>
    </section>
  );
};

export default DropdownComponents;
