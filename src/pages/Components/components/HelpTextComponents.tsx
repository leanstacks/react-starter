import { ColumnDef, createColumnHelper } from '@tanstack/react-table';

import { BaseComponentProps } from 'common/utils/types';
import { ComponentProperty } from '../model/components';
import Table from 'common/components/Table/Table';
import CodeSnippet from 'common/components/Text/CodeSnippet';
import Heading from 'common/components/Text/Heading';
import HelpText from 'common/components/Text/HelpText';
import FAIcon from 'common/components/Icon/FAIcon';

/**
 * The `HelpTextComponents` component renders a set of examples illustrating
 * the use of the `HelpText` component.
 */
const HelpTextComponents = ({ className, testId = 'components-helptext' }: BaseComponentProps): JSX.Element => {
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
        Help Text Component
      </Heading>

      <div className="my-8">
        <div className="mb-4">
          The <span className="font-mono font-bold">HelpText</span> component renders styled text, typically used to
          display helpful information regarding another element such as a form control. The HelpText component is used
          to compose custom form controls in the starter kit such as <span className="font-mono font-bold">Input</span>,{' '}
          <span className="font-mono font-bold">Select</span>, <span className="font-mono font-bold">Textarea</span>,
          and <span className="font-mono font-bold">Toggle</span>.
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
        <div className="mb-4 opacity-85">This is the most basic use of the HelpText component.</div>
        <div className="my-8">
          <div className="mb-2 flex flex-col place-content-center rounded-sm border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
            {/* Example */}
            <HelpText>
              Tell us a little bit about yourself. The biography should be no more than 500 characters.
            </HelpText>
          </div>
          <CodeSnippet
            className="my-2"
            code={`<HelpText>
  Tell us a little bit about yourself. The biography should be no more than 500
  characters.
</HelpText>`}
          />
        </div>

        <Heading level={4} className="my-2">
          Content
        </Heading>
        <div className="mb-4 opacity-85">You may pass complex content as the "children" to the HelpText component.</div>
        <div className="my-8">
          <div className="mb-2 flex flex-col place-content-center rounded-sm border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
            {/* Example */}
            <HelpText>
              <FAIcon icon="circleInfo" className="me-2" beat />
              <span>Tell us a little bit about yourself. The biography should be no more than 500 characters.</span>
            </HelpText>
          </div>
          <CodeSnippet
            className="my-2"
            code={`<HelpText>
  <FAIcon icon="circleInfo" className="me-2" beat />
  <span>
    Tell us a little bit about yourself. The biography should be no more than 500
    characters.
  </span>
</HelpText>`}
          />
        </div>
      </div>
    </section>
  );
};

export default HelpTextComponents;
