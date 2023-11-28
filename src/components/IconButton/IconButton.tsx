import type { BoxProps } from '@/layouts';
import type React from 'react';

import { Box } from '@/layouts';
import { cn, forwardRef } from '@/utils';

export interface IconButtonProps extends BoxProps {
  /**
   * The icon to display.
   */
  icon?: React.ReactNode;
  /**
   * Additional class names to apply to the icon button.
   */
  className?: string;
  /**
   * Whether the icon button is disabled.
   */
  disabled?: boolean;
  /**
   * The rounded variant of the icon button.
   */
  outline?: boolean;
}

/**
 * Icon button component.
 */
export const IconButton = forwardRef<IconButtonProps, 'button'>(({ children, ...props }, ref) => {
  const { icon, className, disabled, outline, rounded = 'md', ...rest } = props;

  return (
    <Box
      {...rest}
      as="button"
      type="button"
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center disabled:cursor-not-allowed disabled:opacity-50',
        {
          'border border-border bg-transparent p-2 text-accent-foreground': outline,
        },
        className,
      )}
      disabled={disabled}
      rounded={rounded}
    >
      {icon || children}
    </Box>
  );
});
