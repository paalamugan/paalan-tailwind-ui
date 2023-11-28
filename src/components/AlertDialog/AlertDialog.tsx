import * as React from 'react';

import type { VariantProps } from 'class-variance-authority';

import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';

import { buttonVariants } from '@/components/Button/Button';
import { Box, Flex, Stack } from '@/layouts';
import { cn } from '@/utils/helper';

const AlertDialogRoot = AlertDialogPrimitive.Root;

const AlertDialogTrigger = AlertDialogPrimitive.Trigger;

const AlertDialogPortal = (props: AlertDialogPrimitive.AlertDialogPortalProps) => (
  <AlertDialogPrimitive.Portal {...props} />
);
AlertDialogPortal.displayName = AlertDialogPrimitive.Portal.displayName;

const AlertDialogOverlay = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Overlay
    className={cn(
      'fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className,
    )}
    {...props}
    ref={ref}
  />
));
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName;

const AlertDialogContent = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>
>(({ className, ...props }, ref) => (
  <AlertDialogPortal>
    <AlertDialogOverlay />
    <AlertDialogPrimitive.Content
      ref={ref}
      className={cn(
        'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg md:w-full',
        className,
      )}
      {...props}
    />
  </AlertDialogPortal>
));
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName;

const AlertDialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col space-y-2 text-center sm:text-left', className)} {...props} />
);
AlertDialogHeader.displayName = 'AlertDialogHeader';

const AlertDialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)} {...props} />
);
AlertDialogFooter.displayName = 'AlertDialogFooter';

const AlertDialogTitle = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Title ref={ref} className={cn('text-lg font-semibold', className)} {...props} />
));
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName;

const AlertDialogDescription = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Description ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />
));
AlertDialogDescription.displayName = AlertDialogPrimitive.Description.displayName;

const AlertDialogAction = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action> & VariantProps<typeof buttonVariants>
>(({ className, variant = 'primary', rounded, size, ...props }, ref) => (
  <AlertDialogPrimitive.Action
    ref={ref}
    className={cn(buttonVariants({ variant, rounded, size }), className)}
    {...props}
  />
));
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName;

const AlertDialogCancel = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel> & VariantProps<typeof buttonVariants>
>(({ className, variant = 'outline', rounded, size, ...props }, ref) => (
  <AlertDialogPrimitive.Cancel
    ref={ref}
    className={cn(buttonVariants({ variant, rounded, size }), 'mt-2 sm:mt-0', className)}
    {...props}
  />
));
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName;

interface AlertDialogProps extends React.ComponentPropsWithoutRef<typeof AlertDialogRoot> {
  /**
   * The trigger element. Must be a `Button` or `IconButton`.
   */
  trigger: React.ReactNode;
  /**
   * The icon of the alert dialog.
   */
  icon?: React.ReactNode;
  /**
   * The class name for the icon.
   */
  iconClassName?: string;
  /**
   * The header of the alert dialog.
   */
  header?: {
    /**
     * The title of the alert dialog.
     */
    title?: React.ReactNode;
    /**
     * The description of the alert dialog.
     */
    description?: React.ReactNode;
  };
  /**
   * The cancel button text.
   */
  cancelButtonText?: string;
  /**
   * The confirm button text.
   */
  confirmButtonText?: string;
  /**
   * The cancel button click handler.
   */
  onCancel?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  /**
   * The confirm button click handler.
   */
  onConfirm?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  /**
   * The props for the cancel button.
   */
  cancelButtonProps?: React.ComponentPropsWithoutRef<typeof AlertDialogCancel>;
  /**
   * The props for the confirm button.
   */
  confirmButtonProps?: React.ComponentPropsWithoutRef<typeof AlertDialogAction>;
}
const AlertDialog: React.FC<AlertDialogProps> = ({
  trigger,
  header,
  children,
  cancelButtonText = 'Cancel',
  confirmButtonText = 'Submit',
  onCancel,
  onConfirm,
  cancelButtonProps,
  confirmButtonProps,
  icon,
  iconClassName,
  ...props
}) => {
  return (
    <AlertDialogRoot {...props}>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <Flex alignItems="start">
          {icon && <Box className={cn('mr-4 mt-1 shrink-0', iconClassName)}>{icon}</Box>}
          <Stack>
            {header && (
              <AlertDialogHeader>
                {header.title && <AlertDialogTitle>{header.title}</AlertDialogTitle>}
                {header.description && <AlertDialogDescription>{header.description}</AlertDialogDescription>}
              </AlertDialogHeader>
            )}
            {children}
          </Stack>
        </Flex>

        <AlertDialogFooter>
          <AlertDialogCancel {...cancelButtonProps} onClick={onCancel}>
            {cancelButtonText}
          </AlertDialogCancel>
          <AlertDialogAction {...confirmButtonProps} onClick={onConfirm}>
            {confirmButtonText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialogRoot>
  );
};
export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogRoot,
  AlertDialogTitle,
  AlertDialogTrigger,
};
