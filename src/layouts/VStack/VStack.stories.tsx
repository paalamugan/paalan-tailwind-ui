import type { Meta, StoryObj } from '@storybook/react';

import { Box } from '../Box';
import boxStories from '../Box/Box.stories';
import { VStack } from './VStack';

const meta: Meta<typeof VStack> = {
  title: 'Layouts/VStack',
  component: VStack,
  tags: ['autodocs'],
  argTypes: {
    ...boxStories.argTypes,
  },
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: (args) => (
    <VStack {...args} gap="6">
      <Box className="bg-primary text-primary-foreground" p="10">
        1
      </Box>
      <Box className="bg-primary text-primary-foreground" p="10">
        2
      </Box>
      <Box className="bg-primary text-primary-foreground" p="10">
        3
      </Box>
    </VStack>
  ),
};
