import type { Meta, StoryObj } from '@storybook/react';

import { CircleBackslashIcon } from '@/icons/custom';
import { Box, LI, Text, UL } from '@/layouts';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuListItem,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '.';

const meta: Meta<typeof NavigationMenu> = {
  title: 'components/NavigationMenu',
  component: NavigationMenu,
  tags: ['autodocs'],

  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof NavigationMenu>;

const components: { title: string; href: string; description: string }[] = [
  {
    title: 'Alert Dialog',
    href: '/docs/primitives/alert-dialog',
    description: 'A modal dialog that interrupts the user with important content and expects a response.',
  },
  {
    title: 'Hover Card',
    href: '/docs/primitives/hover-card',
    description: 'For sighted users to preview content available behind a link.',
  },
  {
    title: 'Progress',
    href: '/docs/primitives/progress',
    description:
      'Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.',
  },
  {
    title: 'Scroll-area',
    href: '/docs/primitives/scroll-area',
    description: 'Visually or semantically separates content.',
  },
  {
    title: 'Tabs',
    href: '/docs/primitives/tabs',
    description: 'A set of layered sections of content—known as tab panels—that are displayed one at a time.',
  },
  {
    title: 'Tooltip',
    href: '/docs/primitives/tooltip',
    description:
      'A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.',
  },
];

export const Basic: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <UL unstyled className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <LI className="row-span-3">
                <NavigationMenuLink asChild>
                  <Box
                    as="a"
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <CircleBackslashIcon className="h-6 w-6" />
                    <Box className="mb-2 mt-4 text-lg font-medium">Application</Box>
                    <Text className="text-sm leading-tight text-muted-foreground">
                      Beautifully designed components built with Radix UI and Tailwind CSS.
                    </Text>
                  </Box>
                </NavigationMenuLink>
              </LI>
              <NavigationMenuListItem href="/docs" title="Introduction">
                Re-usable components built using Radix UI and Tailwind CSS.
              </NavigationMenuListItem>
              <NavigationMenuListItem href="/docs/installation" title="Installation">
                How to install dependencies and structure your app.
              </NavigationMenuListItem>
              <NavigationMenuListItem href="/docs/primitives/typography" title="Typography">
                Styles for headings, paragraphs, lists...etc
              </NavigationMenuListItem>
            </UL>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Components</NavigationMenuTrigger>
          <NavigationMenuContent>
            <UL unstyled className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {components.map((component) => (
                <NavigationMenuListItem key={component.title} title={component.title} href={component.href}>
                  {component.description}
                </NavigationMenuListItem>
              ))}
            </UL>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>Documentation</NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
  args: {},
};
