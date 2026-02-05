import { ColumnDef, createColumnHelper } from '@tanstack/react-table';

import { BaseComponentProps } from 'common/utils/types';
import { ComponentProperty } from '../model/components';
import Table from 'common/components/Table/Table';
import CodeSnippet from 'common/components/Text/CodeSnippet';
import Heading from 'common/components/Text/Heading';
import Spinner from 'common/components/Loader/Spinner';
import Link from 'common/components/Link/Link';

/**
 * The `SpinnerComponents` component renders a set of examples illustrating
 * the use of the `Spinner` component.
 */
const SpinnerComponents = ({ className, testId = 'components-spinner' }: BaseComponentProps) => {
  const data: ComponentProperty[] = [
    {
      name: 'children',
      description: 'Optional. The content, e.g. "Spinner.Text".',
    },
    {
      name: 'className',
      description: 'Optional. Additional CSS class names.',
    },
    {
      name: 'icon',
      description: 'Optional. A "FAIconProps" object containing properties for the icon.',
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
        Spinner Component
      </Heading>

      <div className="my-8">
        <div className="mb-4">
          The <span className="font-mono font-bold">Spinner</span> component displays an animated, spinning loader icon
          with optional accompanying text. The Spinner is typically used when a process is running, such as an API call.
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
        <div className="mb-4 opacity-85">This is the most basic use of the Spinner component.</div>
        <div className="my-8">
          <div className="mb-2 flex flex-col items-center justify-center rounded-sm border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
            {/* Example */}
            <Spinner />
          </div>
          <CodeSnippet className="my-2" code={`<Spinner />`} />
        </div>

        <Heading level={4} className="my-2">
          Sizes
        </Heading>
        <div className="mb-4 opacity-85">Adjust the size of the spinner using the "icon" property.</div>
        <div className="my-8">
          <div className="mb-2 flex flex-col place-content-center rounded-sm border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
            {/* Example */}
            <div className="grid grid-cols-6 place-items-center gap-4">
              <Spinner icon={{ size: 'xs' }} />
              <Spinner icon={{ size: 'sm' }} />
              <Spinner />
              <Spinner icon={{ size: 'lg' }} />
              <Spinner icon={{ size: 'xl' }} />
              <Spinner icon={{ size: '2x' }} />
            </div>
          </div>
          <CodeSnippet
            className="my-2"
            code={`<div className="grid grid-cols-6 place-items-center gap-4">
  <Spinner icon={{ size: 'xs' }} />
  <Spinner icon={{ size: 'sm' }} />
  <Spinner />
  <Spinner icon={{ size: 'lg' }} />
  <Spinner icon={{ size: 'xl' }} />
  <Spinner icon={{ size: '2x' }} />
</div>`}
          />
        </div>

        <Heading level={4} className="my-2">
          Colors
        </Heading>
        <div className="mb-4 opacity-85">Use Tailwind classes to adjust the color of the spinner.</div>
        <div className="my-8">
          <div className="mb-2 flex flex-col place-content-center rounded-sm border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
            {/* Example */}
            <div className="grid grid-cols-6 place-items-center gap-4">
              <Spinner className="text-slate-500" icon={{ size: '2x' }} />
              <Spinner className="text-sky-500" icon={{ size: '2x' }} />
              <Spinner className="text-fuchsia-500" icon={{ size: '2x' }} />
              <Spinner className="text-lime-500" icon={{ size: '2x' }} />
              <Spinner className="text-pink-500" icon={{ size: '2x' }} />
              <Spinner className="text-orange-500" icon={{ size: '2x' }} />
            </div>
          </div>
          <CodeSnippet
            className="my-2"
            code={`<div className="grid grid-cols-6 place-items-center gap-4">
  <Spinner className="text-slate-500" icon={{ size: '2x' }} />
  <Spinner className="text-sky-500" icon={{ size: '2x' }} />
  <Spinner className="text-fuchsia-500" icon={{ size: '2x' }} />
  <Spinner className="text-lime-500" icon={{ size: '2x' }} />
  <Spinner className="text-pink-500" icon={{ size: '2x' }} />
  <Spinner className="text-orange-500" icon={{ size: '2x' }} />
</div>`}
          />
        </div>

        <Heading level={4} className="my-2">
          Alternative icons
        </Heading>
        <div className="mb-4 opacity-85">
          By default, the spinner uses the "circle notch" icon. You can use any icon from the FontAwesome library. For a
          list of available icons, see the{' '}
          <Link to="https://fontawesome.com/search?ic=free" target="_blank" rel="noreferrer">
            FontAwesome icon gallery
          </Link>
          . Adjust the icon using the "icon" property.
        </div>
        <div className="my-8">
          <div className="mb-2 flex flex-col items-center justify-center rounded-sm border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
            {/* Example */}
            <Spinner icon={{ icon: 'circleXmark', size: '2x' }} />
          </div>
          <CodeSnippet className="my-2" code={`<Spinner icon={{ icon: 'circleXmark', size: '2x' }} />`} />
        </div>

        <Heading level={4} className="my-2">
          Composition
        </Heading>
        <div className="mb-4 opacity-85">Add text to the spinner using the "Spinner.Text" component.</div>
        <div className="my-8">
          <div className="mb-2 flex flex-col place-content-center rounded-sm border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
            {/* Example */}
            <div className="grid grid-cols-1 place-items-center gap-4 md:grid-cols-2">
              <Spinner>
                <Spinner.Text>Loading...</Spinner.Text>
              </Spinner>
              <Spinner icon={{ size: '3x' }}>
                <Spinner.Text className="text-4xl">Loading...</Spinner.Text>
              </Spinner>
            </div>
          </div>
          <CodeSnippet
            className="my-2"
            code={`<div className="grid grid-cols-2 place-items-center gap-4">
  <Spinner>
    <Spinner.Text>Loading...</Spinner.Text>
  </Spinner>
  <Spinner icon={{ size: '3x' }}>
    <Spinner.Text className="text-4xl">Loading...</Spinner.Text>
  </Spinner>
</div>`}
          />
        </div>
      </div>
    </section>
  );
};

export default SpinnerComponents;
