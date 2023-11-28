import { useEffect, useState } from 'react';

import type { RadioInputProps } from '../RadioInput';

import { Stack } from '@/layouts';
import { cn, forwardRef } from '@/utils';

import { ErrorMessage } from '../ErrorMessage';
import { Label } from '../Label';
import { RadioInput } from '../RadioInput';

export interface RadioInputGroupProps extends RadioInputProps {
  /**
   * The options for the radio input group
   */
  options: {
    label: string;
    value: string;
  }[];
  /**
   * The default value for the radio input group
   */
  defaultValue?: string;
  /**
   * The default value for the radio input group
   */
  value?: string;
  /**
   * The label for the radio input group
   */
  label?: string;
  /**
   * The class name for the radio input group label
   */
  labelClassName?: string;
  /**
   * Whether the radio input group is vertical or horizontal.
   */
  inline?: boolean;
}

export const RadioInputGroup = forwardRef<RadioInputGroupProps, 'label'>(
  (
    {
      options,
      label,
      defaultValue,
      value: localValue,
      onChange,
      onCheckedChange,
      required,
      isInvalid,
      labelClassName,
      errorMessage,
      id,
      disabled,
      inline,
      ...props
    },
    ref,
  ) => {
    const [value, setValue] = useState<string | undefined>(localValue ?? defaultValue);

    useEffect(() => {
      setValue(localValue);
    }, [localValue]);

    const onChangeHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
      onChange?.(event);
      onCheckedChange?.(event.target.checked);
    };

    return (
      <>
        <Stack gap="4">
          {label && (
            <Label
              text={label}
              id={id}
              ref={ref}
              isInvalid={isInvalid}
              required={required}
              className={labelClassName}
              disabled={disabled}
            />
          )}
          <Stack
            className={cn('inline-flex', {
              'flex-row gap-3': inline,
            })}
          >
            {options.map((option) => (
              <RadioInput
                {...props}
                key={option.value}
                id={option.value}
                name={option.value}
                value={option.value}
                label={option.label}
                onChange={onChangeHandle}
                checked={value === option.value}
                isInvalid={isInvalid}
                disabled={disabled}
              />
            ))}
          </Stack>
        </Stack>
        {isInvalid && <ErrorMessage message={errorMessage} />}
      </>
    );
  },
);
