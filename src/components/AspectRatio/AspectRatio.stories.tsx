import type { Meta, StoryObj } from '@storybook/react';

import { AspectRatio } from './AspectRatio';

const meta: Meta<typeof AspectRatio> = {
  title: 'Components/AspectRatio',
  component: AspectRatio,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof AspectRatio>;

export const Basic: Story = {
  render: () => (
    <AspectRatio ratio={16 / 9} className="bg-slate-50 dark:bg-slate-800">
      <img
        src="https://images.unsplash.com/photo-1576075796033-848c2a5f3696?w=800&dpr=2&q=80"
        alt="Photo by Alvaro Pinot"
        className="rounded-md object-cover"
      />
    </AspectRatio>
  ),
  args: {},
};
