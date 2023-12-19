import type { Meta, StoryObj } from '@storybook/react';

import { Heading } from '.';
import boxStories from '../Box/Box.stories';

const meta: Meta<typeof Heading> = {
  title: 'Layouts/Heading',
  component: Heading,
  tags: ['autodocs'],
  argTypes: {
    ...boxStories.argTypes,
  },
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: (args) => <Heading {...args}>Heading</Heading>,
};

export const Heading1: Story = {
  render: (args) => <Heading {...args}>Heading 1</Heading>,
  args: {
    as: 'h1',
  },
};

export const Heading2: Story = {
  render: (args) => <Heading {...args}>Heading 2</Heading>,
  args: {
    as: 'h2',
  },
};

export const Heading3: Story = {
  render: (args) => <Heading {...args}>Heading 3</Heading>,
  args: {
    as: 'h3',
  },
};

export const Heading4: Story = {
  render: (args) => <Heading {...args}>Heading 4</Heading>,
  args: {
    as: 'h4',
  },
};

export const Heading5: Story = {
  render: (args) => <Heading {...args}>Heading 5</Heading>,
  args: {
    as: 'h5',
  },
};

export const Heading6: Story = {
  render: (args) => <Heading {...args}>Heading 6</Heading>,
  args: {
    as: 'h6',
  },
};
