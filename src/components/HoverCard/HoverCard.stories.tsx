import type { Meta, StoryObj } from '@storybook/react';

import { CalendarIcon } from '@/icons';
import { Box, Heading, Text } from '@/layouts';

import { Avatar } from '../Avatar';
import { Button } from '../Button';
import { HoverCard, HoverCardContent, HoverCardTrigger } from './HoverCard';

const meta: Meta<typeof HoverCard> = {
  title: 'Components/HoverCard',
  component: HoverCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof HoverCard>;

export const Basic: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link">@nextjs</Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <Box className="flex justify-between space-x-4">
          <Avatar src="https://github.com/vercel.png" fallback="VC" />

          <Box className="space-y-1">
            <Heading as="h4" className="text-sm font-semibold">
              @nextjs
            </Heading>
            <Text className="text-sm">The React Framework – created and maintained by @vercel.</Text>
            <Box className="flex items-center pt-2">
              <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{' '}
              <Text as="span" className="text-xs text-muted-foreground">
                Joined December 2021
              </Text>
            </Box>
          </Box>
        </Box>
      </HoverCardContent>
    </HoverCard>
  ),
  args: {},
};
