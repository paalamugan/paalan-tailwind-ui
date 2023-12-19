import * as React from 'react';

import type { DialogProps } from '@radix-ui/react-dialog';
import type { CommandGroupList } from './types';

import { Command as CommandPrimitive } from 'cmdk';

import { DialogContent, DialogRoot } from '@/components/Dialog/Dialog';
import { MagnifyingGlassIcon } from '@/icons';
import { Text } from '@/layouts';
import { cn } from '@/utils/helper';

const CommandModal = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={cn(
      'flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground',
      className,
    )}
    {...props}
  />
));
CommandModal.displayName = CommandPrimitive.displayName;

export interface CommandDialogProps extends DialogProps {}

const CommandDialog: React.FC<CommandDialogProps> = ({ children, ...props }) => {
  return (
    <DialogRoot {...props}>
      <DialogContent className="overflow-hidden p-0">
        <CommandModal className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
          {children}
        </CommandModal>
      </DialogContent>
    </DialogRoot>
  );
};

const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => (
  <div className="flex items-center border-b px-3" data-cmdk-input-wrapper="">
    <MagnifyingGlassIcon className="mr-2 h-4 w-4 shrink-0 opacity-50" />
    <CommandPrimitive.Input
      ref={ref}
      className={cn(
        'flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    />
  </div>
));

CommandInput.displayName = CommandPrimitive.Input.displayName;

const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn('max-h-[300px] overflow-y-auto overflow-x-hidden', className)}
    {...props}
  />
));

CommandList.displayName = CommandPrimitive.List.displayName;

const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => <CommandPrimitive.Empty ref={ref} className="py-6 text-center text-sm" {...props} />);

CommandEmpty.displayName = CommandPrimitive.Empty.displayName;

const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn(
      'overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground',
      className,
    )}
    {...props}
  />
));

CommandGroup.displayName = CommandPrimitive.Group.displayName;

const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator ref={ref} className={cn('-mx-1 h-px bg-border', className)} {...props} />
));
CommandSeparator.displayName = CommandPrimitive.Separator.displayName;

const CommandLoading = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Loading>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Loading>
>(({ ...props }, ref) => <CommandPrimitive.Loading ref={ref} {...props} />);
CommandLoading.displayName = CommandPrimitive.Loading.displayName;

const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, onSelect, ...props }, ref) => {
  return (
    <CommandPrimitive.Item
      ref={ref}
      {...props}
      className={cn(
        'relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        className,
      )}
      onSelect={(value) => {
        onSelect?.(props.value ?? value);
      }}
    />
  );
});

CommandItem.displayName = CommandPrimitive.Item.displayName;

const CommandShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
  return <span className={cn('ml-auto text-xs tracking-widest text-muted-foreground', className)} {...props} />;
};
CommandShortcut.displayName = 'CommandShortcut';

export interface CommandProps extends Omit<React.ComponentPropsWithoutRef<typeof CommandDialog>, 'children'> {
  /**
   * Optional input options for the command input field
   */
  inputOptions?: React.ComponentPropsWithoutRef<typeof CommandInput>;
  /**
   * Optional content to display when no results are found
   */
  emptyResultContent?: React.ReactNode;
  /**
   * Optional groups to display in the command dialog
   */
  groups: CommandGroupList[];
}

const Command: React.FC<CommandProps> = ({
  inputOptions,
  emptyResultContent = 'No results found.',
  groups,
  ...props
}) => {
  return (
    <CommandDialog {...props}>
      <CommandInput placeholder="Search..." {...inputOptions} />
      <CommandList>
        <CommandEmpty>{emptyResultContent}</CommandEmpty>
        {groups.map(({ items, ...group }, index) => (
          <React.Fragment key={group.heading}>
            <CommandGroup {...group}>
              {items.map(({ icon, label, shortcut, ...item }) => (
                <CommandItem key={label} {...item} id={`${group.heading} - ${label}`}>
                  {icon && (
                    <Text as="span" className="mr-2">
                      {icon}
                    </Text>
                  )}
                  <Text as="span" className="text-sm">
                    {label}
                  </Text>
                  {shortcut && <CommandShortcut>{shortcut}</CommandShortcut>}
                </CommandItem>
              ))}
            </CommandGroup>
            {index !== groups.length && <CommandSeparator />}
          </React.Fragment>
        ))}
      </CommandList>
    </CommandDialog>
  );
};

Command.displayName = 'Command';

export {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandLoading,
  CommandModal,
  CommandSeparator,
  CommandShortcut,
};
