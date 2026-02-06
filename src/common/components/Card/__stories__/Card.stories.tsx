import type { Meta, StoryObj } from '@storybook/react-vite';

import Card from '../Card';

const meta = {
  title: 'Common/Card/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: { description: 'The content.' },
    className: { description: 'Additional CSS classes.' },
    testId: { description: 'The test identifier.' },
  },
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const CardComposition: Story = {
  render: (args) => (
    <Card {...args}>
      <Card.Header>
        <Card.Title>Card Title</Card.Title>
        <Card.Subtitle>with a subtitle</Card.Subtitle>
      </Card.Header>
      <Card.Body>
        Nul nostrud non dui elit nul proin. Consectetur magna mi justo dui. Aliquip proin incididunt ero tempor occaecat
        consequat ea. Neque esse minim occaecat massa. Reprehenderit consequat reprehenderit ipsum dui excepteur anim.
        Irure labore at at urna veniam enim consectetur ea. Et urna aliquip dapibus magna eiusmod commodo officia.
      </Card.Body>
      <Card.Separator />
      <Card.Footer className="text-right text-sm">Read more...</Card.Footer>
    </Card>
  ),
  args: {
    className: 'w-100',
  },
};

export const WithTopImage: Story = {
  render: (args) => (
    <Card {...args}>
      <Card.Image src="https://placehold.co/400x200" alt="placeholder" />
      <Card.Header>
        <Card.Title>Card Title</Card.Title>
        <Card.Subtitle>with a subtitle</Card.Subtitle>
      </Card.Header>
      <Card.Body>
        Nul nostrud non dui elit nul proin. Consectetur magna mi justo dui. Aliquip proin incididunt ero tempor occaecat
        consequat ea. Neque esse minim occaecat massa. Reprehenderit consequat reprehenderit ipsum dui excepteur anim.
        Irure labore at at urna veniam enim consectetur ea. Et urna aliquip dapibus magna eiusmod commodo officia.
      </Card.Body>
      <Card.Separator />
      <Card.Footer className="text-right text-sm">Read more...</Card.Footer>
    </Card>
  ),
  args: {
    className: 'w-100',
  },
};

export const WithBottomImage: Story = {
  render: (args) => (
    <Card {...args}>
      <Card.Header>
        <Card.Title>Card Title</Card.Title>
        <Card.Subtitle>with a subtitle</Card.Subtitle>
      </Card.Header>
      <Card.Body>
        Nul nostrud non dui elit nul proin. Consectetur magna mi justo dui. Aliquip proin incididunt ero tempor occaecat
        consequat ea. Neque esse minim occaecat massa. Reprehenderit consequat reprehenderit ipsum dui excepteur anim.
        Irure labore at at urna veniam enim consectetur ea. Et urna aliquip dapibus magna eiusmod commodo officia.
      </Card.Body>
      <Card.Separator />
      <Card.Footer className="text-right text-sm">Read more...</Card.Footer>
      <Card.Image src="https://placehold.co/400x200" alt="placeholder" />
    </Card>
  ),
  args: {
    className: 'w-100',
  },
};

export const WithMiddleImage: Story = {
  render: (args) => (
    <Card {...args}>
      <Card.Header>
        <Card.Title>Card Title</Card.Title>
        <Card.Subtitle>with a subtitle</Card.Subtitle>
      </Card.Header>
      <Card.Image src="https://placehold.co/400x200" alt="placeholder" />
      <Card.Body>
        Nul nostrud non dui elit nul proin. Consectetur magna mi justo dui. Aliquip proin incididunt ero tempor occaecat
        consequat ea. Neque esse minim occaecat massa. Reprehenderit consequat reprehenderit ipsum dui excepteur anim.
        Irure labore at at urna veniam enim consectetur ea. Et urna aliquip dapibus magna eiusmod commodo officia.
      </Card.Body>
      <Card.Separator />
      <Card.Footer className="text-right text-sm">Read more...</Card.Footer>
    </Card>
  ),
  args: {
    className: 'w-100',
  },
};
