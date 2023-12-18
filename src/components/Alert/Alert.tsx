import * as React from 'react';

import type { BoxProps } from '@/layouts';
import type { VariantProps } from 'class-variance-authority';

import { cva } from 'class-variance-authority';

import { SolidCloseIcon } from '@/icons/custom';
import { Box } from '@/layouts';
import { cn, forwardRef } from '@/utils';

import { IconButton } from '../IconButton';

const alertVariants = cva(
  'relative w-full rounded-lg border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7',
  {
    variants: {
      colorVariant: {
        default: 'bg-background text-foreground',
        primary: 'border-primary/50 text-primary dark:border-primary [&>svg]:text-primary',
        secondary:
          'border-secondary-foreground/50 text-secondary-foreground dark:border-secondary-foreground [&>svg]:text-secondary-foreground',
        tertiary: 'border-tertiary/50 text-tertiary dark:border-tertiary [&>svg]:text-tertiary',
        info: 'border-info/50 text-info dark:border-info [&>svg]:text-info',
        success: 'border-success/50 text-success dark:border-success [&>svg]:text-success',
        warning: 'border-warning/50 text-warning dark:border-warning [&>svg]:text-warning',
        danger: 'border-danger/50 text-danger dark:border-danger [&>svg]:text-danger',
      },
      softBackground: {
        primary: 'border-primary-soft/30 bg-primary-soft/30 text-primary [&>svg]:text-primary',
        secondary:
          'border-secondary-soft/30 bg-secondary-soft/30 text-secondary-foreground [&>svg]:text-secondary-foreground',
        tertiary: 'border-tertiary-soft/30 bg-tertiary-soft/30 text-tertiary [&>svg]:text-tertiary',
        info: 'border-info-soft/30 bg-info-soft/30 text-info [&>svg]:text-info',
        success: 'border-success-soft/30 bg-success-soft/30 text-success [&>svg]:text-success',
        warning: 'border-warning-soft/60 bg-warning-soft/60 text-warning [&>svg]:text-warning',
        danger: 'border-danger-soft/30 bg-danger-soft/30 text-danger [&>svg]:text-danger',
      },
      solidBackground: {
        primary: 'border-primary bg-primary text-primary-foreground [&>svg]:text-primary-foreground',
        secondary: 'border-secondary bg-secondary text-secondary-foreground [&>svg]:text-secondary-foreground',
        tertiary: 'border-tertiary bg-tertiary text-tertiary-foreground [&>svg]:text-tertiary-foreground',
        info: 'border-info bg-info text-info-foreground [&>svg]:text-info-foreground',
        success: 'border-success bg-success text-success-foreground [&>svg]:text-success-foreground',
        warning: 'border-warning bg-warning text-warning-foreground [&>svg]:text-warning-foreground',
        danger: 'border-danger bg-danger text-danger-foreground [&>svg]:text-danger-foreground',
      },
    },
    defaultVariants: {
      colorVariant: 'default',
    },
  },
);

const AlertRoot = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants> & BoxProps
>(({ className, colorVariant, softBackground, solidBackground, ...props }, ref) => (
  <Box
    ref={ref}
    role="alert"
    className={cn(alertVariants({ colorVariant, softBackground, solidBackground }), className)}
    {...props}
  />
));
AlertRoot.displayName = 'AlertRoot';

const AlertTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement> & BoxProps>(
  ({ className, ...props }, ref) => (
    <Box as="h5" ref={ref} className={cn('mb-1 font-medium leading-none tracking-tight', className)} {...props} />
  ),
);
AlertTitle.displayName = 'AlertTitle';

const AlertDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement> & BoxProps>(
  ({ className, ...props }, ref) => (
    <Box ref={ref} className={cn('text-sm [&_p]:leading-relaxed', className)} {...props} />
  ),
);
AlertDescription.displayName = 'AlertDescription';

export interface AlertProps extends Omit<React.ComponentPropsWithoutRef<typeof AlertRoot>, 'children'> {
  /** Title for the alert */
  title?: string;
  /** Description for the alert */
  description?: string;
  /**
   * Icon for the alert
   */
  icon?: React.ReactNode;
  /**
   * Whether the alert is dismissible or not
   */
  dismissible?: boolean;
  /** onDismiss functions call when the alert is dismissed */
  onDismiss?: () => void;
}

/**
 * Alerts are used to communicate a state that affects a system, feature, or page.
 */
export const Alert = forwardRef<AlertProps, 'div'>(
  ({ title, icon, dismissible, onDismiss, description, ...props }, ref) => {
    const [isDismissed, setIsDismissed] = React.useState(false);

    const onDismissAlert = () => {
      setIsDismissed(true);
      onDismiss?.();
    };

    return (
      <>
        {!isDismissed && (
          <AlertRoot {...props} ref={ref}>
            {icon}
            {title && <AlertTitle>{title}</AlertTitle>}
            {description && <AlertDescription>{description}</AlertDescription>}
            {dismissible && (
              <IconButton
                className="absolute right-0 top-0 p-3"
                onClick={onDismissAlert}
                icon={<SolidCloseIcon className="h-5 w-5" />}
              />
            )}
          </AlertRoot>
        )}
      </>
    );
  },
);

export { AlertDescription, AlertRoot, AlertTitle };
