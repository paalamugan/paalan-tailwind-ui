import { useEffect, useMemo, useRef, useState } from 'react';

import type { OptionType } from '@/types';
import type { FC, ReactNode } from 'react';

import {
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandLoading,
  CommandModal,
} from '@/components/Command';
import { Loading } from '@/components/Loading';
import { CheckIcon } from '@/icons/icons';
import { Box } from '@/layouts';
import { cn } from '@/utils';

export interface PopoverModalContentProps {
  /**
   * List of items to be displayed in the combobox
   */
  options: OptionType[];
  /**
   * Optional placeholder for the search input
   * @default Search...
   * */
  searchPlaceholder?: string;
  /**
   * Optional message to display when no results are found
   * @default 'No results found for "{search}".''
   * */
  emptyOptionMessage?: string;
  /**
   * Optional value for the combobox
   */
  value?: string;
  /**
   *
   * @param value the value to set
   * @returns void
   */
  onValueChange?: (value: string) => void;
  /**
   * Optional commandClassName for the combobox
   */
  commandClassName?: string;
  /**
   * Optional className for the CommandInput
   */
  commandInputClassName?: string;
  /**
   * Optional className for the CommandGroup
   */
  commandGroupClassName?: string;
  /**
   * Optional className for the CommandItem
   */
  commandItemClassName?: string;
  /**
   * Optional className for the CheckIcon
   */
  checkIconClassName?: (value: string) => string | string;
  /**
   * @param option  the option to filter
   * @param value  the value to filter by
   * @param index  the index of the option
   * @returns  boolean whether the option should be displayed
   */
  filter?: (option: OptionType, value: string, index: number) => boolean;
  /**
   * filterBy the option to filter by label, value or both
   * @default label
   */
  filterBy?: 'label' | 'value' | 'both';
  /**
   * Whether the combobox is multi
   */
  isMulti?: boolean;
  /**
   * Whether the combobox is loading
   */
  isLoading?: boolean;
  /**
   * Optional loading message for the combobox
   * @default 'Loading...'
   */
  loadingText?: ReactNode;
}

export const PopoverModalContent: FC<PopoverModalContentProps> = ({
  searchPlaceholder = 'Search...',
  emptyOptionMessage,
  options,
  value,
  onValueChange,
  commandClassName,
  commandInputClassName,
  commandGroupClassName,
  commandItemClassName,
  checkIconClassName,
  filter,
  filterBy = 'label',
  isMulti,
  isLoading,
  loadingText = 'Loading...',
}) => {
  const [searchValue, setSearchValue] = useState('');
  const filterRef = useRef(filter);

  useEffect(() => {
    filterRef.current = filter;
  }, [filter]);

  const filteredOptions = useMemo(() => {
    if (!searchValue) return options;
    if (typeof filterRef.current === 'function') {
      return options.filter((option, index) => filterRef.current?.(option, searchValue, index));
    }
    const filterKeys: (keyof OptionType)[] = filterBy === 'both' ? ['label', 'value'] : [filterBy];
    return options.filter((option) => {
      return filterKeys.some((key) => {
        const value = option[key];
        if (typeof value === 'string') {
          return value.toLowerCase().includes(searchValue.toLowerCase());
        }
        return false;
      });
    });
  }, [searchValue, filterBy, options]);

  const checkIconClassNameFn = (value: string) => {
    return typeof checkIconClassName === 'function' ? checkIconClassName(value) : checkIconClassName;
  };

  return (
    <CommandModal className={commandClassName} shouldFilter={false} loop>
      <CommandInput
        placeholder={searchPlaceholder}
        className={cn('border-transparent focus:border-transparent focus:ring-0', commandInputClassName)}
        value={searchValue}
        onValueChange={setSearchValue}
      />
      <CommandEmpty>
        {emptyOptionMessage || `No results found${searchValue ? ` for "${searchValue}"` : ''}.`}
      </CommandEmpty>
      <CommandGroup className={cn('max-h-64 overflow-auto', commandGroupClassName)}>
        {isLoading && (
          <CommandLoading>
            <Box className="p-3 text-center">
              <Loading boxSize="5" content={loadingText} />
            </Box>
          </CommandLoading>
        )}
        {filteredOptions.map((option) => (
          <CommandItem
            key={option.value}
            value={option.value}
            className={cn('flex cursor-pointer', commandItemClassName, option.className)}
            disabled={option.disabled}
            onSelect={(currentValue) => {
              onValueChange?.(currentValue === value ? '' : currentValue);
            }}
          >
            {isMulti && <CheckIcon className={cn('mr-2 h-4 w-4', checkIconClassNameFn(option.value))} />}
            {option.label}
            {!isMulti && (
              <CheckIcon
                className={cn(
                  'ml-auto h-4 w-4',
                  value === option.value ? 'opacity-100' : 'opacity-0',
                  checkIconClassNameFn(option.value),
                )}
              />
            )}
          </CommandItem>
        ))}
      </CommandGroup>
    </CommandModal>
  );
};

PopoverModalContent.displayName = 'PopoverModalContent';
