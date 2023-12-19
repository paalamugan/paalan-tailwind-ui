import * as React from 'react';

import type { ComboboxProps } from '../Combobox';

import { useCallbackRef } from '@/hooks';
import { CaretSortIcon, XMarkIcon } from '@/icons';
import { Box, Text } from '@/layouts';
import { cn, isAriaInvalid } from '@/utils/helper';

import { Badge } from '../Badge';
import { Button } from '../Button';
import { ErrorMessage } from '../ErrorMessage';
import { Label } from '../Label';
import { PopoverContent, PopoverRoot, PopoverTrigger } from '../Popover';
import { PopoverModalContent } from '../Popover/components';

export interface MultiSelectProps extends Omit<ComboboxProps, 'value' | 'onValueChange'> {
  /**
   * List of selected values
   */
  selectedValues: string[] | undefined;
  /**
   * onChange handler for the multiselect
   */
  onSelectedValueChange: (selectedValues: string[]) => void;
  /**
   * id for the multiselect
   */
  id?: string;
}

export const MultiSelect = React.forwardRef<React.ElementRef<'button'>, MultiSelectProps>(
  (
    {
      label,
      options,
      placeholder = 'Select',
      selectedValues = [],
      onSelectedValueChange,
      onBlur,
      triggerClassName,
      contentClassName,
      required,
      disabled,
      isInvalid: invalid,
      inline,
      id,
      errorMessage,
      open: defaultOpen = false,
      onOpenChange,
      ...popoverModalContentProps
    },
    ref,
  ) => {
    const [open, setOpen] = React.useState(defaultOpen);
    const onSelectedValueChangeRef = useCallbackRef(onSelectedValueChange);
    const isInvalid = isAriaInvalid(popoverModalContentProps['aria-invalid']) || invalid;
    const labelId = id || label?.toLowerCase().replace(/\s/g, '-') || '';

    React.useEffect(() => {
      setOpen(defaultOpen);
    }, [defaultOpen]);

    React.useEffect(() => {
      if (selectedValues.length === 0) {
        onSelectedValueChangeRef([]);
      }
    }, [selectedValues.length, onSelectedValueChangeRef]);

    const localOptions = React.useMemo(() => {
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

    const labelMapping = React.useMemo(() => {
      const mapping: Record<string, string> = {};
      localOptions.forEach((option) => {
        mapping[option.value] = option.label;
      });
      return mapping;
    }, [localOptions]);

    const handleUnselect = (item: string) => {
      onSelectedValueChange(selectedValues.filter((i) => i !== item));
    };

    const onOpenChangeHandle = (open: boolean) => {
      setOpen(open);
      onOpenChange?.(open);
    };

    return (
      <>
        <Box
          className={cn('flex w-full flex-col gap-2', {
            'flex-row items-center': inline,
          })}
        >
          {label && (
            <Label htmlFor={labelId} required={required} isInvalid={isInvalid} className="shrink-0">
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
                className={cn('h-10 min-h-[40px] w-full justify-between hover:bg-background', triggerClassName, {
                  'h-full': selectedValues.length > 1,
                  'text-muted-foreground hover:text-muted-foreground': !selectedValues.length,
                  'border-danger text-danger hover:bg-background hover:text-danger focus:ring-danger/40': isInvalid,
                })}
                onClick={() => setOpen(!open)}
                onBlur={onBlur}
                ref={ref}
                id={labelId}
              >
                {selectedValues.length ? (
                  <Box className="flex flex-wrap gap-2">
                    {selectedValues.map(
                      (item) =>
                        labelMapping[item] && (
                          <Badge variant="secondary" key={item}>
                            {labelMapping[item]}
                            <span
                              className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  handleUnselect(item);
                                  setOpen(false);
                                }
                              }}
                              onMouseDown={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                              }}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleUnselect(item);
                                setOpen(false);
                              }}
                            >
                              <XMarkIcon className="h-3 w-3 text-muted-foreground hover:rounded-full hover:bg-muted-foreground/40 hover:text-foreground" />
                            </span>
                          </Badge>
                        ),
                    )}
                  </Box>
                ) : (
                  <Text className="text-sm font-normal">{placeholder}</Text>
                )}
                <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className={cn('w-full p-0', contentClassName)}>
              <PopoverModalContent
                {...popoverModalContentProps}
                options={localOptions}
                onValueChange={(value) => {
                  onSelectedValueChange(
                    selectedValues.includes(value)
                      ? selectedValues.filter((item) => item !== value)
                      : [...selectedValues, value],
                  );
                  setOpen(true);
                }}
                isMulti
                checkIconClassName={(value) => (selectedValues.includes(value) ? 'opacity-100' : 'opacity-0')}
              />
            </PopoverContent>
          </PopoverRoot>
        </Box>
        {isInvalid && <ErrorMessage message={errorMessage} />}
      </>
    );
  },
);
