import * as React from 'react';

import type { SelectOption, SelectOptionGroupType } from './types';

import * as SelectPrimitive from '@radix-ui/react-select';

import { useCallbackRef } from '@/hooks';
import { CaretSortIcon, CheckIcon } from '@/icons';
import { Box } from '@/layouts';
import { cn, isAriaInvalid } from '@/utils/helper';

import { ErrorMessage } from '../ErrorMessage';
import { Label } from '../Label';
import { isSelectOptionGroup } from './helper';

const SelectRoot = SelectPrimitive.Root;

const SelectPortal = SelectPrimitive.Portal;

const SelectIcon = SelectPrimitive.Icon;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      'flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus-visible:border-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
      className,
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <CaretSortIcon className="h-4 w-4 opacity-80" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = 'popper', ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        'relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        position === 'popper' &&
          'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
        className,
      )}
      position={position}
      {...props}
    >
      <SelectPrimitive.Viewport
        className={cn(
          'p-1',
          position === 'popper' &&
            'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]',
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label ref={ref} className={cn('px-2 py-1.5 text-sm font-semibold', className)} {...props} />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className,
    )}
    {...props}
  >
    <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <CheckIcon className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator ref={ref} className={cn('-mx-1 my-1 h-px bg-muted', className)} {...props} />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

interface SelectProps extends Omit<React.ComponentProps<typeof SelectRoot>, 'children'> {
  /**
   * The groups of options to display in the select.
   */
  options: SelectOption[];
  /**
   * The placeholder text to display when no option is selected.
   */
  placeholder?: React.ReactNode;
  /**
   * The label for the select.
   */
  label?: string;
  /**
   * The class name for the select.
   */
  className?: string;
  /**
   * The class name for the trigger select.
   */
  triggerClassName?: string;
  /**
   * The class name for the content select.
   */
  contentClassName?: string;
  /**
   * The id for the select.
   */
  id?: string;
  /**
   * Whether the select is required.
   */
  required?: boolean;
  /**
   * Whether the select is invalid.
   */
  'aria-invalid'?: boolean;
  /**
   * whether the select is invalid
   */
  isInvalid?: boolean;
  /**
   * blur event handler
   */
  onBlur?: () => void;
  /**
   * Optional inline for the select
   */
  inline?: boolean;
  /**
   * The error message for the checkbox
   */
  errorMessage?: string;
}

/**
 * Displays a list of options for the user to pick from—triggered by a button.
 */
const Select = React.forwardRef<React.ElementRef<typeof SelectTrigger>, SelectProps>(
  (
    {
      placeholder = 'Select',
      label,
      triggerClassName,
      contentClassName,
      options,
      id,
      required,
      value,
      defaultValue,
      onValueChange,
      onBlur,
      isInvalid: invalid,
      inline,
      className,
      errorMessage,
      ...props
    },
    ref,
  ) => {
    const [localValue, setLocalValue] = React.useState(value || defaultValue);
    const onValueChangeRef = useCallbackRef(onValueChange);
    const labelId = id || label?.toLowerCase().replace(/\s/g, '-');

    React.useEffect(() => {
      setLocalValue(value);
    }, [value]);

    const isInvalid = isAriaInvalid(props['aria-invalid']) || invalid;

    const groups: SelectOptionGroupType[] = React.useMemo(() => {
      const groupArray: SelectOptionGroupType[] = [];
      options.forEach((option) => {
        if (typeof option === 'string' || typeof option === 'number') {
          if (!groupArray.length) {
            groupArray.push({ options: [] });
          }
          if (option) {
            groupArray[0].options.push({ label: option.toString(), value: option.toString() });
          }
        } else if (isSelectOptionGroup(option)) {
          groupArray.push(option);
        } else {
          if (!groupArray.length) {
            groupArray.push({ options: [] });
          }
          groupArray[0].options.push(option);
        }
      });
      return groupArray;
    }, [options]);

    const selectedOption = React.useMemo(() => {
      if (!localValue) {
        return null;
      }
      for (const group of groups) {
        for (const option of group.options) {
          if (option.value === localValue) {
            return option;
          }
        }
      }
      return null;
    }, [groups, localValue]);

    const onValueChangeHandler = React.useCallback(
      (currentValue: string) => {
        const value = currentValue === localValue ? '' : currentValue;
        setLocalValue(value);
        onValueChangeRef(value);
      },
      [localValue, onValueChangeRef],
    );

    return (
      <>
        <Box
          className={cn(
            'flex w-full flex-col gap-2',
            {
              'flex-row items-center': inline,
            },
            className,
          )}
        >
          {label && (
            <Label htmlFor={labelId} required={required}>
              {label}
            </Label>
          )}
          <SelectRoot {...props} required={required} value={localValue} onValueChange={onValueChangeHandler}>
            <SelectTrigger
              className={cn(
                !localValue && 'text-muted-foreground',
                {
                  'border-danger text-danger focus-visible:ring-danger/40 ': isInvalid,
                },
                triggerClassName,
              )}
              id={labelId}
              ref={ref}
              onBlur={onBlur}
            >
              <SelectValue placeholder={placeholder}>{selectedOption?.label || localValue || placeholder}</SelectValue>
            </SelectTrigger>
            <SelectContent className={contentClassName}>
              {groups.map((group, index) => (
                <React.Fragment key={`${group.label || ''}${index.toString()}`}>
                  <SelectGroup>
                    {group.label && <SelectLabel>{group.label}</SelectLabel>}
                    {group.options.map(({ label, className, ...item }) => (
                      <SelectItem key={item.value} className={cn('cursor-pointer', className)} {...item}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                  {index !== groups.length - 1 && <SelectSeparator />}
                </React.Fragment>
              ))}
            </SelectContent>
          </SelectRoot>
        </Box>
        {isInvalid && <ErrorMessage message={errorMessage} />}
      </>
    );
  },
);

Select.displayName = SelectRoot.displayName || 'Select';

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectIcon,
  SelectItem,
  SelectLabel,
  SelectPortal,
  SelectRoot,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
