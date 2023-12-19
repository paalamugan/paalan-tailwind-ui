import * as React from 'react';

import type { ColorVariant } from '@/constants';

import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { cva } from 'class-variance-authority';

import { CheckIcon, MinusIcon } from '@/icons';
import { Box } from '@/layouts';
import { cn, isAriaInvalid } from '@/utils/helper';

import { ErrorMessage } from '../ErrorMessage';
import { Label } from '../Label';

const checkboxVariants = cva(
  'peer h-4 w-4 shrink-0 rounded-sm border focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
        secondary: 'border-secondary data-[state=checked]:bg-secondary data-[state=checked]:text-secondary-foreground',
        tertiary: 'border-tertiary data-[state=checked]:bg-tertiary data-[state=checked]:text-tertiary-foreground',
        info: 'border-info data-[state=checked]:bg-info data-[state=checked]:text-info-foreground',
        success: 'border-success data-[state=checked]:bg-success data-[state=checked]:text-success-foreground',
        warning: 'border-warning data-[state=checked]:bg-warning data-[state=checked]:text-warning-foreground',
        danger: 'border-danger data-[state=checked]:bg-danger data-[state=checked]:text-danger-foreground',
        accent: 'border-accent data-[state=checked]:bg-accent data-[state=checked]:text-accent-foreground',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  },
);

const CheckboxRoot = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & { variant?: ColorVariant; indeterminate?: boolean }
>(({ className, variant, indeterminate, ...props }, ref) => (
  <CheckboxPrimitive.Root ref={ref} className={cn(checkboxVariants({ variant }), className)} {...props}>
    <CheckboxPrimitive.Indicator className={cn('flex items-center justify-center text-current')}>
      {indeterminate ? <MinusIcon className="h-full w-full pb-0.5" /> : <CheckIcon className="h-full w-full" />}
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
CheckboxRoot.displayName = CheckboxPrimitive.Root.displayName;

interface CheckboxProps extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  /** Label for the checkbox */
  label?: string;
  /** Whether the checkbox is checked or not */
  checked?: boolean;
  /** Whether the checkbox is disabled or not */
  disabled?: boolean;
  /** Callback when the checkbox value changes */
  onCheckedChange?: (checked: boolean) => void;
  /** Variant of the checkbox */
  variant?: ColorVariant;
  /**
   * Whether the checkbox is swapped to the right or not
   */
  swapRight?: boolean;
  /**
   * The class name for the checkbox label
   */
  labelClassName?: string;
  /**
   * Whether the checkbox is invalid.
   */
  'aria-invalid'?: boolean;
  /**
   * whether the checkbox is invalid
   */
  isInvalid?: boolean;
  /**
   * The error message for the checkbox
   */
  errorMessage?: string;
  /**
   * Whether the checkbox is indeterminate or not
   */
  indeterminate?: boolean;
}

const Checkbox = React.forwardRef<React.ElementRef<typeof CheckboxPrimitive.Root>, CheckboxProps>(
  (
    { label, className, swapRight, labelClassName, isInvalid: invalid, errorMessage, indeterminate, checked, ...props },
    ref,
  ) => {
    const isInvalid = isAriaInvalid(props['aria-invalid']) || invalid;
    const id = props.id || props.name || label;
    return (
      <>
        <Box className="flex items-center gap-2">
          <CheckboxRoot
            ref={ref}
            {...props}
            id={id}
            checked={indeterminate ? true : checked}
            indeterminate={indeterminate}
            className={cn(
              {
                'order-1': swapRight,
                'border-danger data-[state=checked]:bg-danger data-[state=checked]:text-danger-foreground': isInvalid,
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
        </Box>
        {isInvalid && <ErrorMessage message={errorMessage} />}
      </>
    );
  },
);
Checkbox.displayName = 'Checkbox';

export { Checkbox, CheckboxRoot };
