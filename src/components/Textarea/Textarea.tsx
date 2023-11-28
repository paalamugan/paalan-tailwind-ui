import type { BoxProps } from '@/layouts';

import { Box } from '@/layouts';
import { forwardRef } from '@/utils';
import { cn, isAriaInvalid } from '@/utils/helper';

import { ErrorMessage } from '../ErrorMessage';
import { Label } from '../Label';

export interface TextareaProps extends BoxProps {
  /**
   * whether the textarea is invalid
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
   * textarea class name for styling
   */
  className?: string;
  /**
   * parent class name for styling
   */
  parentClassName?: string;
  /**
   * error message for the textarea
   */
  errorMessage?: string;
}

const Textarea = forwardRef<TextareaProps, 'textarea'>(
  ({ className, isInvalid: invalid, label, inline, parentClassName, required, id, errorMessage, ...props }, ref) => {
    const isInvalid = isAriaInvalid(props['aria-invalid']) || invalid;
    const labelId = id || props.name || label;

    return (
      <>
        <Box
          className={cn(
            'flex w-full flex-col gap-2',
            {
              'flex-row items-center': inline,
            },
            parentClassName,
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
            as="textarea"
            className={cn(
              'flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
              {
                'border-danger placeholder:text-danger focus-visible:ring-danger/40': isInvalid,
                'bg-muted/40 read-only:focus-visible:ring-0': props.readOnly,
              },
              className,
            )}
            ref={ref}
            id={labelId}
            required={required}
          />
        </Box>
        {isInvalid && <ErrorMessage message={errorMessage} />}
      </>
    );
  },
);
Textarea.displayName = 'Textarea';

export { Textarea };
