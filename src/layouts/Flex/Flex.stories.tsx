import type { Meta, StoryObj } from '@storybook/react';

import { Box } from '../Box';
import boxStories from '../Box/Box.stories';
import { Flex } from './Flex';

const meta: Meta<typeof Flex> = {
  title: 'Layouts/Flex',
  component: Flex,
  tags: ['autodocs'],
  argTypes: {
    ...boxStories.argTypes,
  },
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: (args) => (
    <Flex {...args} gap="10">
      <Box className="bg-primary text-white" p="10">
        Box 1
      </Box>
      <Box className="bg-primary text-white" p="10">
        Box 2
      </Box>
      <Box className="bg-primary text-white" p="10">
        Box 3
      </Box>
    </Flex>
  ),
};
