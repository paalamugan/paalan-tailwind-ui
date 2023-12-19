import React, { useEffect, useMemo, useState } from 'react';

import type { OptionType } from '@/types';
import type { PopoverModalContentProps } from '../Popover/components';

import { CaretSortIcon } from '@/icons';
import { Box, Text } from '@/layouts';
import { cn, isAriaInvalid } from '@/utils/helper';

import { Button } from '../Button';
import { ErrorMessage } from '../ErrorMessage';
import { Label } from '../Label';
import { PopoverContent, PopoverRoot, PopoverTrigger } from '../Popover';
import { PopoverModalContent } from '../Popover/components';

export interface ComboboxProps extends Omit<PopoverModalContentProps, 'options'> {
  /**
   * List of items to be displayed in the combobox
   */
  options: Array<OptionType | string | number>;
  /**
   * Whether the combobox is open
   */
  open?: boolean;
  /**
   *
   * @param open whether the combobox is open
   * @returns void
   */
  onOpenChange?: (open: boolean) => void;
  /**
   * Optional label for the combobox
   */
  label?: string;
  /**
   * Optional placeholder for the combobox
   * @default Select...
   * */
  placeholder?: string;

  /**
   * Whether the combobox is required
   */
  required?: boolean;
  /**
   * Optional disabled for the combobox
   */
  disabled?: boolean;
  /**
   * Optional selectedValues for the combobox
   */
  value?: string;
  /**
   * Optional onValueChange handler for the combobox
   */
  onValueChange?: (value: string) => void;
  /**
   * Optional onBlur handler for the combobox
   */
  onBlur?: () => void;
  /**
   * Whether the select is invalid.
   */
  'aria-invalid'?: boolean;
  /**
   * whether the select is invalid
   */
  isInvalid?: boolean;
  /**
   * Optional inline for the combobox
   */
  inline?: boolean;
  /**
   * Optional triggerClassName for the combobox
   */
  triggerClassName?: string;
  /**
   * Optional contentClassName for the combobox
   */
  contentClassName?: string;

  /**
   * Optional className for the combobox
   */
  className?: string;
  /**
   * Optional id for the combobox
   */
  id?: string;
  /**
   * The error message for the checkbox
   */
  errorMessage?: string;
}

/**
 * Autocomplete input and command palette with a list of suggestions.
 */
export const Combobox = React.forwardRef<React.ElementRef<'button'>, ComboboxProps>(
  (
    {
      label,
      options,
      placeholder = 'Select',
      required,
      value,
      onValueChange,
      onBlur,
      isInvalid: invalid,
      disabled,
      inline,
      triggerClassName,
      contentClassName,
      commandInputClassName = 'h-9',
      className,
      id,
      errorMessage,
      open: defaultOpen = false,
      onOpenChange,
      ...popoverModalContentProps
    },
    ref,
  ) => {
    const [open, setOpen] = useState(defaultOpen);
    const [localValue, setLocalValue] = useState(value);

    useEffect(() => {
      setOpen(defaultOpen);
    }, [defaultOpen]);

    const isInvalid = isAriaInvalid(popoverModalContentProps['aria-invalid']) || invalid;
    const labelId = id || label?.toLowerCase().replace(/\s/g, '-') || '';

    const localOptions = useMemo(() => {
      return options.map((option) => {
        if (typeof option === 'string' || typeof option === 'number') {
          return {
            value: option.toString(),
            label: option.toString(),
          };
        }
        return option;
      });
    }, [options]);

    useEffect(() => {
      setLocalValue(value);
    }, [value]);

    const setValue = (newValue: string) => {
      setLocalValue(newValue);
      onValueChange?.(newValue);
      setOpen(false);
    };

    const onOpenChangeHandle = (open: boolean) => {
      setOpen(open);
      onOpenChange?.(open);
    };

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
            <Label htmlFor={labelId} required={required} isInvalid={isInvalid}>
              {label}
            </Label>
          )}
          <PopoverRoot open={open} onOpenChange={onOpenChangeHandle}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                disabled={disabled}
                className={cn(
                  'w-full justify-between',
                  {
                    'text-muted-foreground hover:text-muted-foreground': !localValue,
                    'border-danger text-danger hover:bg-background hover:text-danger focus:ring-danger/40': isInvalid,
                  },
                  triggerClassName,
                )}
                onBlur={onBlur}
                ref={ref}
                id={labelId}
              >
                {localValue ? (
                  localOptions.find((option) => option.value === localValue)?.label
                ) : (
                  <Text fontSize="sm" className="font-normal">
                    {placeholder}
                  </Text>
                )}
                <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className={cn('w-full p-0', contentClassName)}>
              <PopoverModalContent
                {...popoverModalContentProps}
                commandInputClassName={commandInputClassName}
                options={localOptions}
                value={localValue}
                onValueChange={setValue}
              />
            </PopoverContent>
          </PopoverRoot>
        </Box>
        {isInvalid && <ErrorMessage message={errorMessage} />}
      </>
    );
  },
);
