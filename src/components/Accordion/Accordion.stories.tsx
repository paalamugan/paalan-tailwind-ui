import type { Meta, StoryObj } from '@storybook/react';

import { Accordion } from './Accordion';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'components/Accordion',
  component: Accordion,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'padded',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  args: {
    items: [
      {
        value: 'item-1',
        title: 'Accordion 1',
        content:
          'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi sint, dolor repellendus architecto suscipit ipsam corrupti molestiae exercitationem quas impedit!',
      },
      {
        value: 'item-2',
        title: 'Accordion 2',
        content: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis, vitae?',
      },
      {
        value: 'item-3',
        title: 'Accordion 3',
        content:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque voluptatibus incidunt ex perspiciatis in atque a possimus excepturi itaque officiis.',
      },
    ],
  },
  argTypes: {
    type: { options: ['single', 'multiple'] },
  },
} satisfies Meta<typeof Accordion>;

export default meta;

type Story = StoryObj<typeof Accordion>;

export const Basic: Story = {
  args: {},
};

export const WithSingleCollapsible: Story = {
  args: {
    type: 'single',
    collapsible: true,
  },
};

export const WithMultiple: Story = {
  args: {
    type: 'multiple',
  },
};
