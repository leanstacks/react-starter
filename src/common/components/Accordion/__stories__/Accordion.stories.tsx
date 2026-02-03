import type { Meta, StoryObj } from '@storybook/react';

import Accordion from '../Accordion';

const meta = {
  title: 'Common/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  argTypes: {
    children: { description: 'The content.' },
    className: { description: 'Additional CSS classes.' },
    defaultValue: { description: 'An array of default (or initial) active items.' },
    multiple: { description: 'Whether or not multiple items can be open at the same time.' },
    testId: { description: 'The test identifier.' },
  },
} satisfies Meta<typeof Accordion>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: (args) => (
    <Accordion {...args}>
      <Accordion.Item value="one">
        <Accordion.Trigger>One</Accordion.Trigger>
        <Accordion.Content>I am the content for item one!</Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="two">
        <Accordion.Trigger>Two</Accordion.Trigger>
        <Accordion.Content>I am the content for item two!</Accordion.Content>
      </Accordion.Item>
    </Accordion>
  ),
};

export const Multiple: Story = {
  args: {
    multiple: true,
  },
  render: (args) => (
    <Accordion {...args}>
      <Accordion.Item value="one">
        <Accordion.Trigger>One</Accordion.Trigger>
        <Accordion.Content>I am the content for item one!</Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="two">
        <Accordion.Trigger>Two</Accordion.Trigger>
        <Accordion.Content>I am the content for item two!</Accordion.Content>
      </Accordion.Item>
    </Accordion>
  ),
};

export const DefaultActive: Story = {
  args: {
    defaultValue: ['two'],
  },
  render: (args) => (
    <Accordion {...args}>
      <Accordion.Item value="one">
        <Accordion.Trigger>One</Accordion.Trigger>
        <Accordion.Content>I am the content for item one!</Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="two">
        <Accordion.Trigger>Two</Accordion.Trigger>
        <Accordion.Content>I am the content for item two!</Accordion.Content>
      </Accordion.Item>
    </Accordion>
  ),
};

export const MultipleDefaultActive: Story = {
  args: {
    defaultValue: ['one', 'two'],
    multiple: true,
  },
  render: (args) => (
    <Accordion {...args}>
      <Accordion.Item value="one">
        <Accordion.Trigger>One</Accordion.Trigger>
        <Accordion.Content>I am the content for item one!</Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="two">
        <Accordion.Trigger>Two</Accordion.Trigger>
        <Accordion.Content>I am the content for item two!</Accordion.Content>
      </Accordion.Item>
    </Accordion>
  ),
};

export const RichContent: Story = {
  render: (args) => (
    <Accordion {...args}>
      <Accordion.Item value="prologue">
        <Accordion.Trigger>Prologue</Accordion.Trigger>
        <Accordion.Content>
          <div className="mb-4 text-sm font-semibold">
            <span className="text-2xl">O</span>rnare occaecat aliquip voluptate esse est occaecat cillum nam. Eiusmod
            aliquip magna dapibus ut ut deserunt. Justo nisi mi nunc nunc cras. Ipsum quam officia dapibus et aenean
            enim. Bibendum do convallis donec eiusmod elit arcu est. Quam ero ea massa culpa adipiscing. Justo neque
            aute qui nisi. Convallis nisi et irure mollit dui aliqua fugait laoreet.
          </div>
          <div className="mb-4 text-sm">
            Mollit urna ut ut pulvinar ullamco. Ero enim eiusmod qui in velit. Posuere dapibus cras culpa ligula magna.
            Do neque urna nostrud tempus officia. Consequat condimentum a eiusmod cillum. Pulvinar elit qui pulvinar
            donec non aute dolor. Sunt aliquip dapibus mi vitae labore.
          </div>
          <div className="text-sm">
            Irure laoreet ligula justo sapien magna ea vel. Proident mollit aenean aliquip magna ullamco ipsum tempus
            incididunt. Do aenean eiusmod amet dolor ipsum sunt sit. Irure reprehenderit ad cupidatat labore bibendum
            convallis. Tempor deserunt nam lorem cras excepteur a bibendum egestas. Donec labore duis esse quam. Dui
            culpa cupidatat cras cillum vel ornare pulvinar dui. Duis donec aenean vel adipiscing ligula.
          </div>
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="chapter-1">
        <Accordion.Trigger>Chapter 1</Accordion.Trigger>
        <Accordion.Content>
          <div className="mb-4 text-sm font-semibold">
            <span className="text-2xl">E</span>gestas justo donec laboris justo id laborum aliqua. Nulla dapibus aute
            aenean donec vitae enim pulvinar donec. Neque cupidatat facilisis sint laboris magna ea. Anim ero proident
            laboris fugait. Tempus labore dui vel laborum esse donec pariatur. Consequat id laoreet mollit fugait id
            cillum anim.
          </div>
          <img src="https://placehold.co/400x600" alt="Placeholder" className="mb-4" />
          <div className="text-sm">
            Pulvinar e nibh veniam arcu at aliqua pariatur. Enim cillum cupidatat elit elit occaecat reprehenderit. Nibh
            sed justo quam convallis fermentum e aute. Incididunt ero in ornare anim voluptate incididunt nul. Do
            exercitation bibendum nulla lorem est nul. Irure labore ligula dui qos culpa aliquip condimentum. Proin
            excepteur incididunt do commodo deserunt egestas.
          </div>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  ),
};
