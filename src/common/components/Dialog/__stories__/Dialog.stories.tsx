import type { Meta, StoryObj } from '@storybook/react-vite';

import Dialog from '../Dialog';
import Button from 'common/components/Button/Button';

const meta = {
  title: 'Common/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      description: 'The dialog content. May contain a ReactNode or a render props function.',
    },
    className: { description: 'Additional CSS classes.' },
    testId: { description: 'The test identifier.' },
  },
} satisfies Meta<typeof Dialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ConfirmDelete: Story = {
  render: (args) => (
    <Dialog {...args}>
      <Dialog.Trigger>
        <Button>Open</Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>Are you sure?</Dialog.Title>
          <Dialog.Subtitle>Deletion cannot be undone.</Dialog.Subtitle>
        </Dialog.Header>
        <Dialog.Body>
          Delete task <span className="font-bold">18 Use React</span>.
        </Dialog.Body>
        <Dialog.Separator />
        <Dialog.Footer>
          <Dialog.ButtonBar>
            <Dialog.Button>Cancel</Dialog.Button>
            <Dialog.Button variant="danger">Delete</Dialog.Button>
          </Dialog.ButtonBar>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  ),
};

export const LoremIpsum: Story = {
  render: (args) => (
    <Dialog {...args}>
      {({ close }) => (
        <>
          <Dialog.Trigger>
            <Button>Open</Button>
          </Dialog.Trigger>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Amet at duis deserunt ad ad ornare.</Dialog.Title>
              <Dialog.Subtitle>
                Nam cupidatat duis dolore magna aute posuere. Esse arcu morbi quis consequat facilisis lorem pulvinar.
              </Dialog.Subtitle>
            </Dialog.Header>
            <Dialog.Body>
              <div className="mb-2">
                Cupidatat excepteur mi magna nisi sint. Sint officia donec duis egestas cupidatat quam consectetur
                fermentum. Egestas incididunt esse magna ex occaecat nunc arcu. Adipiscing sit laborum adipiscing aliqua
                tempor amet. Tempus laboris lorem deserunt aute sint ullamco magna pariatur. Ipsum elit justo cupidatat
                ea a exercitation pariatur.
              </div>
              <div>
                Mi tempor incididunt duis ullamco morbi minim. Proin condimentum adipiscing officia et ipsum nunc. Est
                et est quam labore sit velit. Eiusmod laboris facilisis aliquip nulla aliqua occaecat quam mi. Ligula
                aute fermentum tempus dolore qui dolore culpa. Quis quam ligula nulla exercitation exercitation nibh.
                Bibendum laboris mollit vitae sunt elit aenean a non. Neque dui proident cupidatat proident morbi sunt
                sapien.
              </div>
            </Dialog.Body>
            <Dialog.Separator />
            <Dialog.Footer>
              <Dialog.ButtonBar>
                <Dialog.Button onClick={() => close()}>Cancel</Dialog.Button>
                <Dialog.Button onClick={() => close()} variant="primary">
                  Accept
                </Dialog.Button>
              </Dialog.ButtonBar>
            </Dialog.Footer>
          </Dialog.Content>
        </>
      )}
    </Dialog>
  ),
};
