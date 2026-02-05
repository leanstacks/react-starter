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
import Checkbox from 'common/components/Form/Checkbox';

/**
 * The `CheckboxComponents` component renders a set of examples illustrating
 * the use of the `Checkbox` component.
 */
const CheckboxComponents = ({ className, testId = 'components-checkbox' }: BaseComponentProps) => {
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
      description: 'Optional. Indicates if the checkbox is disabled.',
    },
    {
      name: 'label',
      description: 'The label text.',
    },
    {
      name: 'name',
      description: 'The form control name.',
    },
    {
      name: 'required',
      description: 'Optional. Indicates if the checkbox is required.',
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
    isAccepted: z.boolean().refine((val) => val === true, {
      message: 'You must accept the terms and conditions. ',
    }),
    isDisabledChecked: z.boolean(),
    isDisabledUnchecked: z.boolean(),
    isOptInMarketing: z.boolean(),
  });
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      isAccepted: false,
      isDisabledChecked: true,
      isDisabledUnchecked: false,
      isOptInMarketing: true,
    },
    mode: 'all',
    resolver: zodResolver(formSchema),
  });

  const onSubmit = noop;

  return (
    <section className={className} data-testid={testId}>
      <Heading level={2} className="mb-4">
        Checkbox Component
      </Heading>

      <div className="my-8">
        <div className="mb-4">
          The <span className="font-mono font-bold">Checkbox</span> component renders a HTML button that serves as a
          checkbox input. It is used to capture boolean input from a user. The checkbox can be checked or unchecked, and
          it can also be disabled to prevent user interaction. The component is integrated with React Hook Form,
          allowing for easy form validation and state management.
        </div>
        <div className="mb-4">
          The checkbox is styled using Tailwind CSS and can be customized with additional CSS class names. It also
          supports a label and optional supporting text to provide additional context or instructions to the user.
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
          This is the most basic use of the Checkbox component. It is integrated with React Hook Form through the
          "control" and "reset" values obtained from the "useForm" hook (see the React Hook Form documentation for more
          information).
        </div>
        <div className="mb-4 opacity-85">
          Use the "required" property to make the checkbox required. Use the "supportingText" property to add helpful
          information below the input containing instructions, validation requirements, or other tips for entering
          information.
        </div>
        <div className="mb-4 opacity-85">
          To view an example validation error message, check and then uncheck the terms and conditions checkbox.
        </div>
        <div className="my-8">
          <div className="mb-2 flex flex-col place-content-center rounded-sm border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
            {/* Example */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <Checkbox
                control={control}
                name="isAccepted"
                label="I accept the terms & conditions"
                className="mb-4"
                required
                supportingText="You must accept the terms and conditions to proceed."
                testId="checkbox-terms"
              />
              <Checkbox
                control={control}
                name="isOptInMarketing"
                label="I want to receive marketing emails"
                className="mb-4"
              />
              <Button onClick={() => reset()} size="sm" variant="outline" className="ml-auto" testId="reset-1">
                Reset
              </Button>
            </form>
          </div>
          <CodeSnippet
            className="my-2"
            code={`<form onSubmit={handleSubmit(onSubmit)}>
  <Checkbox
    control={control}
    name="isAccepted"
    label="I accept the terms & conditions"
    className="mb-4"
    required
    supportingText="You must accept the terms and conditions to proceed."
  />
  <Checkbox
    control={control}
    name="isOptInMarketing"
    label="I want to receive marketing emails"
    className="mb-4"
  />
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
          />
        </div>

        <Heading level={4} className="my-2">
          Disabled
        </Heading>
        <div className="mb-4 opacity-85">
          Use the "disabled" property to disable the checkbox. The checkbox will be unresponsive to user input and will
          be visually styled to indicate its disabled state.
        </div>
        <div className="my-8">
          <div className="mb-2 flex flex-col place-content-center rounded-sm border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
            {/* Example */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <Checkbox
                control={control}
                name="isDisabledChecked"
                label="I am checked and disabled"
                className="mb-4"
                disabled
              />
              <Checkbox
                control={control}
                name="isDisabledUnchecked"
                label="I am unchecked and disabled"
                className="mb-4"
                disabled
              />
            </form>
          </div>
          <CodeSnippet
            className="my-2"
            code={`<form onSubmit={handleSubmit(onSubmit)}>
  <Checkbox
    control={control}
    name="isDisabledChecked"
    label="I am checked and disabled"
    className="mb-4"
    disabled
  />
  <Checkbox
    control={control}
    name="isDisabledUnchecked"
    label="I am unchecked and disabled"
    className="mb-4"
    disabled
  />
</form>`}
          />
        </div>
      </div>
    </section>
  );
};

export default CheckboxComponents;
