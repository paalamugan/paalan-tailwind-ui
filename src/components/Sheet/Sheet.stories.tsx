import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../Button';
import { Input } from '../Input';
import { Label } from '../Label';
import { Sheet } from './Sheet';

const meta: Meta<typeof Sheet> = {
  title: 'components/Sheet',
  component: Sheet,
  tags: ['autodocs'],
  argTypes: {
    side: {
      options: ['top', 'bottom', 'left', 'right'],
      defaultValue: 'right',
      control: {
        type: 'radio',
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof Sheet>;

export const Top: Story = {
  render: (args) => (
    <Sheet {...args}>
      <div className="my-4">
        <Label htmlFor="name" className="text-right">
          Confirmation
        </Label>
        <Input id="name" placeholder='type "delete"' className="col-span-3" />
      </div>
    </Sheet>
  ),

  args: {
    side: 'top',
    header: {
      title: 'Are you absolutely sure?',
      description:
        'This action cannot be undone. This will permanently delete your account and remove your data from our servers.',
    },
    trigger: <Button variant="outline">Open Top</Button>,
    footer: {
      secondaryAction: (
        <Button variant="outline" color="gray">
          Close
        </Button>
      ),
      primaryAction: (
        <Button type="submit" color="danger">
          Yes, Delete
        </Button>
      ),
    },
  },
};

export const Bottom: Story = {
  render: (args) => (
    <Sheet {...args}>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Name
          </Label>
          <Input id="name" defaultValue="Paalamugan" className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="username" className="text-right">
            Username
          </Label>
          <Input id="username" defaultValue="@paalamugan" className="col-span-3" />
        </div>
      </div>
    </Sheet>
  ),
  args: {
    trigger: <Button variant="outline">Open Bottom</Button>,
    header: {
      title: 'Edit profile',
      description: "Make changes to your profile here. Click save when you're done.",
    },
    footer: {
      secondaryAction: <Button variant="outline">Close</Button>,
      primaryAction: <Button type="submit">Save Changes</Button>,
    },
    side: 'bottom',
  },
};

export const Left: Story = {
  render: Bottom.render,
  args: {
    ...Bottom.args,
    trigger: <Button variant="outline">Open Left</Button>,
    side: 'left',
  },
};

export const Right: Story = {
  render: Bottom.render,
  args: {
    ...Bottom.args,
    trigger: <Button variant="outline">Open Right</Button>,
    side: 'right',
    className: 'w-[400px] sm:w-[540px]',
  },
};

export const WithoutFooter: Story = {
  render: Bottom.render,
  args: {
    ...Right.args,
    trigger: <Button variant="outline">Open Without Footer</Button>,
    footer: undefined,
  },
};

export const WithoutDescription: Story = {
  render: Bottom.render,
  args: {
    ...Right.args,
    trigger: <Button variant="outline">Open Without Description</Button>,
    header: {
      title: 'Edit profile',
      description: '',
    },
  },
};

export const TopWithoutContent: Story = {
  args: {
    ...Top.args,
    trigger: <Button variant="outline">Open Top Without Body Content</Button>,
  },
};
