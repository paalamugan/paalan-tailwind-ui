import type { Meta, StoryObj } from '@storybook/react';

import { Box } from '@/layouts';

import { Skeleton, SkeletonItem } from './Skeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'components/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Skeleton>;

export const Basic: Story = {
  args: {},
};

export const Circle: Story = {
  args: {
    circle: true,
  },
};

export const Count: Story = {
  args: {
    count: 3,
  },
};

export const FullWidthWithCount: Story = {
  args: {
    ...Count.args,
    isFullWidth: true,
  },
};

export const CustomSkeleton: Story = {
  render: () => (
    <Box className="flex items-center space-x-4">
      <SkeletonItem className="h-12 w-12 rounded-full" />
      <Box className="space-y-2">
        <SkeletonItem className="w-[250px]" h="4" />
        <SkeletonItem className="w-[200px]" h="4" />
      </Box>
    </Box>
  ),
  args: {},
};
