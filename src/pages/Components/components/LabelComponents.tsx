import { ColumnDef, createColumnHelper } from '@tanstack/react-table';

import { BaseComponentProps } from 'common/utils/types';
import { ComponentProperty } from '../model/components';
import Table from 'common/components/Table/Table';
import CodeSnippet from 'common/components/Text/CodeSnippet';
import Heading from 'common/components/Text/Heading';
import Label from 'common/components/Form/Label';

/**
 * The `LabelComponents` component renders a set of examples illustrating
 * the use of the `Label` component.
 */
const LabelComponents = ({ className, testId = 'components-label' }: BaseComponentProps): JSX.Element => {
  const data: ComponentProperty[] = [
    {
      name: 'children',
      description: 'The content.',
    },
    {
      name: 'className',
      description: 'Optional. Additional CSS class names.',
    },
    {
      name: 'required',
      description: 'Optional. Indicates if the form control requires a value. Defaults to false.',
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
        Label Component
      </Heading>

      <div className="my-8">
        <div className="mb-4">
          The <span className="font-mono font-bold">Label</span> component renders a HTML label element. It describes a
          form control. The Label component is used to compose custom form controls in the starter kit such as{' '}
          <span className="font-mono font-bold">Input</span>, <span className="font-mono font-bold">Select</span>,{' '}
          <span className="font-mono font-bold">Textarea</span>, and <span className="font-mono font-bold">Toggle</span>
          .
        </div>
        <div className="mb-4">
          In addition to the custom properties listed below, the Label component also accepts all standard HTML label
          element attribute React properties.
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
          This is the most basic use of the Label component. It displays a label associated with a form control.
        </div>
        <div className="my-8">
          <div className="mb-2 flex flex-col place-content-center rounded-sm border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
            {/* Example */}
            <Label htmlFor="firstName">First Name</Label>
          </div>
          <CodeSnippet className="my-2" code={`<Label htmlFor="firstName">First Name</Label>`} />
        </div>

        <Heading level={4} className="my-2">
          Required
        </Heading>
        <div className="mb-4 opacity-85">
          Use the "required" property to indicate that a form control requires a value.
        </div>
        <div className="my-8">
          <div className="mb-2 flex flex-col place-content-center rounded-sm border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
            {/* Example */}
            <Label htmlFor="firstName" required>
              First Name
            </Label>
          </div>
          <CodeSnippet
            className="my-2"
            code={`<Label htmlFor="firstName" required>
  First Name
</Label>`}
          />
        </div>
      </div>
    </section>
  );
};

export default LabelComponents;
