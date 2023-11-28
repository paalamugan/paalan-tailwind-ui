import type { Meta, StoryObj } from '@storybook/react';

import { TrashIcon } from '@/icons';

import { Button } from '..';
import { AlertDialog } from './AlertDialog';

const meta: Meta<typeof AlertDialog> = {
  title: 'components/AlertDialog',
  component: AlertDialog,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof AlertDialog>;

export const Basic: Story = {
  args: {
    trigger: <Button variant="outline">Delete Account</Button>,
    header: {
      title: 'Are you absolutely sure?',
      description:
        'This action cannot be undone. This will permanently delete your account and remove your data from our servers.',
    },
    confirmButtonText: 'Continue',
    confirmButtonProps: {
      variant: 'danger',
    },
    onConfirm: (e) => {
      e.preventDefault();
      console.log(e.preventDefault);
    },
  },
};
export const WithIcon: Story = {
  args: {
    ...Basic.args,
    icon: <TrashIcon className="h-8 w-8 text-danger" />,
  },
};

export const WithIconRounded: Story = {
  args: {
    ...WithIcon.args,
    iconClassName: 'bg-danger/10 rounded-full p-2',
  },
};
