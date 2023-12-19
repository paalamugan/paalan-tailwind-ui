import type { Meta, StoryObj } from '@storybook/react';

import { Label } from '../Label';

const meta: Meta<typeof Label> = {
  title: 'Components/Label',
  component: Label,
  tags: ['autodocs'],
  argTypes: {
    asChild: {
      table: {
        disable: true,
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof Label>;

export const Basic: Story = {
  args: {
    text: 'Your email address',
    required: false,
  },
};

export const Required: Story = {
  args: {
    ...Basic.args,
    required: true,
  },
};

export const Invalid: Story = {
  args: {
    ...Required.args,
    isInvalid: true,
  },
};
