import type { Meta, StoryObj } from '@storybook/react';

import { Text } from '../Text';
import { Paper } from './Paper';

const meta: Meta<typeof Paper> = {
  title: 'Layouts/Paper',
  component: Paper,
  tags: ['autodocs'],
};
export default meta;

type StoryType = StoryObj<typeof Paper>;

export const Usage: StoryType = {
  args: {
    shadow: 'default',
    rounded: 'sm',
    p: '5',
    withBorder: false,
    children: (
      <>
        <Text>Paper is the most basic ui component</Text>
        <Text>Use it to create cards, dropdowns, modals and other components that require background with shadow</Text>
      </>
    ),
  },
};

export const WithBorder: StoryType = {
  args: {
    ...Usage.args,
    withBorder: true,
  },
};
