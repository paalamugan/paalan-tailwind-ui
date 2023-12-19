import type { Meta, StoryObj } from '@storybook/react';

import { Toggle } from './Toggle';

const meta: Meta<typeof Toggle> = {
  title: 'Components/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Toggle>;

export const Basic: Story = {
  render: (args) => (
    <Toggle {...args} aria-label="Toggle">
      Toggle
    </Toggle>
  ),
  args: {
    variant: 'default',
  },
};

export const Outline: Story = {
  render: (args) => (
    <Toggle {...args} aria-label="Toggle">
      Toggle
    </Toggle>
  ),
  args: {
    variant: 'outline',
  },
};

export const Small: Story = {
  render: (args) => (
    <Toggle {...args} aria-label="Toggle">
      Toggle
    </Toggle>
  ),
  args: {
    ...Basic.args,
    size: 'sm',
  },
};

export const Large: Story = {
  render: (args) => (
    <Toggle {...args} aria-label="Toggle">
      Toggle
    </Toggle>
  ),
  args: {
    ...Basic.args,
    size: 'lg',
  },
};

export const Disabled: Story = {
  render: (args) => (
    <Toggle {...args} aria-label="Toggle">
      Toggle
    </Toggle>
  ),
  args: {
    disabled: true,
  },
};
