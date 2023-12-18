import type { Meta, StoryObj } from '@storybook/react';

import { TrashIcon } from '@/icons';

import { Button } from '..';
import { AlertDialog } from './AlertDialog';

const meta: Meta<typeof AlertDialog> = {
  title: 'components/AlertDialog',
  component: AlertDialog,
  tags: ['autodocs'],
  argTypes: {
    trigger: {
      description: 'Trigger element for the alert dialog',
    },
    header: {
      description: 'Header for the alert dialog (title and description) as an object',
    },
    icon: {
      description: 'Icon to display on the left side of the alert dialog',
    },
    confirmButtonText: {
      description: 'Text for the confirm button',
    },
    confirmButtonProps: {
      description: 'Props for the confirm button',
    },
    onConfirm: {
      description: 'Function to call when the confirm button is clicked',
    },
    cancelButtonText: {
      description: 'Text for the cancel button',
    },
    cancelButtonProps: {
      description: 'Props for the cancel button',
    },
    onCancel: {
      description: 'Function to call when the cancel button is clicked',
    },
    iconClassName: {
      description: 'Class name for the icon',
    },
  },
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
