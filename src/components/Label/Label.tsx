import * as React from 'react';

import type { VariantProps } from 'class-variance-authority';

import * as LabelPrimitive from '@radix-ui/react-label';
import { cva } from 'class-variance-authority';

import { cn } from '@/utils/helper';

const labelVariants = cva('text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70');

interface LabelProps
  extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>,
    VariantProps<typeof labelVariants> {
  /**
   * if required, adds a red asterisk to the label
   */
  required?: boolean;
  /**
   *
   */
  text?: React.ReactNode;
  /**
   * if true, show the label in red color
   */
  isInvalid?: boolean;
  /**
   * if true, disable the label
   */
  disabled?: boolean;
}
const Label = React.forwardRef<React.ElementRef<typeof LabelPrimitive.Root>, LabelProps>(
  ({ className, required = false, text, isInvalid, children, disabled, ...props }, ref) => (
    <LabelPrimitive.Root
      ref={ref}
      className={cn(labelVariants(), { 'text-danger': isInvalid, 'opacity-70': disabled }, className)}
      {...props}
    >
      {text || children}
      {required && <span className="text-danger/70">*</span>}
    </LabelPrimitive.Root>
  ),
);
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
