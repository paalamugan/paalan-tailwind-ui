import type { Meta, StoryObj } from '@storybook/react';

import { Grid, GridItem } from '.';
import boxStories from '../Box/Box.stories';

const meta: Meta<typeof Grid> = {
  title: 'layouts/Grid',
  component: Grid,
  tags: ['autodocs'],
  argTypes: {
    ...boxStories.argTypes,
  },
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: (args) => (
    <Grid gap="3" gridCols="4" {...args}>
      {Array.from({ length: 10 }).map((_, i) => (
        <GridItem key={i} className="bg-blue-600 text-white" p="4">
          Grid Item {i + 1}
        </GridItem>
      ))}
    </Grid>
  ),
};
