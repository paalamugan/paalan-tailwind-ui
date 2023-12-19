import type { Meta, StoryObj } from '@storybook/react';

import { ErrorMessage } from './ErrorMessage';

const meta: Meta<typeof ErrorMessage> = {
  title: 'Components/ErrorMessage',
  component: ErrorMessage,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof ErrorMessage>;

export const Basic: Story = {
  args: {
    message: 'This field is required.',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Field',
  },
};
