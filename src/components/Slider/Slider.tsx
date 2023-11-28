import * as React from 'react';

import type { ColorVariant } from '@/constants';

import * as SliderPrimitive from '@radix-ui/react-slider';

import { cn } from '@/utils/helper';

const sliderVariant: Record<ColorVariant, { track: string; range: string; thumb: string }> = {
  primary: {
    track: 'bg-primary/20',
    range: 'bg-primary',
    thumb: 'border-primary/50',
  },
  secondary: {
    track: 'bg-secondary/20',
    range: 'bg-secondary',
    thumb: 'border-secondary/50',
  },
  tertiary: {
    track: 'bg-tertiary/20',
    range: 'bg-tertiary',
    thumb: 'border-tertiary/50',
  },
  danger: {
    track: 'bg-danger/20',
    range: 'bg-danger',
    thumb: 'border-danger/50',
  },
  warning: {
    track: 'bg-warning/20',
    range: 'bg-warning',
    thumb: 'border-warning/50',
  },
  success: {
    track: 'bg-success/20',
    range: 'bg-success',
    thumb: 'border-success/50',
  },
  info: {
    track: 'bg-info/20',
    range: 'bg-info',
    thumb: 'border-info/50',
  },
};

interface SliderProps extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  /**
   * The variant of the slider
   */
  variant?: ColorVariant;
}

/**
 * An input where the user selects a value from within a given range.
 */
const Slider = React.forwardRef<React.ElementRef<typeof SliderPrimitive.Root>, SliderProps>(
  ({ className, variant = 'primary', ...props }, ref) => {
    const sliderVariantColor = sliderVariant[variant || 'primary'];

    return (
      <SliderPrimitive.Root
        ref={ref}
        className={cn('relative flex w-full touch-none select-none items-center', className)}
        {...props}
      >
        <SliderPrimitive.Track
          className={cn('relative h-1.5 w-full grow overflow-hidden rounded-full', sliderVariantColor.track)}
        >
          <SliderPrimitive.Range className={cn('absolute h-full', sliderVariantColor.range)} />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb
          className={cn(
            'block h-4 w-4 rounded-full border bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
            sliderVariantColor.thumb,
          )}
        />
      </SliderPrimitive.Root>
    );
  },
);
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider, sliderVariant };
