import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import noop from 'lodash/noop';

import { BaseComponentProps } from 'common/utils/types';
import { ComponentProperty } from '../model/components';
import Table from 'common/components/Table/Table';
import CodeSnippet from 'common/components/Text/CodeSnippet';
import Heading from 'common/components/Text/Heading';
import Button from 'common/components/Button/Button';
import Toast from 'common/components/Toast/Toast';
import { useToasts } from 'common/hooks/useToasts';

/**
 * The `ToastComponents` component renders a set of examples illustrating
 * the use of the `Toast` component.
 */
const ToastComponents = ({ className, testId = 'components-toast' }: BaseComponentProps): JSX.Element => {
  const data: ComponentProperty[] = [
    {
      name: 'className',
      description: 'Optional. Additional CSS class names.',
    },
    {
      name: 'dismiss',
      description: 'A function called when the Toast dismisses.',
    },
    {
      name: 'testId',
      description: 'Optional. Identifier for testing.',
    },
    {
      name: 'toast',
      description: 'The Toast object.',
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

  /* set up for examples */
  const { createToast } = useToasts();

  return (
    <section className={className} data-testid={testId}>
      <Heading level={2} className="mb-4">
        Toast Component
      </Heading>

      <div className="my-8">
        <div className="mb-4">
          The <span className="font-mono font-bold">Toast</span> component displays a small, dismissible message to the
          user.
        </div>

        <div className="mb-4">
          Toast messages are typically used to inform the user of something that happened in the background such as
          saving information. Or they may be used when some adverse action happens, such as an error.
        </div>

        <div className="mb-4">
          An application uses the <span className="font-mono font-bold">ToastsContext</span> and{' '}
          <span className="font-mono font-bold">ToastsProvider</span> to display Toasts for the application in a
          standardized way. Toasts are created programmatically in React components using the{' '}
          <span className="font-mono font-bold">useToasts</span> hook.
        </div>

        <CodeSnippet
          className="my-2"
          code={`const { createToast } = useToasts();
createToast({
  text: "Item saved successfully.",
  isAutoDismiss: true,
  variant: "success",
});
`}
        />

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
          This is the most basic use of the Toast component. This example illustrates how a toast detail object passed
          to the Toast component is rendered. When using the "createToast" function, the "id" and "createdAt" properties
          are automatically generated. The default variant is "info".
        </div>
        <div className="my-8">
          <div className="mb-2 flex flex-col place-content-center rounded-sm border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
            {/* Example */}
            <Toast
              toast={{
                id: '1',
                text: 'This is the toast message.',
                createdAt: '2025-03-23T08:29:00',
                isAutoDismiss: false,
              }}
              dismiss={noop}
            />
          </div>
          <CodeSnippet
            className="my-2"
            code={`<Toast
  toast={{
    id: '1',
    text: 'This is the toast message.',
    createdAt: '2025-03-23T08:29:00',
    isAutoDismiss: false,
  }}
  dismiss={noop}
/>`}
          />
        </div>

        <Heading level={4} className="my-2">
          Colors
        </Heading>
        <div className="mb-4 opacity-85">
          Use the "variant" property to adjust the color of the Toast component. The available variants are "info",
          "danger", and "success".
        </div>
        <div className="my-8">
          <div className="mb-2 flex flex-col place-content-center rounded-sm border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
            {/* Example */}
            <div className="flex flex-col gap-4">
              <Toast
                toast={{
                  id: '1',
                  text: 'This is some information which seems relevant.',
                  createdAt: '2025-03-23T08:29:00',
                  isAutoDismiss: false,
                  variant: 'info',
                }}
                dismiss={noop}
              />
              <Toast
                toast={{
                  id: '1',
                  text: 'Oh no! Something is not right.',
                  createdAt: '2025-03-23T08:29:00',
                  isAutoDismiss: false,
                  variant: 'danger',
                }}
                dismiss={noop}
              />
              <Toast
                toast={{
                  id: '1',
                  text: 'Amazing! You did something awesome!',
                  createdAt: '2025-03-23T08:29:00',
                  isAutoDismiss: false,
                  variant: 'success',
                }}
                dismiss={noop}
              />
            </div>
          </div>
          <CodeSnippet
            className="my-2"
            code={`<div className="flex flex-col gap-4">
  <Toast
    toast={{
      id: '1',
      text: 'This is some information which seems relevant.',
      createdAt: '2025-03-23T08:29:00',
      isAutoDismiss: false,
      variant: 'info',
    }}
    dismiss={noop}
  />
  <Toast
    toast={{
      id: '1',
      text: 'Oh no! Something is not right.',
      createdAt: '2025-03-23T08:29:00',
      isAutoDismiss: false,
      variant: 'danger',
    }}
    dismiss={noop}
  />
  <Toast
    toast={{
      id: '1',
      text: 'Amazing! You did something awesome!',
      createdAt: '2025-03-23T08:29:00',
      isAutoDismiss: false,
      variant: 'success',
    }}
    dismiss={noop}
  />
</div>`}
          />
        </div>

        <Heading level={4} className="my-2">
          Auto Dismiss
        </Heading>
        <div className="mb-4 opacity-85">
          Use the "isAutoDismiss" property to automatically dismiss the Toast after a set period of time. The default
          time is 5 seconds. The default timeout can be adjusted in the application configuration.
        </div>
        <div className="my-8">
          <div className="mb-2 flex flex-col place-content-center rounded-sm border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
            {/* Example */}
            <Toast
              toast={{
                id: '1',
                text: 'Click my close button to watch my animation.',
                createdAt: '2025-03-23T08:29:00',
                isAutoDismiss: false,
              }}
              dismiss={noop}
            />
          </div>
          <CodeSnippet
            className="my-2"
            code={`<Toast
  toast={{
    id: '1',
    text: 'Click my close button to watch my animation.',
    createdAt: '2025-03-23T08:29:00',
    isAutoDismiss: true,
  }}
  dismiss={noop}
/>`}
          />
        </div>

        <Heading level={4} className="my-2">
          Hooks Example
        </Heading>
        <div className="mb-4 opacity-85">
          This example demonstrates how to use the "useToasts" hook to create a Toast. In most situations, this is how
          you will actually create toast messages. The "createToast" function is used to create a new Toast. Simply pass
          a partial toast detail object containing the text, auto-dismiss, and variant properties.
        </div>
        <div className="my-8">
          <div className="mb-2 flex flex-col place-content-center rounded-sm border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
            {/* Example */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Button
                onClick={() => {
                  createToast({
                    text: 'I have a really long message. Neque proin aenean vitae nunc justo et cras at. Elit labore sit cupidatat sit fermentum. Arcu ut ea magna culpa ad enim laborum fermentum. Vitae nulla pariatur ornare in a. Egestas ad dapibus excepteur non at dui. Officia arcu cupidatat ut urna do. Mi esse et justo laborum aute ex.',
                    isAutoDismiss: true,
                  });
                }}
                testId="button-auto-dismiss"
              >
                Auto-Dismiss
              </Button>
              <Button
                onClick={() => {
                  createToast({
                    text: 'I will remain on screen until you dismiss me.',
                    isAutoDismiss: false,
                    variant: 'danger',
                  });
                }}
                testId="button-manual-dismiss"
              >
                Manual Dismiss
              </Button>
            </div>
          </div>
          <CodeSnippet
            className="my-2"
            code={`const { createToast } = useToasts();

return(
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
    <Button
      onClick={() => {
        createToast({
          text: 'I have a really long message. Neque proin aenean vitae nunc justo et cras at. Elit labore sit cupidatat sit fermentum. Arcu ut ea magna culpa ad enim laborum fermentum. Vitae nulla pariatur ornare in a. Egestas ad dapibus excepteur non at dui. Officia arcu cupidatat ut urna do. Mi esse et justo laborum aute ex.',
          isAutoDismiss: true,
        });
      }}
    >
      Auto-Dismiss
    </Button>
    <Button
      onClick={() => {
        createToast({
          text: 'I will remain on screen until you dismiss me.',
          isAutoDismiss: false,
          variant: 'danger',
        });
      }}
    >
      Manual Dismiss
    </Button>
  </div>
);`}
          />
        </div>
      </div>
    </section>
  );
};

export default ToastComponents;
