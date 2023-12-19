import type { Meta, StoryObj } from '@storybook/react';

import { Box, Heading, Text } from '@/layouts';

import { Button } from '../Button';
import { Input } from '../Input';
import { Label } from '../Label';
import { Popover, PopoverContent, PopoverRoot, PopoverTrigger } from './Popover';

const meta: Meta<typeof Popover> = {
  title: 'Components/Popover',
  component: Popover,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Popover>;

export const Basic: Story = {
  args: {
    trigger: (
      <Button variant="outline" className="flex gap-2 rounded-full">
        Open popover
      </Button>
    ),
    content: (
      <Box className="grid gap-4">
        <Box className="space-y-2">
          <Heading as="h4" className="font-medium leading-none">
            Dimensions
          </Heading>
          <Text className="text-sm text-slate-500 dark:text-slate-400">Set the dimensions for the layer.</Text>
        </Box>
        <Box className="grid gap-2">
          <Box className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="width">Width</Label>
            <Input id="width" defaultValue="100%" className="col-span-2 h-8" />
          </Box>
          <Box className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="maxWidth">Max. width</Label>
            <Input id="maxWidth" defaultValue="300px" className="col-span-2 h-8" />
          </Box>
          <Box className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="height">Height</Label>
            <Input id="height" defaultValue="25px" className="col-span-2 h-8" />
          </Box>
          <Box className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="maxHeight">Max. height</Label>
            <Input id="maxHeight" defaultValue="none" className="col-span-2 h-8" />
          </Box>
        </Box>
      </Box>
    ),
  },
};

export const WithRawTrigger: Story = {
  render: () => (
    <PopoverRoot>
      <PopoverTrigger asChild>
        <Button variant="outline" className="flex gap-2 rounded-full">
          Open popover
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Dimensions</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400">Set the dimensions for the layer.</p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="width">Width</Label>
              <Input id="width" defaultValue="100%" className="col-span-2 h-8" />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxWidth">Max. width</Label>
              <Input id="maxWidth" defaultValue="300px" className="col-span-2 h-8" />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="height">Height</Label>
              <Input id="height" defaultValue="25px" className="col-span-2 h-8" />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxHeight">Max. height</Label>
              <Input id="maxHeight" defaultValue="none" className="col-span-2 h-8" />
            </div>
          </div>
        </div>
      </PopoverContent>
    </PopoverRoot>
  ),
};
