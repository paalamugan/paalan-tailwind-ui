import type * as React from 'react';
import type { InputProps } from '../Input';

import { useControllableState } from '@/hooks';
import { forwardRef, isDefinedValue, isPositiveFloat, isPositiveInteger } from '@/utils';

import { Input } from '../Input';

export interface NumberInputProps extends InputProps {
  /**
   * value of number input
   */
  value: string | number;
  /**
   * default value of number input(when uncontrolled)
   */
  defaultValue?: string | number;
  /**
   * If true, only positive integer is allowed
   */
  isPositiveInteger?: boolean;
  /**
   * If true, only positive float is allowed
   */
  isPositiveFloat?: boolean;
  /**
   * If true, only positive integer is allowed and starts with zero
   * @default false
   */
  positiveIntegerStartsWithZero?: boolean;
  /**
   * if true, only positive float is allowed and starts with zero
   * @default false
   */
  positiveFloatStartsWithZero?: boolean;
}

export const NumberInput = forwardRef<NumberInputProps, 'input'>(
  (
    {
      isPositiveInteger: isPositiveIntegerValue,
      isPositiveFloat: isPositiveFloatValue,
      onChange,
      onValueChange,
      value,
      defaultValue,
      positiveIntegerStartsWithZero = false,
      positiveFloatStartsWithZero = false,
      ...props
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = useControllableState({
      value: isDefinedValue(value) ? `${value}` : '',
      defaultValue: isDefinedValue(defaultValue) ? `${defaultValue}` : '',
      onChange: onValueChange,
    });

    const onChangeHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      if (value === '') {
        setInternalValue(value);
        return onChange?.(event);
      }

      if (isPositiveIntegerValue) {
        if (isPositiveInteger(value, positiveIntegerStartsWithZero ? 0 : 1)) {
          setInternalValue(value);
          onChange?.(event);
        }
      } else if (isPositiveFloatValue) {
        if (isPositiveFloat(value, positiveFloatStartsWithZero ? 0 : 1)) {
          setInternalValue(value);
          onChange?.(event);
        }
      } else {
        setInternalValue(value);
        onChange?.(event);
      }
    };
    return <Input {...props} type="number" value={internalValue} onChange={onChangeHandle} ref={ref} />;
  },
);
NumberInput.displayName = 'NumberInput';
