import React from 'react';

import type { ColorVariant } from '@/constants';
import type { VariantProps } from 'class-variance-authority';
import type { ReactNode } from 'react';

import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import { cva } from 'class-variance-authority';

import { Flex } from '@/layouts';
import { cn } from '@/utils/helper';

import { Label } from '../Label';

const toggleGroupItemVariants = cva<{
  color: Record<ColorVariant, string>;
  size: Record<'sm' | 'md' | 'lg', string>;
}>(
  'flex items-center justify-center border bg-background text-foreground transition-colors first:rounded-l last:rounded-r focus:outline-none focus-visible:shadow-[0_0_0_2px] disabled:pointer-events-none disabled:opacity-50  [&:not(:last-child)]:border-r-0',
  {
    variants: {
      color: {
        primary:
          'hover:bg-primary hover:text-primary-foreground data-[state=on]:bg-primary data-[state=on]:text-primary-foreground',
        secondary:
          'hover:bg-secondary hover:text-secondary-foreground  data-[state=on]:bg-secondary data-[state=on]:text-secondary-foreground',
        tertiary:
          'hover:bg-tertiary hover:text-tertiary-foreground data-[state=on]:bg-tertiary data-[state=on]:text-tertiary-foreground',
        success:
          'hover:bg-success hover:text-success-foreground data-[state=on]:bg-success data-[state=on]:text-success-foreground',
        warning:
          'hover:bg-warning hover:text-warning-foreground data-[state=on]:bg-warning data-[state=on]:text-warning-foreground',
        danger:
          'hover:bg-danger hover:text-danger-foreground data-[state=on]:bg-danger data-[state=on]:text-danger-foreground',
        info: 'hover:bg-info hover:text-info-foreground data-[state=on]:bg-info data-[state=on]:text-info-foreground',
      },
      size: {
        sm: 'px-2 py-1 text-sm',
        md: 'px-3 py-2 text-sm',
        lg: 'px-4 py-3 text-base',
      },
    },
    defaultVariants: {
      size: 'md',
      color: 'primary',
    },
  },
);

const ToggleGroupRoot = ToggleGroupPrimitive.Root;

const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> & VariantProps<typeof toggleGroupItemVariants>
>(({ className, color, size, ...props }, ref) => (
  <ToggleGroupPrimitive.Item ref={ref} className={cn(toggleGroupItemVariants({ color, size, className }))} {...props} />
));

export type ToggleGroupProps = React.ComponentPropsWithoutRef<typeof ToggleGroupRoot> &
  VariantProps<typeof toggleGroupItemVariants> & {
    items: (Omit<React.ComponentPropsWithoutRef<typeof ToggleGroupItem>, 'children' | 'color' | 'size'> & {
      content: React.ReactNode;
    })[];
    /**
     * Optional label for the ToggleGroup
     */
    label?: ReactNode;
    /**
     * Optional color for the ToggleGroup (primary).
     * @default primary
     */
    color?: 'primary';

    /**
     * Optional size for the ToggleGroup (sm, md, lg).
     * @default md
     */
    size?: 'sm' | 'md' | 'lg';
    /**
     * Optional orientation for the ToggleGroup (vertical, horizontal).
     */
    inline?: boolean;
  };

const ToggleGroup = React.forwardRef<HTMLDivElement, ToggleGroupProps>(
  ({ items, className, color, size, label, inline, ...props }, ref) => (
    <ToggleGroupRoot
      className={cn(
        'flex flex-col items-start justify-center gap-2',
        {
          'flex-row items-center justify-start': inline,
        },
        className,
      )}
      ref={ref}
      {...props}
    >
      <Label>{label}</Label>
      <Flex>
        {items.map(({ value, content, ...itemProps }) => (
          <ToggleGroupItem key={value} value={value} color={color} size={size} {...itemProps}>
            {content}
          </ToggleGroupItem>
        ))}
      </Flex>
    </ToggleGroupRoot>
  ),
);

export { ToggleGroup, ToggleGroupItem, ToggleGroupRoot, toggleGroupItemVariants };
