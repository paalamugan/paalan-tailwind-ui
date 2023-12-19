import type { Meta, StoryObj } from '@storybook/react';

import { getRandomBoxColors } from '@/utils/helper';

import boxStories from '../Box/Box.stories';
import { Center } from '../Center';
import { Wrap, WrapItem } from './Wrap';

const meta: Meta<typeof Wrap> = {
  title: 'Layouts/Wrap',
  component: Wrap,
  tags: ['autodocs'],
  argTypes: {
    ...boxStories.argTypes,
  },
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: (args) => (
    <Wrap {...args}>
      {getRandomBoxColors(10).map((bg, i) => (
        <WrapItem>
          <Center bg={bg} color="white" h="32" w="32" rounded="DEFAULT">
            Item {i + 1}
          </Center>
        </WrapItem>
      ))}
    </Wrap>
  ),
};
