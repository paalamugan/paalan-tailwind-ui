import type { Meta, StoryObj } from '@storybook/react';

import { COLOR_VARIANTS } from '@/constants';
import { RocketIcon } from '@/icons/icons';

import { Alert } from './Alert';

const meta: Meta<typeof Alert> = {
  title: 'components/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    colorVariant: {
      description: 'Color variant of the alert',
      control: {
        type: 'select',
      },
      options: COLOR_VARIANTS,
    },
    softBackground: {
      description: 'Soft background variant of the alert',
      control: {
        type: 'select',
      },
      options: COLOR_VARIANTS,
    },
    solidBackground: {
      description: 'Solid background variant of the alert',
      control: {
        type: 'select',
      },
      options: COLOR_VARIANTS,
    },
    icon: {
      description: 'Icon to display on the left side of the alert',
    },
    dismissible: {
      description: 'Whether or not the alert is dismissible',
      control: {
        type: 'boolean',
      },
    },
    description: {
      description: 'Description of the alert',
    },
    title: {
      description: 'Title of the alert',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Alert>;

export const Basic: Story = {
  args: {
    title: 'Heads up!',
    description: 'You can add components to your app using the cli.',
    dismissible: false,
  },
};

export const WithIcon: Story = {
  args: {
    ...Basic.args,
    icon: <RocketIcon className="h-4 w-4" />,
  },
};

export const WithDismiss: Story = {
  args: {
    ...WithIcon.args,
    dismissible: true,
  },
};

export const WithColorVariant: Story = {
  args: {
    ...WithIcon.args,
    colorVariant: 'primary',
  },
};

export const WithSoftBackgroundVariant: Story = {
  args: {
    ...WithIcon.args,
    softBackground: 'primary',
  },
};

export const WithSoftBackgroundVariantDismiss: Story = {
  args: {
    ...WithSoftBackgroundVariant.args,
    softBackground: 'primary',
    dismissible: true,
  },
};

export const WithSolidBackgroundVariant: Story = {
  args: {
    ...WithIcon.args,
    solidBackground: 'primary',
  },
};

export const WithSolidBackgroundVariantDismiss: Story = {
  args: {
    ...WithSolidBackgroundVariant.args,
    solidBackground: 'primary',
    dismissible: true,
  },
};
