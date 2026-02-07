import type { Meta, StoryObj } from '@storybook/react-vite';
import dayjs from 'dayjs';

import ConfigContextProvider from 'common/providers/ConfigProvider';
import { ToastDetail } from 'common/providers/ToastsContext';

import Toast from '../Toast';

const meta = {
  title: 'Common/Toast',
  component: Toast,
  decorators: [
    (Story) => (
      <div className="w-[480px]">
        <ConfigContextProvider>
          <Story />
        </ConfigContextProvider>
      </div>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: { description: 'Additional CSS classes.' },
    dismiss: { description: 'A function called when the Toast dismisses.' },
    testId: { description: 'The test identifier.' },
    toast: { description: 'The Toast.' },
  },
} satisfies Meta<typeof Toast>;

export default meta;

type Story = StoryObj<typeof meta>;

const toast: ToastDetail = {
  id: '1',
  text: 'The toast message.',
  createdAt: dayjs().toISOString(),
  isAutoDismiss: false,
};

export const Simple: Story = {
  args: { dismiss: () => {}, toast },
};

export const Info: Story = {
  args: { dismiss: () => {}, toast: { ...toast, variant: 'info' } },
};

export const Danger: Story = {
  args: { dismiss: () => {}, toast: { ...toast, variant: 'danger' } },
};

export const Success: Story = {
  args: { dismiss: () => {}, toast: { ...toast, variant: 'success' } },
};
