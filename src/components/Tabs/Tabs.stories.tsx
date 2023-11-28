import type { Meta, StoryObj } from '@storybook/react';

import { Box, Text } from '@/layouts';

import { Button } from '../Button';
import { Card } from '../Card';
import { Input } from '../Input';
import { Label } from '../Label';
import { Tabs } from './Tabs';

const meta: Meta<typeof Tabs> = {
  title: 'components/Tabs',
  component: Tabs,
  tags: ['autodocs'],

  argTypes: {
    asChild: {
      table: {
        disable: true,
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof Tabs>;

export const Basic: Story = {
  args: {
    activeTab: 'account',
    tabs: [
      {
        value: 'account',
        label: 'Account',
        content: "Make changes to your account here. Click save when you're done.",
      },
      {
        value: 'password',
        label: 'Password',
        content: "Change your password here. After saving, you'll be logged out.",
      },
    ],
  },
};

export const WithForm: Story = {
  args: {
    activeTab: 'account',
    tabs: [
      {
        value: 'account',
        label: 'Account',
        content: (
          <Box>
            <Text className="text-sm text-slate-500 dark:text-slate-400">
              Make changes to your account here. Click save when you&apos;re done.
            </Text>
            <Box className="grid gap-2 py-4">
              <Box className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input id="name" defaultValue="Paalamugan" />
              </Box>
              <Box className="space-y-1">
                <Label htmlFor="username">Username</Label>
                <Input id="username" defaultValue="@paalamugan" />
              </Box>
            </Box>
            <Box className="flex">
              <Button>Save changes</Button>
            </Box>
          </Box>
        ),
      },
      {
        value: 'password',
        label: 'Password',
        content: (
          <Box>
            <Text className="text-sm text-slate-500 dark:text-slate-400">
              Change your password here. After saving, you&apos;ll be logged out.
            </Text>
            <Box className="grid gap-2 py-4">
              <Box className="space-y-1">
                <Label htmlFor="current">Current password</Label>
                <Input id="current" type="password" />
              </Box>
              <Box className="space-y-1">
                <Label htmlFor="new">New password</Label>
                <Input id="new" type="password" />
              </Box>
            </Box>
            <Box className="flex">
              <Button>Save password</Button>
            </Box>
          </Box>
        ),
      },
    ],
  },
};

export const WithFormCard: Story = {
  parameters: {
    layout: 'centered',
  },
  args: {
    ...WithForm.args,
    tabListClassName: 'grid w-full grid-cols-2',
    tabs: [
      {
        value: 'account',
        label: 'Account',
        content: (
          <Card
            header={{
              title: 'Account',
              description: "Make changes to your account here. Click save when you're done.",
            }}
            contentClassName="space-y-2"
            footer={<Button>Save changes</Button>}
          >
            <Box className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue="Paalamugan" />
            </Box>
            <Box className="space-y-1">
              <Label htmlFor="username">Username</Label>
              <Input id="username" defaultValue="@paalamugan" />
            </Box>
          </Card>
        ),
      },
      {
        value: 'password',
        label: 'Password',
        content: (
          <Card
            header={{
              title: 'Password',
              description: "Change your password here. After saving, you'll be logged out.",
            }}
            contentClassName="space-y-2"
            footer={<Button>Save password</Button>}
          >
            <Box className="space-y-1">
              <Label htmlFor="current">Current password</Label>
              <Input id="current" type="password" />
            </Box>
            <Box className="space-y-1">
              <Label htmlFor="new">New password</Label>
              <Input id="new" type="password" />
            </Box>
          </Card>
        ),
      },
    ],
  },
};
export const WithTabStrip: Story = {
  parameters: {
    layout: 'centered',
  },
  args: {
    ...WithForm.args,
    className: 'w-96 border border-gray-200  rounded-md overflow-hidden',
    tabListClassName: 'grid w-full grid-cols-2',
    triggerClassName: 'pt-3',
    contentClassName: 'p-4',
    strip: true,
    tabs: [
      {
        value: 'account',
        label: 'Account',
        content: (
          <Box mt="4">
            <Text className="text-sm text-slate-500 dark:text-slate-400">
              Make changes to your account here. Click save when you&apos;re done.
            </Text>
            <Box className="grid gap-2 py-4">
              <Box className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input id="name" defaultValue="Paalamugan" />
              </Box>
              <Box className="space-y-1">
                <Label htmlFor="username">Username</Label>
                <Input id="username" defaultValue="@paalamugan" />
              </Box>
            </Box>
            <Box className="flex">
              <Button>Save changes</Button>
            </Box>
          </Box>
        ),
      },
      {
        value: 'password',
        label: 'Password',
        content: (
          <Box mt="4">
            <Text className="text-sm text-slate-500 dark:text-slate-400">
              Change your password here. After saving, you&apos;ll be logged out.
            </Text>
            <Box className="grid gap-2 py-4">
              <Box className="space-y-1">
                <Label htmlFor="current">Current password</Label>
                <Input id="current" type="password" />
              </Box>
              <Box className="space-y-1">
                <Label htmlFor="new">New password</Label>
                <Input id="new" type="password" />
              </Box>
            </Box>
            <Box className="flex">
              <Button>Save password</Button>
            </Box>
          </Box>
        ),
      },
    ],
  },
};
