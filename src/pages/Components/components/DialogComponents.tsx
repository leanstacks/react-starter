import { ColumnDef, createColumnHelper } from '@tanstack/react-table';

import { BaseComponentProps } from 'common/utils/types';
import { ComponentProperty } from '../model/components';
import Table from 'common/components/Table/Table';
import CodeSnippet from 'common/components/Text/CodeSnippet';
import Heading from 'common/components/Text/Heading';
import Dialog from 'common/components/Dialog/Dialog';
import Button from 'common/components/Button/Button';

/**
 * The `DialogComponents` React component renders a set of examples illustrating
 * the use of the `Dialog` component.
 */
const DialogComponents = ({ className, testId = 'components-dialog' }: BaseComponentProps): JSX.Element => {
  const data: ComponentProperty[] = [
    {
      name: 'children',
      description: 'The content to be displayed. May be a ReactNode or a render prop function.',
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
        Dialog Component
      </Heading>

      <div className="my-8">
        The <span className="font-mono font-bold">Dialog</span> is a modal window that displays on top of the main
        content, typically asking the user to take an action or confirm a decision. Compose a Dialog using combinations
        of: <code>Trigger</code>, <code>Content</code>, <code>Header</code>, <code>Title</code>, <code>Subtitle</code>,{' '}
        <code>Body</code>, <code>Footer</code>, <code>ButtonBar</code>, and <code>Button</code>.
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
        Dialog with ReactNode children
      </Heading>
      <div className="my-8">
        <div className="mb-2 flex place-content-center rounded-sm border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
          <Dialog>
            <Dialog.Trigger>
              <Button>Open</Button>
            </Dialog.Trigger>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Are you sure?</Dialog.Title>
                <Dialog.Subtitle>Deletion is permanent and cannot be undone.</Dialog.Subtitle>
              </Dialog.Header>
              <Dialog.Body>
                Delete issue: <span className="font-bold text-neutral-500">987 Use dialog to confirm task delete</span>
              </Dialog.Body>
              <Dialog.Separator />
              <Dialog.Footer>
                <Dialog.ButtonBar>
                  <Dialog.Button>Cancel</Dialog.Button>
                  <Dialog.Button variant="danger">Delete</Dialog.Button>
                </Dialog.ButtonBar>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog>
        </div>
        <CodeSnippet
          className="my-2"
          code={`<Dialog>
  <Dialog.Trigger>
    <Button>Open</Button>
  </Dialog.Trigger>
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>Are you sure?</Dialog.Title>
      <Dialog.Subtitle>Deletion is permanent and cannot be undone.</Dialog.Subtitle>
    </Dialog.Header>
    <Dialog.Body>
      Delete issue:{' '}
      <span className="font-bold text-neutral-500">
        987 Use dialog to confirm task delete
      </span>
    </Dialog.Body>
    <Dialog.Separator />
    <Dialog.Footer>
      <Dialog.ButtonBar>
        <Dialog.Button>Cancel</Dialog.Button>
        <Dialog.Button variant="danger">Delete</Dialog.Button>
      </Dialog.ButtonBar>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog>`}
        />
      </div>

      <Heading level={4} className="mb-2">
        Dialog with render props
      </Heading>
      <div className="my-8">
        <div className="mb-2 flex place-content-center rounded-sm border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
          <Dialog>
            {({ close }) => (
              <>
                <Dialog.Trigger>
                  <Button>Open</Button>
                </Dialog.Trigger>
                <Dialog.Content>
                  <Dialog.Header>
                    <Dialog.Title>Terms and Conditions</Dialog.Title>
                    <Dialog.Subtitle>
                      Nam cupidatat duis dolore magna aute posuere. Esse arcu morbi quis consequat facilisis lorem
                      pulvinar.
                    </Dialog.Subtitle>
                  </Dialog.Header>
                  <Dialog.Body>
                    <div className="mb-2">
                      Dolor proident aliqua ornare consectetur. Sapien est do quam labore qos veniam. Aute sint sunt
                      commodo ea e. Ligula anim amet nulla morbi nulla. Laborum duis sunt exercitation justo. Quis
                      aliquip posuere incididunt et consectetur. Nostrud incididunt laborum pulvinar ea ut ex at.
                    </div>
                    <div>
                      Pariatur anim veniam morbi dui consectetur officia. Occaecat e dolore mi enim morbi aliquip e.
                      Condimentum adipiscing sunt commodo proident enim laborum mi. Dui labore posuere ex exercitation
                      justo morbi. A consequat pulvinar aliqua do duis ligula. Ullamco enim condimentum pariatur dolor
                      nulla ad quam. Nam egestas laboris laoreet et ipsum deserunt ligula.
                    </div>
                  </Dialog.Body>
                  <Dialog.Separator />
                  <Dialog.Footer>
                    <Dialog.ButtonBar>
                      <Dialog.Button onClick={() => close()} testId="dialog-button-decline">
                        Decline
                      </Dialog.Button>
                      <Dialog.Button variant="primary" onClick={() => close()} testId="dialog-button-accept">
                        Accept
                      </Dialog.Button>
                    </Dialog.ButtonBar>
                  </Dialog.Footer>
                </Dialog.Content>
              </>
            )}
          </Dialog>
        </div>
        <CodeSnippet
          className="my-2"
          code={`<Dialog>
  {({ close }) => (
    <>
      <Dialog.Trigger>
        <Button>Open</Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>Terms and Conditions</Dialog.Title>
          <Dialog.Subtitle>
            Nam cupidatat duis dolore magna aute posuere. Esse arcu morbi quis consequat
            facilisis lorem pulvinar.
          </Dialog.Subtitle>
        </Dialog.Header>
        <Dialog.Body>
          <div className="mb-2">
            Dolor proident aliqua ornare consectetur. Sapien est do quam labore qos
            veniam. Aute sint sunt commodo ea e. Ligula anim amet nulla morbi nulla.
            Laborum duis sunt exercitation justo. Quis aliquip posuere incididunt et
            consectetur. Nostrud incididunt laborum pulvinar ea ut ex at.
          </div>
          <div>
            Pariatur anim veniam morbi dui consectetur officia. Occaecat e dolore mi enim
            morbi aliquip e. Condimentum adipiscing sunt commodo proident enim laborum mi.
            Dui labore posuere ex exercitation justo morbi. A consequat pulvinar aliqua do
            duis ligula. Ullamco enim condimentum pariatur dolor nulla ad quam. Nam
            egestas laboris laoreet et ipsum deserunt ligula.
          </div>
        </Dialog.Body>
        <Dialog.Separator />
        <Dialog.Footer>
          <Dialog.ButtonBar>
            <Dialog.Button onClick={() => close()}>Decline</Dialog.Button>
            <Dialog.Button variant="primary" onClick={() => close()}>
              Accept
            </Dialog.Button>
          </Dialog.ButtonBar>
        </Dialog.Footer>
      </Dialog.Content>
    </>
  )}
</Dialog>`}
        />
      </div>
    </section>
  );
};

export default DialogComponents;
