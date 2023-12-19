import type { Meta, StoryObj } from '@storybook/react';

import { CheckboxInput } from './CheckboxInput';

const meta: Meta<typeof CheckboxInput> = {
  title: 'Components/CheckboxInput',
  component: CheckboxInput,
  tags: ['autodocs'],
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof CheckboxInput>;

export const Default: Story = {
  args: {
    id: 'terms',
  },
};

export const WithLabel: Story = {
  args: {
    id: 'terms1',
    label: 'Accept terms and conditions',
  },
};

export const WithInvalidWithoutMessage: Story = {
  args: {
    ...WithLabel.args,
    isInvalid: true,
  },
};

export const WithErrorMessage: Story = {
  args: { ...WithInvalidWithoutMessage.args, errorMessage: 'This field is required.' },
};

export const Disabled: Story = {
  args: {
    ...WithLabel.args,
    id: 'terms2',
    disabled: true,
  },
};

export const SwapRight: Story = {
  args: {
    ...WithLabel.args,
    id: 'terms3',
    swapRight: true,
  },
};

export const Required: Story = {
  args: {
    ...WithLabel.args,
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
