import type { Meta, StoryObj } from '@storybook/react';

import { RadioInputGroup } from './RadioInputGroup';

const meta: Meta<typeof RadioInputGroup> = {
  title: 'Components/RadioInputGroup',
  component: RadioInputGroup,
  tags: ['autodocs'],
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof RadioInputGroup>;

export const Default: Story = {
  args: {
    id: 'options',
    options: [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' },
      { value: '3', label: 'Option 3' },
    ],
  },
};

export const WithLabel: Story = {
  args: {
    ...Default.args,
    label: 'Choose an option',
  },
};
export const WithInline: Story = {
  args: {
    ...WithLabel.args,
    inline: true,
  },
};

export const WithInvalidWithoutMessage: Story = {
  args: {
    ...WithInline.args,
    isInvalid: true,
  },
};

export const WithErrorMessage: Story = {
  args: { ...WithInvalidWithoutMessage.args, errorMessage: 'This field is required.' },
};

export const Disabled: Story = {
  args: {
    ...WithInline.args,
    id: 'terms2',
    disabled: true,
  },
};

export const SwapRight: Story = {
  args: {
    ...WithInline.args,
    id: 'terms3',
    swapRight: true,
  },
};

export const Required: Story = {
  args: {
    ...WithInline.args,
    id: 'terms4',
    required: true,
  },
};

export const WithSwapRightRequired: Story = {
  args: {
    ...Required.args,
    id: 'terms5',
    swapRight: true,
  },
};
