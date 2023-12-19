import type { Meta, StoryObj } from '@storybook/react';

import boxStory from '@/layouts/Box/Box.stories';

import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    label: {
      description: 'Label for the badge',
      control: {
        type: 'text',
      },
    },
    variant: {
      description: 'Variant for the badge',
      options: ['primary', 'secondary', 'outline', 'info', 'success', 'warning', 'danger'],
      defaultValue: 'primary',
      control: {
        type: 'select',
      },
    },
    size: {
      description: 'Size for the badge',
      options: ['sm', 'md', 'lg'],
      defaultValue: 'md',
      control: {
        type: 'select',
      },
    },
    bg: boxStory.argTypes?.bg,
    color: boxStory.argTypes?.color,
  },
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const Primary: Story = {
  args: {
    label: 'Primary',
    variant: 'primary',
    size: 'md',
  },
};

export const Secondary: Story = {
  args: {
    ...Primary.args,
    label: 'Secondary',
    variant: 'secondary',
  },
};

export const Outline: Story = {
  args: {
    ...Primary.args,
    label: 'Outline',
    variant: 'outline',
  },
};

export const Info: Story = {
  args: {
    ...Primary.args,
    variant: 'info',
    label: 'Info',
  },
};

export const Success: Story = {
  args: {
    ...Primary.args,
    variant: 'success',
    label: 'Success',
  },
};

export const Warning: Story = {
  args: {
    ...Primary.args,
    variant: 'warning',
    label: 'Warning',
  },
};

export const Danger: Story = {
  args: {
    ...Primary.args,
    variant: 'danger',
    label: 'Danger',
  },
};

export const CustomColor: Story = {
  args: {
    ...Primary.args,
    label: 'Custom Color',
    bg: 'lime',
  },
};
