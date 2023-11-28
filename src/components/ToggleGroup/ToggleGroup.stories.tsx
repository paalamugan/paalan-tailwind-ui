import type { Meta, StoryObj } from '@storybook/react';

import { COLOR_VARIANTS } from '@/constants';

import { ToggleGroup } from './ToggleGroup';

const meta: Meta<typeof ToggleGroup> = {
  title: 'components/ToggleGroup',
  component: ToggleGroup,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: {
        type: 'inline-radio',
      },
      options: ['sm', 'md', 'lg'],
    },
    color: {
      control: {
        type: 'select',
      },
      options: COLOR_VARIANTS,
    },
  },
};
export default meta;

type Story = StoryObj<typeof ToggleGroup>;

export const Single: Story = {
  args: {
    items: [
      { content: 'Option 1', value: '1' },
      { content: 'Option 2', value: '2' },
      { content: 'Option 3', value: '3' },
    ],
    type: 'single',
  },
};

export const Multiple: Story = {
  args: {
    items: [
      { content: 'Option 1', value: '1' },
      { content: 'Option 2', value: '2' },
      { content: 'Option 3', value: '3' },
    ],
    type: 'multiple',
  },
};

export const Label: Story = {
  args: {
    ...Single.args,
    label: 'Label',
  },
};

export const Disabled: Story = {
  args: {
    ...Label.args,
    disabled: true,
  },
};

export const Size: Story = {
  args: {
    ...Label.args,
    size: 'sm',
  },
};

export const Inline: Story = {
  args: {
    ...Label.args,
    inline: true,
  },
};

export const Color: Story = {
  args: {
    ...Label.args,
    color: 'primary',
  },
};
