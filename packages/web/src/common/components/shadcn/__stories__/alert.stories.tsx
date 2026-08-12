import type { Meta, StoryObj } from '@storybook/react-vite';
import { CircleAlertIcon, Info } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '../alert';

const meta = {
  title: 'Common/Alert/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    children: { description: 'The content.' },
    className: { description: 'Additional CSS classes.' },
    variant: {
      description: 'Optional. The style variant.',
      control: { type: 'select' },
      options: ['default', 'destructive', 'info', 'success', 'warning'],
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WithIcon: Story = {
  render: (args) => (
    <Alert {...args}>
      <CircleAlertIcon />
      <AlertTitle>Something unexpected has happened!</AlertTitle>
      <AlertDescription>
        Mollit proident aliqua vel pariatur dolor cupidatat sunt. Tempus quis elit officia ero exercitation labore a.
        Nisi commodo nunc id et. Labore facilisis do nibh fermentum exercitation voluptate. Aute et ut est justo veniam.
        Ut do convallis reprehenderit qui. Consectetur nibh nibh est pariatur tempor. Qos laoreet qui labore a neque
        incididunt.
      </AlertDescription>
    </Alert>
  ),
  args: {
    variant: 'destructive',
  },
};

export const NoIcon: Story = {
  render: (args) => (
    <Alert {...args}>
      <AlertTitle>Something unexpected has happened!</AlertTitle>
      <AlertDescription>
        Mollit proident aliqua vel pariatur dolor cupidatat sunt. Tempus quis elit officia ero exercitation labore a.
        Nisi commodo nunc id et. Labore facilisis do nibh fermentum exercitation voluptate. Aute et ut est justo veniam.
        Ut do convallis reprehenderit qui. Consectetur nibh nibh est pariatur tempor. Qos laoreet qui labore a neque
        incididunt.
      </AlertDescription>
    </Alert>
  ),
  args: {
    variant: 'destructive',
  },
};

export const DescriptionOnly: Story = {
  render: (args) => (
    <Alert {...args}>
      <AlertDescription>
        Mollit proident aliqua vel pariatur dolor cupidatat sunt. Tempus quis elit officia ero exercitation labore a.
        Nisi commodo nunc id et. Labore facilisis do nibh fermentum exercitation voluptate. Aute et ut est justo veniam.
        Ut do convallis reprehenderit qui. Consectetur nibh nibh est pariatur tempor. Qos laoreet qui labore a neque
        incididunt.
      </AlertDescription>
    </Alert>
  ),
  args: {
    variant: 'destructive',
  },
};

export const TitleOnly: Story = {
  render: (args) => (
    <Alert {...args}>
      <CircleAlertIcon />
      <AlertTitle>Something unexpected has happened!</AlertTitle>
    </Alert>
  ),
  args: {
    variant: 'destructive',
  },
};

export const DefaultVariant: Story = {
  render: (args) => (
    <Alert {...args}>
      <Info />
      <AlertTitle>Something you should know...</AlertTitle>
      <AlertDescription>
        Mollit proident aliqua vel pariatur dolor cupidatat sunt. Tempus quis elit officia ero exercitation labore a.
        Nisi commodo nunc id et. Labore facilisis do nibh fermentum exercitation voluptate. Aute et ut est justo veniam.
        Ut do convallis reprehenderit qui. Consectetur nibh nibh est pariatur tempor. Qos laoreet qui labore a neque
        incididunt.
      </AlertDescription>
    </Alert>
  ),
};

export const DestructiveVariant: Story = {
  render: (args) => (
    <Alert {...args}>
      <CircleAlertIcon />
      <AlertTitle>Something unexpected has happened!</AlertTitle>
      <AlertDescription>
        Mollit proident aliqua vel pariatur dolor cupidatat sunt. Tempus quis elit officia ero exercitation labore a.
        Nisi commodo nunc id et. Labore facilisis do nibh fermentum exercitation voluptate. Aute et ut est justo veniam.
        Ut do convallis reprehenderit qui. Consectetur nibh nibh est pariatur tempor. Qos laoreet qui labore a neque
        incididunt.
      </AlertDescription>
    </Alert>
  ),
  args: {
    variant: 'destructive',
  },
};

export const WarningVariant: Story = {
  render: (args) => (
    <Alert {...args}>
      <AlertTitle>Proceed with caution!</AlertTitle>
      <AlertDescription>
        Mollit proident aliqua vel pariatur dolor cupidatat sunt. Tempus quis elit officia ero exercitation labore a.
        Nisi commodo nunc id et. Labore facilisis do nibh fermentum exercitation voluptate. Aute et ut est justo veniam.
        Ut do convallis reprehenderit qui. Consectetur nibh nibh est pariatur tempor. Qos laoreet qui labore a neque
        incididunt.
      </AlertDescription>
    </Alert>
  ),
  args: {
    variant: 'warning',
  },
};

export const SuccessVariant: Story = {
  render: (args) => (
    <Alert {...args}>
      <AlertTitle>You did it!</AlertTitle>
      <AlertDescription>
        Mollit proident aliqua vel pariatur dolor cupidatat sunt. Tempus quis elit officia ero exercitation labore a.
        Nisi commodo nunc id et. Labore facilisis do nibh fermentum exercitation voluptate. Aute et ut est justo veniam.
        Ut do convallis reprehenderit qui. Consectetur nibh nibh est pariatur tempor. Qos laoreet qui labore a neque
        incididunt.
      </AlertDescription>
    </Alert>
  ),
  args: {
    variant: 'success',
  },
};
