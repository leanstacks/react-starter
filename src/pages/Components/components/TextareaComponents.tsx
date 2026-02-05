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
import Textarea from 'common/components/Form/Textarea';
import Button from 'common/components/Button/Button';

/**
 * The `TextareaComponents` component renders a set of examples illustrating
 * the use of the `Textarea` component.
 */
const TextareaComponents = ({ className, testId = 'components-textarea' }: BaseComponentProps) => {
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
      name: 'label',
      description: 'Optional. The label text.',
    },
    {
      name: 'name',
      description: 'The form control name.',
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
    bio: z
      .string()
      .min(1, { message: 'Your bio is required.' })
      .max(20, { message: 'Your bio may not be longer than 20 characters.' }),
  });

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      bio: '',
    },
    mode: 'all',
    resolver: zodResolver(formSchema),
  });

  const onSubmit = noop;

  return (
    <section className={className} data-testid={testId}>
      <Heading level={2} className="mb-4">
        Textarea Component
      </Heading>

      <div className="my-8">
        <div className="mb-4">
          The <span className="font-mono font-bold">Textarea</span> component renders a HTML textarea element. It is
          used to capture multiple lines of text. The Textarea component internally uses the Label, HelpText, and
          FieldError components.
        </div>
        <div className="mb-4">
          In addition to the custom properties listed below, the Textarea component also accepts all standard HTML
          textarea element attribute React properties.
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
          This is the most basic use of the Textarea component. It has no label or supporting text. It is integrated
          with React Hook Form through the "control" and "reset" values obtained from the "useForm" hook (see the React
          Hook Form documentation for more information).
        </div>
        <div className="mb-4 opacity-85">
          To view an example validation error message, enter more than 20 characters.
        </div>
        <div className="my-8">
          <div className="mb-2 flex flex-col place-content-center rounded-sm border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
            {/* Example */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <Textarea control={control} name="bio" className="mb-4" />
              <Button onClick={() => reset()} size="sm" variant="outline" className="ml-auto" testId="reset-1">
                Reset
              </Button>
            </form>
          </div>
          <CodeSnippet className="my-2" language="tsx">
            {`<form onSubmit={handleSubmit(onSubmit)}>
  <Textarea control={control} name="bio" className="mb-4" />
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
          Use the "label" property to associate a HTML label with the textarea. When the textarea is required, the label
          is styled to indicate.
        </div>
        <div className="my-8">
          <div className="mb-2 flex flex-col place-content-center rounded-sm border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
            {/* Example */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <Textarea control={control} name="bio" label="Biography" required className="mb-4" />
              <Button onClick={() => reset()} size="sm" variant="outline" className="ml-auto" testId="reset-2">
                Reset
              </Button>
            </form>
          </div>
          <CodeSnippet className="my-2" language="tsx">
            {`<form onSubmit={handleSubmit(onSubmit)}>
  <Textarea control={control} name="bio" label="Biography" required className="mb-4" />
  <Button
    onClick={() => reset()}
    size="sm"
    variant="outline"
    className="ml-auto"
    testId="reset-2"
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
          Use the "supportingText" property to add helpful information below the textarea containing instructions,
          validation requirements, or other tips for entering information.
        </div>
        <div className="my-8">
          <div className="mb-2 flex flex-col place-content-center rounded-sm border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
            {/* Example */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <Textarea
                control={control}
                name="bio"
                label="Biography"
                supportingText="Provide a short background so that others may get to know you."
                className="mb-4"
              />
              <Button onClick={() => reset()} size="sm" variant="outline" className="ml-auto" testId="reset-3">
                Reset
              </Button>
            </form>
          </div>
          <CodeSnippet className="my-2" language="tsx">
            {`<form onSubmit={handleSubmit(onSubmit)}>
  <Textarea
    control={control}
    name="bio"
    label="Biography"
    supportingText="Provide a short background so that others may get to know you."
    className="mb-4"
  />
  <Button
    onClick={() => reset()}
    size="sm"
    variant="outline"
    className="ml-auto"
    testId="reset-3"
  >
    Reset
  </Button>
</form>`}
          </CodeSnippet>
        </div>

        <Heading level={4} className="my-2">
          HTML textarea attributes
        </Heading>
        <div className="mb-4 opacity-85">
          You may use standard HTML textarea element attributes; however, take caution that you do not conflict with
          attributes supplied by React Hook Form such as "onChange" and "onBlur".
        </div>
        <div className="my-8">
          <div className="mb-2 flex flex-col place-content-center rounded-sm border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
            {/* Example */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <Textarea
                control={control}
                name="bio"
                label="Biography"
                supportingText="Provide a short background so that others may get to know you."
                placeholder="e.g. When I was young, my first job was pet grooming."
                rows={8}
                className="mb-4"
              />
              <Button onClick={() => reset()} size="sm" variant="outline" className="ml-auto" testId="reset-4">
                Reset
              </Button>
            </form>
          </div>
          <CodeSnippet className="my-2" language="tsx">
            {`<form onSubmit={handleSubmit(onSubmit)}>
  <Textarea
    control={control}
    name="bio"
    label="Biography"
    supportingText="Provide a short background so that others may get to know you."
    placeholder="e.g. When I was young, my first job was pet grooming."
    rows={8}
    className="mb-4"
  />
  <Button
    onClick={() => reset()}
    size="sm"
    variant="outline"
    className="ml-auto"
    testId="reset-4"
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

export default TextareaComponents;
