import type { Meta, StoryObj } from '@storybook/react';

import { Avatar } from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    asChild: {
      table: {
        disable: true,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Avatar>;

export const Basic: Story = {
  args: {
    src: 'https://bit.ly/uchiha-itachi',
    fallback: 'Itachi',
    className: 'h-52 w-52',
  },
};
