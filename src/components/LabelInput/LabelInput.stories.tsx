import type { Meta, StoryObj } from '@storybook/react';

import { LabelInput } from '../LabelInput';

const meta: Meta<typeof LabelInput> = {
  title: 'Components/LabelInput',
  component: LabelInput,
  tags: ['autodocs'],
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof LabelInput>;

export const Basic: Story = {
  args: {
    label: 'Your email address',
    placeholder: 'Enter your email address',
    required: false,
  },
};

export const WithRequired: Story = {
  args: {
    ...Basic.args,
    required: true,
  },
};

export const WithInvalid: Story = {
  args: {
    ...WithRequired.args,
    isInvalid: true,
  },
};
