import * as React from 'react';

import type { VariantProps } from 'class-variance-authority';

import * as ProgressPrimitive from '@radix-ui/react-progress';
import { cva } from 'class-variance-authority';

import { cn } from '@/utils/helper';

const progressRootVariants = cva('relative h-2 w-full overflow-hidden rounded-full', {
  variants: {
    variant: {
      default: 'bg-primary/20',
      primary: 'bg-primary/20',
      secondary: 'bg-secondary/20',
      danger: 'bg-danger/20',
      warning: 'bg-warning/20',
      success: 'bg-success/20',
      info: 'bg-info/20',
      dark: 'bg-foreground/20',
      accent: 'bg-accent/20',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const progressIndicatorVariants = cva('h-full w-full flex-1 transition-all', {
  variants: {
    variant: {
      default: 'bg-primary',
      primary: 'bg-primary',
      secondary: 'bg-secondary',
      danger: 'bg-danger',
      warning: 'bg-warning',
      success: 'bg-success',
      info: 'bg-info',
      dark: 'bg-foreground',
      accent: 'bg-accent',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>,
    VariantProps<typeof progressRootVariants> {
  /**
   * The value of the progress bar. Should be between 0 and 100.
   */
  value?: number;
}

const Progress = React.forwardRef<React.ElementRef<typeof ProgressPrimitive.Root>, ProgressProps>(
  ({ className, value, variant = 'default', ...props }, ref) => (
    <ProgressPrimitive.Root ref={ref} className={cn(progressRootVariants({ variant }), className)} {...props}>
      <ProgressPrimitive.Indicator
        className={cn(progressIndicatorVariants({ variant }))}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  ),
);
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress, progressIndicatorVariants, progressRootVariants };
