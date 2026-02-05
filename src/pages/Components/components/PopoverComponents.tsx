import { ColumnDef, createColumnHelper } from '@tanstack/react-table';

import { BaseComponentProps } from 'common/utils/types';
import { ComponentProperty } from '../model/components';
import Table from 'common/components/Table/Table';
import CodeSnippet from 'common/components/Text/CodeSnippet';
import Heading from 'common/components/Text/Heading';
import Popover from 'common/components/Popover/Popover';
import Card from 'common/components/Card/Card';

/**
 * The `PopoverComponents` component renders a set of examples illustrating
 * the use of the `Popover` component.
 */
const PopoverComponents = ({ className, testId = 'components-popover' }: BaseComponentProps) => {
  const data: ComponentProperty[] = [
    {
      name: 'children',
      description: 'The content to display within the Popover.',
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
        Popover Component
      </Heading>

      <div className="my-8">
        <div className="mb-4">
          The <span className="font-mono font-bold">Popover</span> component displays rich content within a portal,
          triggered by clicking a target element. The content can be any React component, such as a menu, form, or
          dialog.
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
          This is the most basic use of the Popover component. A popover consists of a trigger and content. When the
          trigger is clicked, the content is shown. The content is displayed over a full-screen backdrop. Clicking the
          backdrop or the trigger will close the popover.
        </div>
        <div className="my-8">
          <div className="mb-2 flex flex-col items-center rounded-sm border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
            {/* Example */}
            <Popover>
              <Popover.Trigger>Open</Popover.Trigger>
              <Popover.Content>
                <Card className="max-w-xs bg-slate-700 text-white dark:bg-slate-800">
                  <Card.Body>Hello world!</Card.Body>
                </Card>
              </Popover.Content>
            </Popover>
          </div>
          <CodeSnippet className="my-2" language="tsx">
            {`<Popover>
  <Popover.Trigger>Open</Popover.Trigger>
  <Popover.Content>
    <Card className="max-w-xs bg-slate-700 text-white dark:bg-slate-800">
      <Card.Body>Hello world!</Card.Body>
    </Card>
  </Popover.Content>
</Popover>`}
          </CodeSnippet>
        </div>

        <Heading level={4} className="my-2">
          Sides
        </Heading>
        <div className="mb-4 opacity-85">
          The Popover component can be positioned on any side of the trigger. The default position is bottom. The
          position can be changed by setting the <span className="font-mono">"side"</span> prop on the Popover
          component. The available options are <span className="font-mono">"top"</span>,{' '}
          <span className="font-mono">"right"</span>, <span className="font-mono">"bottom"</span>, and{' '}
          <span className="font-mono">"left"</span>.
        </div>
        <div className="my-8">
          <div className="mb-2 grid grid-cols-2 justify-items-center gap-4 rounded-sm border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
            {/* Example */}
            <Popover className="w-fit">
              <Popover.Trigger className="rounded-md px-4 py-2 transition-all hover:bg-neutral-500/50">
                Bottom
              </Popover.Trigger>
              <Popover.Content side="bottom">
                <Card className="max-w-xs bg-slate-700 text-white dark:bg-slate-800">
                  <Card.Body>
                    This popover appears below the trigger, which is also the default side when not specified.
                  </Card.Body>
                </Card>
              </Popover.Content>
            </Popover>
            <Popover>
              <Popover.Trigger className="rounded-md px-4 py-2 transition-all hover:bg-neutral-500/50">
                Top
              </Popover.Trigger>
              <Popover.Content side="top">
                <Card className="max-w-xs bg-slate-700 text-white dark:bg-slate-800">
                  <Card.Body>This popover appears above the trigger.</Card.Body>
                </Card>
              </Popover.Content>
            </Popover>
            <Popover>
              <Popover.Trigger className="rounded-md px-4 py-2 transition-all hover:bg-neutral-500/50">
                Left
              </Popover.Trigger>
              <Popover.Content side="left">
                <Card className="max-w-xs bg-slate-700 text-white dark:bg-slate-800">
                  <Card.Body>This popover appears to the left of the trigger.</Card.Body>
                </Card>
              </Popover.Content>
            </Popover>
            <Popover>
              <Popover.Trigger className="rounded-md px-4 py-2 transition-all hover:bg-neutral-500/50">
                Right
              </Popover.Trigger>
              <Popover.Content side="right">
                <Card className="max-w-xs bg-slate-700 text-white dark:bg-slate-800">
                  <Card.Body>This popover appears to the right of the trigger.</Card.Body>
                </Card>
              </Popover.Content>
            </Popover>
          </div>
          <CodeSnippet className="my-2" language="tsx">
            {`<>
  <Popover className="w-fit">
    <Popover.Trigger className="rounded-md px-4 py-2 transition-all hover:bg-neutral-500/50">
      Bottom
    </Popover.Trigger>
    <Popover.Content side="bottom">
      <Card className="max-w-xs bg-slate-700 text-white dark:bg-slate-800">
        <Card.Body>
          This popover appears below the trigger, which is also the default side when not
          specified.
        </Card.Body>
      </Card>
    </Popover.Content>
  </Popover>
  <Popover>
    <Popover.Trigger className="rounded-md px-4 py-2 transition-all hover:bg-neutral-500/50">
      Top
    </Popover.Trigger>
    <Popover.Content side="top">
      <Card className="max-w-xs bg-slate-700 text-white dark:bg-slate-800">
        <Card.Body>This popover appears above the trigger.</Card.Body>
      </Card>
    </Popover.Content>
  </Popover>
  <Popover>
    <Popover.Trigger className="rounded-md px-4 py-2 transition-all hover:bg-neutral-500/50">
      Left
    </Popover.Trigger>
    <Popover.Content side="left">
      <Card className="max-w-xs bg-slate-700 text-white dark:bg-slate-800">
        <Card.Body>This popover appears to the left of the trigger.</Card.Body>
      </Card>
    </Popover.Content>
  </Popover>
  <Popover>
    <Popover.Trigger className="rounded-md px-4 py-2 transition-all hover:bg-neutral-500/50">
      Right
    </Popover.Trigger>
    <Popover.Content side="right">
      <Card className="max-w-xs bg-slate-700 text-white dark:bg-slate-800">
        <Card.Body>This popover appears to the right of the trigger.</Card.Body>
      </Card>
    </Popover.Content>
  </Popover>
</>`}
          </CodeSnippet>
        </div>

        <Heading level={4} className="my-2">
          Side Offset
        </Heading>
        <div className="mb-4 opacity-85">
          Use the <span className="font-mono">"sideOffset"</span> prop to set the distance between the trigger and the
          popover. The default value is 8px.
        </div>
        <div className="my-8">
          <div className="mb-2 flex flex-col items-center rounded-sm border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
            {/* Example */}
            <Popover>
              <Popover.Trigger>Open</Popover.Trigger>
              <Popover.Content side="top" sideOffset={32}>
                <Card className="max-w-xs bg-slate-700 text-white dark:bg-slate-800">
                  <Card.Header>
                    <Card.Title>Popover with sideOffset</Card.Title>
                  </Card.Header>
                  <Card.Separator />
                  <Card.Body>
                    This popover has a sideOffset of 32, which means it will be positioned 32px away from the trigger
                    instead of the default 8px.
                  </Card.Body>
                </Card>
              </Popover.Content>
            </Popover>
          </div>
          <CodeSnippet className="my-2" language="tsx">
            {`<Popover>
  <Popover.Trigger>Open</Popover.Trigger>
  <Popover.Content side="top" sideOffset={32}>
    <Card className="max-w-xs bg-slate-700 text-white dark:bg-slate-800">
      <Card.Header>
        <Card.Title>Popover with sideOffset</Card.Title>
      </Card.Header>
      <Card.Separator />
      <Card.Body>
        This popover has a sideOffset of 32, which means it will be positioned 32px
        away from the trigger instead of the default 8px.
      </Card.Body>
    </Card>
  </Popover.Content>
</Popover>`}
          </CodeSnippet>
        </div>
      </div>
    </section>
  );
};

export default PopoverComponents;
