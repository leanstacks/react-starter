import type { Meta, StoryObj } from '@storybook/react-vite';

import FAIcon from 'common/components/Icon/FAIcon';

import Label from '../Label';

const meta = {
  title: 'Common/Form/Label',
  component: Label,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      description: 'The content.',
    },
    className: { description: 'Additional CSS classes.' },
    htmlFor: { description: 'The `id` of the form control to which this label is associated.' },
    testId: { description: 'The test identifier.' },
  },
  args: {
    children: 'Label Text',
  },
} satisfies Meta<typeof Label>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Styled: Story = {
  args: {
    className: 'uppercase text-cyan-600',
  },
};

export const Required: Story = {
  args: {
    required: true,
  },
};

export const WithIcon: Story = {
  args: {
    children: (
      <>
        <span className="me-2">Label Text</span>
        <FAIcon icon="circleInfo" />
      </>
    ),
  },
};
