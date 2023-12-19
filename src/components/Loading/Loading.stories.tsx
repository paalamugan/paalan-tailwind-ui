import type { Meta, StoryObj } from '@storybook/react';

import { Loading } from './Loading';

const meta: Meta<typeof Loading> = {
  title: 'Components/Loading',
  component: Loading,
  tags: ['autodocs'],
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Loading>;

export const Basic: Story = {
  args: {},
};

export const WithoutSpin: Story = {
  args: {
    spin: false,
  },
};

export const WithContent: Story = {
  args: {
    content: 'Loading...',
  },
};

export const WithParentClassName: Story = {
  args: {
    parentClassName: 'text-2xl',
  },
};

export const WithClassName: Story = {
  args: {
    className: 'text-gray-500',
  },
};
