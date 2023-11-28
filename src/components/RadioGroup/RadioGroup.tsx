import * as React from 'react';

import type { ColorVariant } from '@/constants';
import type { OptionType } from '@/types';

import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { cva } from 'class-variance-authority';

import { CheckIcon } from '@/icons/custom';
import { Box } from '@/layouts';
import { cn, isAriaInvalid } from '@/utils/helper';

import { ErrorMessage } from '../ErrorMessage';
import { Label } from '../Label';

const radioGroupVariants = cva(
  'aspect-square h-4 w-4 rounded-full border shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'border-primary text-primary',
        secondary: 'border-secondary text-secondary',
        tertiary: 'border-tertiary text-tertiary',
        info: 'border-info text-info',
        success: 'border-success text-success',
        warning: 'border-warning text-warning',
        danger: 'border-danger text-danger',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  },
);

const RadioGroupRoot = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return <RadioGroupPrimitive.Root className={cn('grid gap-3', className)} {...props} ref={ref} />;
});
RadioGroupRoot.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupRootItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> & { variant?: ColorVariant }
>(({ className, variant = 'primary', children, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item ref={ref} className={cn(radioGroupVariants({ variant }), className)} {...props}>
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center text-current">
        <CheckIcon className="h-3.5 w-3.5" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});
RadioGroupRootItem.displayName = RadioGroupPrimitive.Item.displayName;

export interface RadioGroupProps extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> {
  /** Array of options to render */
  options: Array<OptionType | string | number>;
  /** The selected value */
  value?: string;
  /** Callback when the selected value changes */
  onValueChange?: (value: string) => void;
  /** Label for the radio group */
  label?: string;
  /** Whether the radio group is inline or not */
  inline?: boolean;
  /**
   * Whether the radio group is swap to right or not
   */
  swapRight?: boolean;
  /**
   * The class name for the label
   */
  labelClassName?: string;
  /**
   * The variant of the radio group
   */
  variant?: ColorVariant;
  /**
   * required or not
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

const RadioGroup = React.forwardRef<React.ElementRef<typeof RadioGroupPrimitive.Root>, RadioGroupProps>(
  (
    {
      options,
      value,
      onValueChange,
      inline,
      label,
      className,
      labelClassName,
      swapRight,
      isInvalid: invalid,
      variant,
      required,
      errorMessage,
      ...props
    },
    ref,
  ) => {
    const isInvalid = isAriaInvalid(props['aria-invalid']) || invalid;
    const [selectedValue, setSelectedValue] = React.useState(value);

    React.useEffect(() => {
      setSelectedValue(value);
    }, [value]);

    const localOptions = React.useMemo(() => {
      return options.map((option) => {
        if (typeof option === 'string' || typeof option === 'number') {
          return { label: option.toString(), value: option.toString() };
        }
        return option;
      });
    }, [options]);

    const onValueChangeHandle = (value: string) => {
      setSelectedValue(value);
      onValueChange?.(value);
    };

    return (
      <>
        <Box className="grid gap-4">
          {label && (
            <Label required={required} className={labelClassName} isInvalid={isInvalid}>
              {label}
            </Label>
          )}
          <RadioGroupRoot
            value={selectedValue}
            onValueChange={onValueChangeHandle}
            {...props}
            className={cn(
              {
                'auto-cols-max grid-flow-col gap-5': inline,
              },
              className,
            )}
            ref={ref}
          >
            {localOptions.map((option) => (
              <Box key={option.value} className="flex items-center gap-2">
                <RadioGroupRootItem
                  value={option.value}
                  id={option.value}
                  className={cn(
                    {
                      'order-1': swapRight,
                      'border-danger data-[state=checked]:bg-danger data-[state=checked]:text-danger-foreground':
                        isInvalid,
                    },
                    option.className,
                  )}
                  disabled={option.disabled}
                  variant={variant}
                />
                <Label
                  htmlFor={option.value}
                  isInvalid={isInvalid}
                  className={cn(
                    'cursor-pointer',
                    {
                      'font-normal': !!label,
                    },
                    labelClassName,
                  )}
                >
                  {option.label}
                </Label>
              </Box>
            ))}
          </RadioGroupRoot>
        </Box>
        {isInvalid && <ErrorMessage message={errorMessage} />}
      </>
    );
  },
);

RadioGroup.displayName = 'RadioGroup';
export { RadioGroup, RadioGroupRoot, RadioGroupRootItem, radioGroupVariants };
