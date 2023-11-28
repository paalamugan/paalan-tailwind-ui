import type { BoxProps } from '@/layouts/Box';
import type { VariantProps } from 'class-variance-authority';

import { cva } from 'class-variance-authority';

import { Box } from '@/layouts';
import { forwardRef } from '@/utils/forward-ref';
import { cn } from '@/utils/helper';

const badgeVariants = cva(
  'inline-flex items-center rounded-md border border-transparent font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-primary-foreground',
        secondary: 'bg-secondary text-secondary-foreground',
        tertiary: 'bg-tertiary text-tertiary-foreground',
        danger: 'bg-danger text-danger-foreground',
        warning: 'bg-warning text-warning-foreground',
        success: 'bg-success text-success-foreground',
        info: 'bg-info text-info-foreground',
        outline: 'border-inherit text-foreground',
      },
      size: {
        sm: 'px-1.5 py-0.5 text-xs',
        md: 'px-2.5 py-0.5 text-xs',
        lg: 'px-3 py-0.5 text-sm',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);

export interface BadgeProps extends VariantProps<typeof badgeVariants>, Omit<BoxProps, 'size'> {
  /**
   * Optional label for the badge
   */
  label?: string;
}

/**
 *  Displays a badge or a component that looks like a badge.
 */
const Badge = forwardRef<BadgeProps, 'div'>(({ className, label, children, variant, size, ...props }, ref) => {
  return (
    <Box {...props} ref={ref} className={cn(badgeVariants({ variant, size }), className)}>
      {label || children}
    </Box>
  );
});

export { Badge, badgeVariants };
