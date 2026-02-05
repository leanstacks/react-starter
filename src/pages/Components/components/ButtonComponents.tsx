import { BaseComponentProps } from 'common/utils/types';
import Button from 'common/components/Button/Button';
import CodeSnippet from 'common/components/Text/CodeSnippet';
import { ComponentProperty } from '../model/components';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import Table from 'common/components/Table/Table';
import FAIcon from 'common/components/Icon/FAIcon';
import Heading from 'common/components/Text/Heading';

/**
 * Properties for the `ButtonComponents` React component.
 * @see {@link BaseComponentProps}
 */
interface ButtonComponentsProps extends BaseComponentProps {}

/**
 * The `ButtonComponents` React component renders a set of examples illustrating
 * the use of the `Button` component.
 * @param {ButtonComponentsProps} props - Component properties.
 */
const ButtonComponents = ({ className, testId = 'components-button' }: ButtonComponentsProps) => {
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
      name: 'onClick',
      description: 'Optional. Click event handler function.',
    },
    {
      name: 'size',
      description: 'Optional. Size variant. Default: md',
    },
    {
      name: 'testId',
      description: 'Optional. Identifier for testing.',
    },
    {
      name: 'variant',
      description: 'Optional. Style variant. Default: solid',
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
        Button Component
      </Heading>

      <div className="my-8">
        The <span className="font-mono font-bold">Button</span> component displays a clickable button which is styled in
        a standardized way.
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
          <Button>Default button</Button>
        </div>
        <CodeSnippet className="my-2" language="tsx">{`<Button>Default button</Button>`}</CodeSnippet>
      </div>

      <div className="my-8">
        <div className="mb-2 flex items-center justify-center gap-8 rounded-sm border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
          <Button size="icon" variant="text">
            <FAIcon icon="bars" size="xl" />
          </Button>
        </div>
        <CodeSnippet className="my-2" language="tsx">
          {`<>
  <Button size="sm">Small</Button>
  <Button size="md">Medium</Button>
  <Button size="lg">Large</Button>
  <Button size="icon" variant="text">
    <FAIcon icon="bars" size="xl" />
  </Button>
</>`}
        </CodeSnippet>
      </div>

      <div className="my-8">
        <div className="mb-2 flex place-content-center rounded-sm border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
          <Button variant="outline">Outline button</Button>
        </div>
        <CodeSnippet className="my-2" language="tsx">{`<Button variant="outline">Outline button</Button>`}</CodeSnippet>
      </div>

      <div className="my-8">
        <div className="mb-2 flex place-content-center rounded-sm border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
          <Button variant="solid">Solid button</Button>
        </div>
        <CodeSnippet className="my-2" language="tsx">{`<Button variant="solid">Solid button</Button>`}</CodeSnippet>
      </div>

      <div className="my-8">
        <div className="mb-2 flex place-content-center rounded-sm border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
          <Button variant="text">Text button</Button>
        </div>
        <CodeSnippet className="my-2" language="tsx">{`<Button variant="text">Text button</Button>`}</CodeSnippet>
      </div>

      <div className="my-8">
        <div className="mb-2 flex place-content-center rounded-sm border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
          <Button
            variant="solid"
            className="border-blue-600! bg-blue-600! text-white!"
            onClick={() => alert('Hey! You clicked me!')}
            testId="click-me-button"
          >
            Click me
          </Button>
        </div>
        <CodeSnippet className="my-2" language="tsx">
          {`<Button
  variant="solid"
  className="border-blue-600! bg-blue-600! text-white!"
  onClick={() => alert('Hey! You clicked me!')}
  testId="click-me-button"
>
  Click me
</Button>`}
        </CodeSnippet>
      </div>
    </section>
  );
};

export default ButtonComponents;
