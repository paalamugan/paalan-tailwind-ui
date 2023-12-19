import type { Meta, StoryObj } from '@storybook/react';

import { Box } from '@/layouts';

import { Button } from '../Button';
import { LabelInput } from '../LabelInput';
import { Select } from '../Select';
import { Card as CardComponent } from './Card';

const meta: Meta<typeof CardComponent> = {
  title: 'Components/Card',
  component: CardComponent,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      table: {
        disable: true,
      },
    },
    header: {
      description: 'Optional header for the card',
      table: {
        type: {
          summary: '{ title: React.ReactNode; description?: React.ReactNode }',
        },
      },
    },
    headerClassName: {
      description: 'Optional class name for the card header',
    },
    children: {
      description: 'content for the card',
    },
    contentClassName: {
      description: 'Optional class name for the card content',
    },
    footer: {
      description: 'Optional footer for the card',
    },
    footerClassName: {
      description: 'Optional class name for the card footer',
    },
  },
};

export default meta;

type Story = StoryObj<typeof CardComponent>;

export const Card: Story = {
  args: {
    className: 'w-[350px]',
    header: {
      title: 'Create project',
      description: 'Deploy your new project in one-click.',
    },
    children: (
      <form>
        <Box className="grid w-full items-center gap-4">
          <LabelInput label="Name" id="name" placeholder="Name of your project" />
          <Select
            label="Framework"
            id="framework"
            placeholder="Select"
            options={[
              { label: 'Next.js', value: 'next' },
              { label: 'SvelteKit', value: 'sveltekit' },
              { label: 'Astro', value: 'astro' },
              { label: 'Nuxt.js', value: 'nuxt' },
            ]}
          />
        </Box>
      </form>
    ),
    footer: (
      <>
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </>
    ),
  },
};
