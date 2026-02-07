import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { useForm } from 'react-hook-form';
import noop from 'lodash/noop';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { BaseComponentProps } from 'common/utils/types';
import { ComponentProperty } from '../model/components';
import Table from 'common/components/Table/Table';
import CodeSnippet from 'common/components/Text/CodeSnippet';
import Heading from 'common/components/Text/Heading';
import Button from 'common/components/Button/Button';
import RadioGroup from 'common/components/Form/RadioGroup';

/**
 * The `RadioGroupComponents` component renders a set of examples illustrating
 * the use of the `RadioGroup` component.
 */
const RadioGroupComponents = ({ className, testId = 'components-radio-group' }: BaseComponentProps) => {
  const data: ComponentProperty[] = [
    {
      name: 'className',
      description: 'Optional. Additional CSS class names.',
    },
    {
      name: 'control',
      description: 'The React Hook Form control object.',
    },
    {
      name: 'disabled',
      description: 'Optional. Indicates if the field is disabled.',
    },
    {
      name: 'label',
      description: 'Optional. The label text.',
    },
    {
      name: 'name',
      description: 'The form control name.',
    },
    {
      name: 'orientation',
      description: 'Optional. The orientation of the RadioGroup. Default: vertical.',
    },
    {
      name: 'required',
      description: 'Optional. Indicates if the field is required.',
    },
    {
      name: 'supportingText',
      description: 'Optional. The supporting or help text.',
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

  /* example setup */
  const formSchema = z.object({
    color: z
      .string()
      .min(1, { message: 'Please select a color.' })
      .refine(
        (val) => {
          return ['red', 'blue'].includes(val);
        },
        { message: 'Must be a primary color.' },
      ),
  });
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      color: '',
    },
    mode: 'all',
    resolver: zodResolver(formSchema),
  });

  const onSubmit = noop;

  return (
    <section className={className} data-testid={testId}>
      <Heading level={2} className="mb-4">
        Radio Group Component
      </Heading>

      <div className="my-8">
        <div className="mb-4">
          The <span className="font-mono font-bold">RadioGroup</span> component renders a HTML input element of type
          "radio". It is used to capture a single choice from a group of options. The RadioGroup component internally
          uses the Label, HelpText, and FieldError components.
        </div>
        <div className="mb-4">
          In addition to the custom properties listed below, the RadioGroup component also accepts most standard HTML
          input element attribute React properties.
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
          This is the most basic use of the RadioGroup component. It has no label or supporting text. It is integrated
          with React Hook Form through the "control" and "reset" values obtained from the "useForm" hook (see the React
          Hook Form documentation for more information).
        </div>
        <div className="mb-4 opacity-85">To view an example validation error message, select "Green".</div>
        <div className="my-8">
          <div className="mb-2 flex flex-col place-content-center rounded-sm border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
            {/* Example */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <RadioGroup name="color" control={control} className="mb-4" testId="radio-group-1">
                <RadioGroup.Item id="color-red" value="red" label="Red" />
                <RadioGroup.Item id="color-green" value="green" label="Green" testId="color-green-1" />
                <RadioGroup.Item id="color-blue" value="blue" label="Blue" />
              </RadioGroup>
              <Button onClick={() => reset()} size="sm" variant="outline" className="ml-auto" testId="reset-1">
                Reset
              </Button>
            </form>
          </div>
          <CodeSnippet className="my-2" language="tsx">
            {`<form onSubmit={handleSubmit(onSubmit)}>
  <RadioGroup name="color" control={control} className="mb-4">
    <RadioGroup.Item id="color-red" value="red" label="Red" />
    <RadioGroup.Item id="color-green" value="green" label="Green" />
    <RadioGroup.Item id="color-blue" value="blue" label="Blue" />
  </RadioGroup>
  <Button
    onClick={() => reset()}
    size="sm"
    variant="outline"
    className="ml-auto"
    testId="reset-1"
  >
    Reset
  </Button>
</form>`}
          </CodeSnippet>
        </div>

        <Heading level={4} className="my-2">
          Labels
        </Heading>
        <div className="mb-4 opacity-85">
          Use the "label" property to add a label to the RadioGroup component. The label will be displayed above the
          RadioGroup. When the RadioGroup is required, the label is styuled to indicate.
        </div>
        <div className="my-8">
          <div className="mb-2 flex flex-col place-content-center rounded-sm border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
            {/* Example */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <RadioGroup name="color" control={control} className="mb-4" label="Color" required>
                <RadioGroup.Item id="color-red" value="red" label="Red" />
                <RadioGroup.Item id="color-green" value="green" label="Green" />
                <RadioGroup.Item id="color-blue" value="blue" label="Blue" />
              </RadioGroup>
              <Button onClick={() => reset()} size="sm" variant="outline" className="ml-auto" testId="reset-2">
                Reset
              </Button>
            </form>
          </div>
          <CodeSnippet className="my-2" language="tsx">
            {`<form onSubmit={handleSubmit(onSubmit)}>
  <RadioGroup name="color" control={control} className="mb-4" label="Color" required>
    <RadioGroup.Item id="color-red" value="red" label="Red" />
    <RadioGroup.Item id="color-green" value="green" label="Green" />
    <RadioGroup.Item id="color-blue" value="blue" label="Blue" />
  </RadioGroup>
  <Button
    onClick={() => reset()}
    size="sm"
    variant="outline"
    className="ml-auto"
    testId="reset-1"
  >
    Reset
  </Button>
</form>`}
          </CodeSnippet>
        </div>

        <Heading level={4} className="my-2">
          Supporting Text
        </Heading>
        <div className="mb-4 opacity-85">
          Use the "supportingText" property to add helpful information, validation requirements, or other tips for
          entering information to the RadioGroup component. The supporting text will be displayed below the RadioGroup.
        </div>
        <div className="my-8">
          <div className="mb-2 flex flex-col place-content-center rounded-sm border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
            {/* Example */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <RadioGroup
                name="color"
                control={control}
                className="mb-4"
                label="Color"
                supportingText="Select a primary color."
                required
              >
                <RadioGroup.Item id="color-red" value="red" label="Red" />
                <RadioGroup.Item id="color-green" value="green" label="Green" />
                <RadioGroup.Item id="color-blue" value="blue" label="Blue" />
              </RadioGroup>
              <Button onClick={() => reset()} size="sm" variant="outline" className="ml-auto" testId="reset-3">
                Reset
              </Button>
            </form>
          </div>
          <CodeSnippet className="my-2" language="tsx">
            {`<form onSubmit={handleSubmit(onSubmit)}>
  <RadioGroup
    name="color"
    control={control}
    className="mb-4"
    label="Color"
    supportingText="Select a primary color."
    required
  >
    <RadioGroup.Item id="color-red" value="red" label="Red" />
    <RadioGroup.Item id="color-green" value="green" label="Green" />
    <RadioGroup.Item id="color-blue" value="blue" label="Blue" />
  </RadioGroup>
  <Button
    onClick={() => reset()}
    size="sm"
    variant="outline"
    className="ml-auto"
    testId="reset-1"
  >
    Reset
  </Button>
</form>`}
          </CodeSnippet>
        </div>

        <Heading level={4} className="my-2">
          Orientation
        </Heading>
        <div className="mb-4 opacity-85">
          Use the "orientation" property to set the orientation of the RadioGroup component. The default orientation is
          "vertical". The "horizontal" orientation displays the RadioGroup items in a single row.
        </div>
        <div className="my-8">
          <div className="mb-2 flex flex-col place-content-center rounded-sm border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
            {/* Example */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <RadioGroup
                name="color"
                control={control}
                className="mb-4"
                orientation="horizontal"
                label="Color"
                supportingText="Select a primary color."
                required
              >
                <RadioGroup.Item id="color-red" value="red" label="Red" />
                <RadioGroup.Item id="color-green" value="green" label="Green" />
                <RadioGroup.Item id="color-blue" value="blue" label="Blue" />
              </RadioGroup>
              <Button onClick={() => reset()} size="sm" variant="outline" className="ml-auto" testId="reset-4">
                Reset
              </Button>
            </form>
          </div>
          <CodeSnippet className="my-2" language="tsx">
            {`<form onSubmit={handleSubmit(onSubmit)}>
  <RadioGroup
    name="color"
    control={control}
    className="mb-4"
    orientation="horizontal"
    label="Color"
    supportingText="Select a primary color."
    required
  >
    <RadioGroup.Item id="color-red" value="red" label="Red" />
    <RadioGroup.Item id="color-green" value="green" label="Green" />
    <RadioGroup.Item id="color-blue" value="blue" label="Blue" />
  </RadioGroup>
  <Button
    onClick={() => reset()}
    size="sm"
    variant="outline"
    className="ml-auto"
    testId="reset-1"
  >
    Reset
  </Button>
</form>`}
          </CodeSnippet>
        </div>

        <Heading level={4} className="my-2">
          Disabled Group
        </Heading>
        <div className="mb-4 opacity-85">
          Use the "disabled" property to disable the RadioGroup component. The disabled RadioGroup will not respond to
          user input. The disabled state is styled to indicate that the RadioGroup is not interactive.
        </div>
        <div className="my-8">
          <div className="mb-2 flex flex-col place-content-center rounded-sm border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
            {/* Example */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <RadioGroup
                name="color"
                control={control}
                className="mb-4"
                label="Color"
                supportingText="Select a primary color."
                disabled
              >
                <RadioGroup.Item id="color-red" value="red" label="Red" />
                <RadioGroup.Item id="color-green" value="green" label="Green" />
                <RadioGroup.Item id="color-blue" value="blue" label="Blue" />
              </RadioGroup>
              <Button onClick={() => reset()} size="sm" variant="outline" className="ml-auto" testId="reset-5">
                Reset
              </Button>
            </form>
          </div>
          <CodeSnippet className="my-2" language="tsx">
            {`<form onSubmit={handleSubmit(onSubmit)}>
  <RadioGroup
    name="color"
    control={control}
    className="mb-4"
    label="Color"
    supportingText="Select a primary color."
    disabled
  >
    <RadioGroup.Item id="color-red" value="red" label="Red" />
    <RadioGroup.Item id="color-green" value="green" label="Green" />
    <RadioGroup.Item id="color-blue" value="blue" label="Blue" />
  </RadioGroup>
  <Button
    onClick={() => reset()}
    size="sm"
    variant="outline"
    className="ml-auto"
    testId="reset-1"
  >
    Reset
  </Button>
</form>`}
          </CodeSnippet>
        </div>

        <Heading level={4} className="my-2">
          Disabled Item
        </Heading>
        <div className="mb-4 opacity-85">
          Use the "disabled" property to disable individual RadioGroup.Item components. The disabled Item will not
          respond to user input. The disabled state is styled to indicate that the Item is not interactive.
        </div>
        <div className="my-8">
          <div className="mb-2 flex flex-col place-content-center rounded-sm border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
            {/* Example */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <RadioGroup
                name="color"
                control={control}
                className="mb-4"
                label="Color"
                supportingText="Select a primary color."
                required
              >
                <RadioGroup.Item id="color-red" value="red" label="Red" />
                <RadioGroup.Item id="color-green" value="green" label="Green" />
                <RadioGroup.Item id="color-blue" value="blue" label="Blue" disabled />
              </RadioGroup>
              <Button onClick={() => reset()} size="sm" variant="outline" className="ml-auto" testId="reset-6">
                Reset
              </Button>
            </form>
          </div>
          <CodeSnippet className="my-2" language="tsx">
            {`<form onSubmit={handleSubmit(onSubmit)}>
  <RadioGroup
    name="color"
    control={control}
    className="mb-4"
    label="Color"
    supportingText="Select a primary color."
    required
  >
    <RadioGroup.Item id="color-red" value="red" label="Red" />
    <RadioGroup.Item id="color-green" value="green" label="Green" />
    <RadioGroup.Item id="color-blue" value="blue" label="Blue" disabled />
  </RadioGroup>
  <Button
    onClick={() => reset()}
    size="sm"
    variant="outline"
    className="ml-auto"
    testId="reset-1"
  >
    Reset
  </Button>
</form>`}
          </CodeSnippet>
        </div>
      </div>
    </section>
  );
};

export default RadioGroupComponents;
