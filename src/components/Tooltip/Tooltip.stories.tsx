import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../Button';
import { Tooltip } from './Tooltip';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  argTypes: {
    side: {
      options: ['top', 'right', 'bottom', 'left'],
      control: { type: 'radio' },
    },
    align: {
      options: ['start', 'center', 'end'],
      control: { type: 'radio' },
    },
    asChild: {
      table: { disable: true },
    },
  },
};
export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Basic: Story = {
  args: {
    content: 'Tooltip content',
    children: <Button variant="outline">Mouse Over here</Button>,
  },
};

export const Side: Story = {
  args: {
    ...Basic.args,
    side: 'top',
  },
};

export const Align: Story = {
  args: {
    ...Basic.args,
    align: 'center',
  },
};

export const WithPortal: Story = {
  args: {
    ...Basic.args,
    asPortal: true,
  },
};
