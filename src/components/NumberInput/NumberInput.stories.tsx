import type { Meta, StoryObj } from '@storybook/react';

import { NumberInput } from './NumberInput';

const meta: Meta<typeof NumberInput> = {
  title: 'Components/NumberInput',
  component: NumberInput,
  tags: ['autodocs'],
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof NumberInput>;

export const Default: Story = {
  args: {
    defaultValue: '',
    placeholder: 'Enter a age',
  },
};

export const Disabled: Story = {
  args: { ...Default.args, disabled: true },
};

export const WithLabel: Story = {
  args: { ...Default.args, id: 'age', label: 'Age' },
};

export const WithPositiveInteger: Story = {
  args: { ...WithLabel.args, isPositiveInteger: true },
};

export const WithPositiveFloat: Story = {
  args: { ...WithLabel.args, isPositiveFloat: true },
};

export const WithRequiredLabel: Story = {
  args: { ...WithLabel.args, required: true },
};

export const Invalid: Story = {
  args: {
    ...WithRequiredLabel.args,
    isInvalid: true,
  },
};

export const WithInline: Story = {
  args: {
    ...WithLabel.args,
    inline: true,
  },
};

export const WithInlineRequired: Story = {
  args: {
    ...WithInline.args,
    required: true,
  },
};
