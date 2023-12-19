import type { Meta, StoryObj } from '@storybook/react';

import { Box } from '../Box';
import boxStories from '../Box/Box.stories';
import { Stack } from './Stack';

const meta: Meta<typeof Stack> = {
  title: 'Layouts/Stack',
  component: Stack,
  tags: ['autodocs'],
  argTypes: {
    ...boxStories.argTypes,
    direction: {
      options: ['row', 'column'],
    },
  },
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: (args) => (
    <Stack {...args} gap="4">
      <Box className="bg-primary text-primary-foreground" h="full" p="6">
        Stack Item 1
      </Box>
      <Box className="bg-primary text-primary-foreground" h="full" p="6">
        Stack Item 2
      </Box>
      <Box className="bg-primary text-primary-foreground" h="full" p="8">
        Stack Item 3
      </Box>
    </Stack>
  ),
  args: {
    direction: 'row',
    justifyContent: 'start',
  },
};
