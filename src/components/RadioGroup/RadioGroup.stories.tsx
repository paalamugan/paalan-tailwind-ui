import type { Meta, StoryObj } from '@storybook/react';

import { COLOR_VARIANTS } from '@/constants';

import { RadioGroup } from './RadioGroup';

const meta: Meta<typeof RadioGroup> = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  argTypes: {
    asChild: {
      table: {
        disable: true,
      },
    },
    defaultValue: {
      table: {
        disable: true,
      },
    },
    value: {
      control: { type: 'select' },
      options: ['option-one', 'option-two', 'option-three'],
    },
    variant: {
      options: COLOR_VARIANTS,
      control: { type: 'radio' },
    },
  },
};
export default meta;

type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
  args: {
    options: [
      {
        label: 'Option One',
        value: 'option-one',
      },
      {
        label: 'Option Two',
        value: 'option-two',
      },
      {
        label: ' Option Three',
        value: 'option-three',
      },
    ],
    value: 'option-two',
  },
};

export const WithLabel: Story = {
  args: {
    ...Default.args,
    label: 'Radio Group',
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

export const WithLabelAndRequired: Story = {
  args: {
    ...WithLabel.args,
    required: true,
  },
};

export const WithLabelAndRequiredAndInvalid: Story = {
  args: {
    ...WithLabelAndRequired.args,
    isInvalid: true,
  },
};

export const WithInline: Story = {
  args: {
    ...Default.args,
    inline: true,
  },
};

export const WithSwapRight: Story = {
  args: {
    ...Default.args,
    swapRight: true,
  },
};

export const WithSwapRightInline: Story = {
  args: {
    ...WithInline.args,
    swapRight: true,
  },
};

export const SuccessVariant: Story = {
  args: {
    ...Default.args,
    variant: 'success',
  },
};
