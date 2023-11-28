import React from 'react';

import type { HTMLTailwindStyledComponentProps } from '@/types';

import { cva } from 'class-variance-authority';

import { Box, Flex } from '@/layouts';
import { cn, isAriaInvalid } from '@/utils';

import { ErrorMessage } from '../ErrorMessage';
import { Label } from '../Label';

const radioVariants = cva(
  'peer inline-block h-4 w-4 cursor-pointer appearance-none rounded-full border border-gray-300 bg-background align-middle text-primary checked:border-transparent checked:bg-current focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-gray-100 disabled:opacity-50',
);
export interface RadioInputProps extends Omit<HTMLTailwindStyledComponentProps<'input'>, 'as' | 'children'> {
  /** Label for the radio */
  label?: string;
  /** Whether the radio is checked or not */
  checked?: boolean;
  /** Whether the radio is disabled or not */
  disabled?: boolean;
  /** Callback when the radio value changes */
  onCheckedChange?: (checked: boolean) => void;
  /**
   * Whether the radio is swapped to the right or not
   */
  swapRight?: boolean;
  /**
   * The class name for the radio label
   */
  labelClassName?: string;
  /**
   * Whether the radio is invalid.
   */
  'aria-invalid'?: boolean;
  /**
   * whether the radio is invalid
   */
  isInvalid?: boolean;
  /**
   * The error message for the radio
   */
  errorMessage?: string;
  /**
   * The parent class name for the radio
   */
  parentClassName?: string;
}

export const RadioInput = React.forwardRef<HTMLInputElement, RadioInputProps>(
  (
    {
      label,
      className,
      swapRight,
      labelClassName,
      isInvalid: invalid,
      errorMessage,
      parentClassName,
      onCheckedChange,
      ...props
    },
    ref,
  ) => {
    const isInvalid = isAriaInvalid(props['aria-invalid']) || invalid;
    const id = props.id || props.name || label;
    const onChangeHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
      const checked = event.target.checked;
      onCheckedChange?.(checked);
      props.onChange?.(event);
    };
    return (
      <>
        <Flex className={cn('inline-flex items-center gap-2', parentClassName)}>
          <Box
            {...props}
            as="input"
            ref={ref}
            id={id}
            onChange={onChangeHandle}
            type="radio"
            className={cn(
              'custom',
              radioVariants(),
              {
                'order-1': swapRight,
                'border-danger text-danger': isInvalid,
              },
              className,
            )}
          />
          {label && (
            <Label
              htmlFor={id}
              text={label}
              required={props.required}
              isInvalid={isInvalid}
              className={cn('cursor-pointer', labelClassName)}
            />
          )}
        </Flex>
        {isInvalid && <ErrorMessage message={errorMessage} />}
      </>
    );
  },
);
RadioInput.displayName = 'RadioInput';
