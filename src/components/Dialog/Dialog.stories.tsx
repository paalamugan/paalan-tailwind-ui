import type { Meta, StoryObj } from '@storybook/react';

import { Box, Text } from '@/layouts';

import { Button } from '../Button';
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from '../ContextMenu';
import { Input } from '../Input';
import { Label } from '../Label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from './Dialog';

const meta: Meta<typeof Dialog> = {
  title: 'Components/Dialog',
  component: Dialog,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Dialog>;

export const Basic: Story = {
  render: () => (
    <Dialog
      trigger={<Button variant="outline">Open Dialog</Button>}
      header={{
        title: 'Are you sure absolutely sure?',
        description:
          'This action cannot be undone. This will permanently delete your account and remove your data from our servers.',
      }}
    />
  ),
};
export const EditProfile: Story = {
  render: () => (
    <Dialog
      trigger={<Button variant="outline">Edit Profile</Button>}
      contentClassName="sm:max-w-[425px]"
      header={{
        title: 'Edit profile',
        description: "Make changes to your profile here. Click save when you're done.",
      }}
      footer={<Button type="submit">Save changes</Button>}
    >
      <Box className="grid gap-4 py-4">
        <Box className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Name
          </Label>
          <Input id="name" defaultValue="Paalamugan" className="col-span-3" />
        </Box>
        <Box className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="username" className="text-right">
            Username
          </Label>
          <Input id="username" defaultValue="@paalamugan" className="col-span-3" />
        </Box>
      </Box>
    </Dialog>
  ),
  args: {},
};

export const ContextMenuNote: Story = {
  render: () => (
    <DialogRoot>
      <ContextMenu>
        <ContextMenuTrigger>Right click</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>Open</ContextMenuItem>
          <ContextMenuItem>Download</ContextMenuItem>
          <DialogTrigger asChild>
            <ContextMenuItem>
              <Text as="span" fontSize="sm">
                Delete
              </Text>
            </ContextMenuItem>
          </DialogTrigger>
        </ContextMenuContent>
      </ContextMenu>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. Are you sure you want to permanently delete this file from our servers?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="submit">Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  ),
};
