import type { BoxProps } from '@/layouts';

import { Box } from '@/layouts';
import { forwardRef } from '@/utils';
import { cn, isAriaInvalid } from '@/utils/helper';

import { ErrorMessage } from '../ErrorMessage';
import { Label } from '../Label';

export interface InputProps extends BoxProps {
  /**
   * whether the input is invalid
   */
  isInvalid?: boolean;
  /**
   * label for the input
   */
  label?: string;
  /**
   * inline input or not
   */
  inline?: boolean;
  /**
   * input class name for styling
   */
  inputClassName?: string;
  /**
   * Optional value change handler for the number input
   */
  onValueChange?: (value: string) => void;
  /**
   * The error message for the checkbox
   */
  errorMessage?: string;
}

const Input = forwardRef<InputProps, 'input'>(
  (
    {
      className,
      type,
      isInvalid: invalid,
      label,
      required,
      id,
      inline,
      inputClassName,
      onValueChange,
      errorMessage,
      ...props
    },
    ref,
  ) => {
    const isInvalid = isAriaInvalid(props['aria-invalid']) || invalid;
    const labelId = id || props.name || label;

    const onChangeHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      onValueChange?.(value);
      props.onChange?.(event);
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
            <Label
              htmlFor={labelId}
              required={required}
              className={cn({
                'text-danger': isInvalid,
              })}
            >
              {label}
            </Label>
          )}
          <Box
            {...props}
            as="input"
            type={type}
            id={labelId}
            required={required}
            className={cn(
              'flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
              {
                'border-danger placeholder:text-danger focus-visible:ring-danger/40': isInvalid,
                'bg-muted/40 read-only:focus-visible:ring-0': props.readOnly,
              },
              inputClassName,
            )}
            ref={ref}
            onChange={onChangeHandle}
          />
        </Box>
        {isInvalid && <ErrorMessage message={errorMessage} />}
      </>
    );
  },
);
Input.displayName = 'Input';

export { Input };
