import type { Meta, StoryObj } from '@storybook/react';

import { Container } from '.';
import boxStories from '../Box/Box.stories';
import { Heading } from '../Heading';
import { Text } from '../Text';

const meta: Meta<typeof Container> = {
  title: 'Layouts/Container',
  component: Container,
  tags: ['autodocs'],
  argTypes: {
    ...boxStories.argTypes,
  },
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: (args) => (
    <Container {...args}>
      <Heading my="3">Container</Heading>
      <Text>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste tempore, vero exercitationem repudiandae animi
        assumenda iure qui. Iure quia, rem nulla sit ipsa temporibus est maiores fugiat quae ipsam reprehenderit
        molestiae hic commodi. Alias maiores quidem perferendis. Impedit, ipsum eveniet.
      </Text>
    </Container>
  ),
};
