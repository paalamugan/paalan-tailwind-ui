import type { Meta, StoryObj } from '@storybook/react';

import { AccessibilityIcon } from '@/icons';

import { IconButton } from './IconButton';

const meta: Meta<typeof IconButton> = {
  title: 'Components/IconButton',
  component: IconButton,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof IconButton>;

export const Basic: Story = {
  args: {
    icon: <AccessibilityIcon className="h-8 w-8" />,
  },
};

export const Outline: Story = {
  args: {
    ...Basic.args,
    outline: true,
  },
};

export const Disabled: Story = {
  args: {
    ...Basic.args,
    disabled: true,
  },
};

export const OutlineWithDisabled: Story = {
  args: {
    ...Outline.args,
    disabled: true,
  },
};
