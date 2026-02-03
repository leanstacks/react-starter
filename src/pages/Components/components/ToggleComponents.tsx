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
import Toggle from 'common/components/Form/Toggle';
import Button from 'common/components/Button/Button';

/**
 * The `ToggleComponents` component renders a set of examples illustrating
 * the use of the `Toggle` component.
 */
const ToggleComponents = ({ className, testId = 'components-toggle' }: BaseComponentProps): JSX.Element => {
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
      description: 'Optional. Indicates if the control is disabled. Defaults to false.',
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
      name: 'required',
      description: 'Optional. Indicates if the control is required. Defaults to false.',
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
    isNotificationsEnabled: z.boolean(),
  });
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      isNotificationsEnabled: true,
    },
    mode: 'all',
    resolver: zodResolver(formSchema),
  });

  const onSubmit = noop;

  return (
    <section className={className} data-testid={testId}>
      <Heading level={2} className="mb-4">
        Toggle Component
      </Heading>

      <div className="my-8">
        <div className="mb-4">
          The <span className="font-mono font-bold">Toggle</span> component renders a button form control which may be
          used for binary inputs, i.e. true / false.
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
          This is the most basic use of the Toggle component. It has no label or supporting text. It is integrated with
          React Hook Form through the "control" and "reset" values obtained from the "useForm" hook (see the React Hook
          Form documentation for more information).
        </div>
        <div className="my-8">
          <div className="mb-2 flex flex-col place-content-center rounded-sm border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
            {/* Example */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <Toggle control={control} name="isNotificationsEnabled" className="mb-4" />
              <Button onClick={() => reset()} size="sm" variant="outline" className="ml-auto" testId="reset-1">
                Reset
              </Button>
            </form>
          </div>
          <CodeSnippet
            className="my-2"
            code={`<form onSubmit={handleSubmit(onSubmit)}>
  <Toggle control={control} name="isNotificationsEnabled" className="mb-4" />
  <Button
    onClick={() => reset()}
    size="sm"
    variant="outline"
    className="ml-auto"
  >
    Reset
  </Button>
</form>`}
          />
        </div>

        <Heading level={4} className="my-2">
          Labels
        </Heading>
        <div className="mb-4 opacity-85">
          Use the "label" property to associate a HTML label with the toggle. When the toggle is required, the label is
          styled to indicate.
        </div>
        <div className="my-8">
          <div className="mb-2 flex flex-col place-content-center rounded-sm border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
            {/* Example */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <Toggle control={control} name="isNotificationsEnabled" label="Enable Notifications" className="mb-4" />
              <Button onClick={() => reset()} size="sm" variant="outline" className="ml-auto" testId="reset-2">
                Reset
              </Button>
            </form>
          </div>
          <CodeSnippet
            className="my-2"
            code={`<form onSubmit={handleSubmit(onSubmit)}>
  <Toggle
    control={control}
    name="isNotificationsEnabled"
    label="Enable Notifications"
    className="mb-4"
  />
  <Button
    onClick={() => reset()}
    size="sm"
    variant="outline"
    className="ml-auto"
  >
    Reset
  </Button>
</form>`}
          />
        </div>

        <Heading level={4} className="my-2">
          Supporting Text
        </Heading>
        <div className="mb-4 opacity-85">
          Use the "supportingText" property to add helpful information below the toggle containing instructions,
          validation requirements, or other tips for entering information.
        </div>
        <div className="my-8">
          <div className="mb-2 flex flex-col place-content-center rounded-sm border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
            {/* Example */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <Toggle
                control={control}
                name="isNotificationsEnabled"
                label="Enable Notifications"
                supportingText="Enable to receive push notifications from this app."
                className="mb-4"
              />
              <Button onClick={() => reset()} size="sm" variant="outline" className="ml-auto" testId="reset-3">
                Reset
              </Button>
            </form>
          </div>
          <CodeSnippet
            className="my-2"
            code={`<form onSubmit={handleSubmit(onSubmit)}>
  <Toggle
    control={control}
    name="isNotificationsEnabled"
    label="Enable Notifications"
    supportingText="Enable to receive push notifications from this app."
    className="mb-4"
  />
  <Button
    onClick={() => reset()}
    size="sm"
    variant="outline"
    className="ml-auto"
  >
    Reset
  </Button>
</form>`}
          />
        </div>
      </div>
    </section>
  );
};

export default ToggleComponents;
