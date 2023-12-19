import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../Button';
import { Label } from '../Label';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    type: 'email',
    placeholder: 'Email',
  },
};

export const Disabled: Story = {
  args: { ...Default.args, disabled: true },
};

export const WithLabel: Story = {
  args: { ...Default.args, id: 'email', label: 'Email' },
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

export const WithText: Story = {
  render: (args) => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email-2">{args.placeholder}</Label>
      <Input {...args} id="email-2" />
      <p className="text-sm text-slate-500">Enter your email address.</p>
    </div>
  ),
  args: { ...Default.args },
};

export const WithButton: Story = {
  render: (args) => (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input {...args} />
      <Button type="submit">Subscribe</Button>
    </div>
  ),
  args: { ...Default.args },
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
