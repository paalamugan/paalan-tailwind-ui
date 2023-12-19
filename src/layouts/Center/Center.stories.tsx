import type { Meta, StoryObj } from '@storybook/react';

import { Center } from '.';
import { Box } from '../Box';
import boxStories from '../Box/Box.stories';

const meta: Meta<typeof Center> = {
  title: 'Layouts/Center',
  component: Center,
  tags: ['autodocs'],
  argTypes: {
    ...boxStories.argTypes,
  },
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: (args) => (
    <Center {...args}>
      <Box>Center</Box>
    </Center>
  ),
};
