import type { Meta, StoryObj } from '@storybook/react';

import { Slider } from '../Slider';

const meta: Meta<typeof Slider> = {
  title: 'Components/Slider',
  component: Slider,
  tags: ['autodocs'],
  args: {
    max: 100,
    step: 1,
  },
  argTypes: {
    asChild: {
      table: {
        disable: true,
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof Slider>;

export const Basic: Story = {
  args: {
    value: [50],
  },
};

export const Secondary: Story = {
  args: {
    value: [60],
    variant: 'secondary',
  },
};
export const Tertiary: Story = {
  args: {
    value: [50],
    variant: 'tertiary',
  },
};

export const Info: Story = {
  args: {
    value: [40],
    variant: 'info',
  },
};

export const Success: Story = {
  args: {
    value: [30],
    variant: 'success',
  },
};

export const Warning: Story = {
  args: {
    value: [80],
    variant: 'warning',
  },
};

export const Danger: Story = {
  args: {
    defaultValue: [90],
    variant: 'danger',
  },
};
