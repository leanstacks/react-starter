import { ColumnDef, createColumnHelper } from '@tanstack/react-table';

import { BaseComponentProps } from 'common/utils/types';
import { ComponentProperty } from '../model/components';
import Table from 'common/components/Table/Table';
import CodeSnippet from 'common/components/Text/CodeSnippet';
import Heading from 'common/components/Text/Heading';
import Link from 'common/components/Link/Link';
import FAIcon from 'common/components/Icon/FAIcon';
import Columns from 'common/components/Content/Columns';

/**
 * The `IconComponents` component renders a set of examples illustrating
 * the use of the `FAIcon` component.
 */
const IconComponents = ({ className, testId = 'components-icon' }: BaseComponentProps) => {
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
      name: 'icon',
      description: 'The name.',
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
        Icon Component
      </Heading>

      <div className="my-8">
        <div className="mb-4">
          The <span className="font-mono font-bold">FAIcon</span> component renders a Font Awesome icon. The component
          extends all properties and capabilities of the{' '}
          <Link to="https://docs.fontawesome.com/web/use-with/react/style" target="_blank">
            FontAwesomeIcon
          </Link>{' '}
          component, allowing you to size, rotate, spin, stack, and further manipulate the icons.
        </div>
        <div className="mb-4">Use any of Font Awesome's 2,000+ free or 50,000+ licensed icons.</div>

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
        <div className="my-8">
          <div className="mb-2 flex place-content-center rounded-sm border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
            {/* Example */}
            <FAIcon icon="circleInfo" />
          </div>
          <CodeSnippet className="my-2" language="tsx">{`<FAIcon icon='circleInfo' />`}</CodeSnippet>
        </div>

        <Heading level={4} className="mb-2">
          Sizes
        </Heading>
        <div className="my-8">
          <div className="mb-2 flex place-content-center rounded-sm border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
            {/* Example */}
            <Columns layout="1-1-1" className="items-center justify-center *:w-20">
              <Columns.Column>
                <FAIcon icon="circleInfo" size="xs" />
              </Columns.Column>
              <Columns.Column>
                <FAIcon icon="circleInfo" size="sm" />
              </Columns.Column>
              <Columns.Column>
                <FAIcon icon="circleInfo" />
              </Columns.Column>
              <Columns.Column>
                <FAIcon icon="circleInfo" size="lg" />
              </Columns.Column>
              <Columns.Column>
                <FAIcon icon="circleInfo" size="xl" />
              </Columns.Column>
              <Columns.Column>
                <FAIcon icon="circleInfo" size="2x" />
              </Columns.Column>
            </Columns>
          </div>
          <CodeSnippet className="my-2" language="tsx">
            {`<Columns layout="1-1-1">
  <Columns.Column>
    <FAIcon icon="circleInfo" size="xs" />
  </Columns.Column>
  <Columns.Column>
    <FAIcon icon="circleInfo" size="sm" />
  </Columns.Column>
  <Columns.Column>
    <FAIcon icon="circleInfo" />
  </Columns.Column>
  <Columns.Column>
    <FAIcon icon="circleInfo" size="lg" />
  </Columns.Column>
  <Columns.Column>
    <FAIcon icon="circleInfo" size="xl" />
  </Columns.Column>
  <Columns.Column>
    <FAIcon icon="circleInfo" size="2x" />
  </Columns.Column>
</Columns>`}
          </CodeSnippet>
        </div>

        <Heading level={4} className="mb-2">
          Spin
        </Heading>
        <div className="my-8">
          <div className="mb-2 flex place-content-center rounded-sm border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
            {/* Example */}
            <FAIcon icon="circleNotch" spin />
          </div>
          <CodeSnippet className="my-2" language="tsx">{`<FAIcon icon="circleNotch" spin />`}</CodeSnippet>
        </div>

        <Heading level={4} className="mb-2">
          Animate
        </Heading>
        <div className="my-8">
          <div className="mb-2 flex place-content-center rounded-sm border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
            {/* Example */}
            <Columns layout="1-1-1" className="items-center justify-center *:w-20">
              <Columns.Column>
                <FAIcon icon="circleInfo" beat />
              </Columns.Column>
              <Columns.Column>
                <FAIcon icon="circleInfo" beatFade />
              </Columns.Column>
              <Columns.Column>
                <FAIcon icon="circleRegular" bounce />
              </Columns.Column>
              <Columns.Column>
                <FAIcon icon="circleInfo" fade />
              </Columns.Column>
              <Columns.Column>
                <FAIcon icon="phone" shake />
              </Columns.Column>
              <Columns.Column>
                <FAIcon icon="circleNotch" spin />
              </Columns.Column>
              <Columns.Column>
                <FAIcon icon="circleNotch" spin spinReverse />
              </Columns.Column>
              <Columns.Column>
                <FAIcon icon="circleNotch" spinPulse />
              </Columns.Column>
            </Columns>
          </div>
          <CodeSnippet className="my-2" language="tsx">
            {`<Columns layout="1-1-1">
  <Columns.Column>
    <FAIcon icon="circleInfo" beat />
  </Columns.Column>
  <Columns.Column>
    <FAIcon icon="circleInfo" beatFade />
  </Columns.Column>
  <Columns.Column>
    <FAIcon icon="circleRegular" bounce />
  </Columns.Column>
  <Columns.Column>
    <FAIcon icon="circleInfo" fade />
  </Columns.Column>
  <Columns.Column>
    <FAIcon icon="phone" shake />
  </Columns.Column>
  <Columns.Column>
    <FAIcon icon="circleNotch" spin />
  </Columns.Column>
  <Columns.Column>
    <FAIcon icon="circleNotch" spin spinReverse />
  </Columns.Column>
  <Columns.Column>
    <FAIcon icon="circleNotch" spinPulse />
  </Columns.Column>
</Columns>`}
          </CodeSnippet>
        </div>
      </div>
    </section>
  );
};

export default IconComponents;
