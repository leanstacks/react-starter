import type { Meta, StoryObj } from '@storybook/react-vite';

import Alert from '../Alert';

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
      options: ['danger', 'info', 'success', 'warning'],
    },
    testId: { description: 'The test identifier.' },
  },
} satisfies Meta<typeof Alert>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WithIcon: Story = {
  render: (args) => (
    <Alert {...args}>
      <Alert.Icon icon="circleExclamation" />
      <Alert.Title>Something unexpected has happened!</Alert.Title>
      <Alert.Description>
        Mollit proident aliqua vel pariatur dolor cupidatat sunt. Tempus quis elit officia ero exercitation labore a.
        Nisi commodo nunc id et. Labore facilisis do nibh fermentum exercitation voluptate. Aute et ut est justo veniam.
        Ut do convallis reprehenderit qui. Consectetur nibh nibh est pariatur tempor. Qos laoreet qui labore a neque
        incididunt.
      </Alert.Description>
    </Alert>
  ),
  args: {
    variant: 'danger',
  },
};

export const NoIcon: Story = {
  render: (args) => (
    <Alert {...args}>
      <Alert.Title>Something unexpected has happened!</Alert.Title>
      <Alert.Description>
        Mollit proident aliqua vel pariatur dolor cupidatat sunt. Tempus quis elit officia ero exercitation labore a.
        Nisi commodo nunc id et. Labore facilisis do nibh fermentum exercitation voluptate. Aute et ut est justo veniam.
        Ut do convallis reprehenderit qui. Consectetur nibh nibh est pariatur tempor. Qos laoreet qui labore a neque
        incididunt.
      </Alert.Description>
    </Alert>
  ),
  args: {
    variant: 'danger',
  },
};

export const DescriptionOnly: Story = {
  render: (args) => (
    <Alert {...args}>
      <Alert.Description>
        Mollit proident aliqua vel pariatur dolor cupidatat sunt. Tempus quis elit officia ero exercitation labore a.
        Nisi commodo nunc id et. Labore facilisis do nibh fermentum exercitation voluptate. Aute et ut est justo veniam.
        Ut do convallis reprehenderit qui. Consectetur nibh nibh est pariatur tempor. Qos laoreet qui labore a neque
        incididunt.
      </Alert.Description>
    </Alert>
  ),
  args: {
    variant: 'danger',
  },
};

export const TitleOnly: Story = {
  render: (args) => (
    <Alert {...args}>
      <Alert.Icon icon="circleExclamation" />
      <Alert.Title>Something unexpected has happened!</Alert.Title>
    </Alert>
  ),
  args: {
    variant: 'danger',
  },
};

export const Info: Story = {
  render: (args) => (
    <Alert {...args}>
      <Alert.Title>Something you should know...</Alert.Title>
      <Alert.Description>
        Mollit proident aliqua vel pariatur dolor cupidatat sunt. Tempus quis elit officia ero exercitation labore a.
        Nisi commodo nunc id et. Labore facilisis do nibh fermentum exercitation voluptate. Aute et ut est justo veniam.
        Ut do convallis reprehenderit qui. Consectetur nibh nibh est pariatur tempor. Qos laoreet qui labore a neque
        incididunt.
      </Alert.Description>
    </Alert>
  ),
  args: {
    variant: 'info',
  },
};

export const Warning: Story = {
  render: (args) => (
    <Alert {...args}>
      <Alert.Title>Proceed with caution!</Alert.Title>
      <Alert.Description>
        Mollit proident aliqua vel pariatur dolor cupidatat sunt. Tempus quis elit officia ero exercitation labore a.
        Nisi commodo nunc id et. Labore facilisis do nibh fermentum exercitation voluptate. Aute et ut est justo veniam.
        Ut do convallis reprehenderit qui. Consectetur nibh nibh est pariatur tempor. Qos laoreet qui labore a neque
        incididunt.
      </Alert.Description>
    </Alert>
  ),
  args: {
    variant: 'warning',
  },
};

export const Success: Story = {
  render: (args) => (
    <Alert {...args}>
      <Alert.Title>You did it!</Alert.Title>
      <Alert.Description>
        Mollit proident aliqua vel pariatur dolor cupidatat sunt. Tempus quis elit officia ero exercitation labore a.
        Nisi commodo nunc id et. Labore facilisis do nibh fermentum exercitation voluptate. Aute et ut est justo veniam.
        Ut do convallis reprehenderit qui. Consectetur nibh nibh est pariatur tempor. Qos laoreet qui labore a neque
        incididunt.
      </Alert.Description>
    </Alert>
  ),
  args: {
    variant: 'success',
  },
};
