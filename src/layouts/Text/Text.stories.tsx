import type { Meta, StoryObj } from '@storybook/react';

import { Text } from '.';
import boxStories from '../Box/Box.stories';

const meta: Meta<typeof Text> = {
  title: 'Layouts/Text',
  component: Text,
  tags: ['autodocs'],
  argTypes: {
    ...boxStories.argTypes,
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: (args) => (
    <Text {...args}>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem dignissimos in placeat labore quia veritatis
      sequi natus consequatur fugit quisquam asperiores illo neque soluta, atque earum ad laudantium quod officiis?
    </Text>
  ),
};
