import React from 'react';

import type { ColorVariant } from '@/constants';
import type { OptionType } from '@/types';
import type { ReactNode } from 'react';

import { Box } from '@/layouts';
import { cn, isAriaInvalid } from '@/utils/helper';

import { Checkbox } from '../Checkbox';
import { ErrorMessage } from '../ErrorMessage';
import { Label } from '../Label';

export interface CheckboxGroupProps {
  /** options for the checkbox group */
  options: Array<OptionType | string | number>;
  /** selectedValues for the checkbox group */
  selectedValues: string[] | undefined;
  /** Callback when the checkbox value changes */
  onSelectedValueChange: (selectedValues: string[]) => void;
  /** Label for the checkbox */
  label?: ReactNode;
  /**
   * The class name for the label
   */
  labelClassName?: string;
  /**
   * Whether the checkbox group is inline or not
   */
  inline?: boolean;
  /** Variant of the checkbox */
  variant?: ColorVariant;
  /**
   * Whether the checkbox is swapped to the right or not
   */
  swapRight?: boolean;
  /**
   * The class name for the checkbox group
   */
  className?: string;
  /**
   * Whether the checkbox group is required
   */
  required?: boolean;
  /**
   * Whether the checkbox group is invalid.
   */
  'aria-invalid'?: boolean;
  /**
   * whether the checkbox group is invalid
   */
  isInvalid?: boolean;
  /**
   * The error message for the checkbox
   */
  errorMessage?: string;
}

export const CheckboxGroup = React.forwardRef<React.ElementRef<'div'>, CheckboxGroupProps>(
  (
    {
      label,
      options,
      selectedValues = [],
      onSelectedValueChange,
      variant,
      inline,
      swapRight,
      className,
      labelClassName,
      required,
      isInvalid: invalid,
      errorMessage,
      ...props
    },
    ref,
  ) => {
    const isInvalid = isAriaInvalid(props['aria-invalid']) || invalid;
    const localOptions = React.useMemo(() => {
      return options.map((option) => {
        if (typeof option === 'string' || typeof option === 'number') {
          return { label: option.toString(), value: option.toString() };
        }
        return option;
      });
    }, [options]);

    return (
      <>
        <Box className="grid gap-4">
          {label && (
            <Label required={required} className={labelClassName} isInvalid={isInvalid}>
              {label}
            </Label>
          )}
          <Box
            className={cn(
              'grid gap-3',
              {
                'auto-cols-max grid-flow-col gap-4': inline,
              },
              className,
            )}
            ref={ref}
          >
            {localOptions.map((option: OptionType) => (
              <Checkbox
                key={option.value}
                variant={variant}
                id={option.value}
                checked={selectedValues?.includes(option.value)}
                swapRight={swapRight}
                className={option.className}
                labelClassName="font-normal"
                label={option.label}
                disabled={option.disabled}
                isInvalid={isInvalid}
                onCheckedChange={(checked) => {
                  return checked
                    ? onSelectedValueChange([...selectedValues, option.value])
                    : onSelectedValueChange(selectedValues?.filter((value) => value !== option.value));
                }}
              />
            ))}
          </Box>
        </Box>
        {isInvalid && <ErrorMessage message={errorMessage} />}
      </>
    );
  },
);
CheckboxGroup.displayName = 'CheckboxGroup';
