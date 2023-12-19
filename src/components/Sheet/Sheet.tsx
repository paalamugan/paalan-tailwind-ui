import * as React from 'react';

import type { VariantProps } from 'class-variance-authority';

import * as SheetPrimitive from '@radix-ui/react-dialog';
import { cva } from 'class-variance-authority';

import { Cross2Icon } from '@/icons/icons';
import { cn } from '@/utils/helper';

const SheetRoot = SheetPrimitive.Root;

const SheetTrigger = SheetPrimitive.Trigger;

const SheetClose = SheetPrimitive.Close;

const SheetPortal = ({ ...props }: SheetPrimitive.DialogPortalProps) => <SheetPrimitive.Portal {...props} />;
SheetPortal.displayName = SheetPrimitive.Portal.displayName;

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    className={cn(
      'fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className,
    )}
    {...props}
    ref={ref}
  />
));
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;

const sheetVariants = cva(
  'fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out',
  {
    variants: {
      side: {
        top: 'inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top',
        bottom:
          'inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom',
        left: 'inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm',
        right:
          'inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm',
      },
    },
    defaultVariants: {
      side: 'right',
    },
  },
);

interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
    VariantProps<typeof sheetVariants> {}

const SheetContent = React.forwardRef<React.ElementRef<typeof SheetPrimitive.Content>, SheetContentProps>(
  ({ side = 'right', className, children, ...props }, ref) => (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content ref={ref} className={cn(sheetVariants({ side }), className)} {...props}>
        {children}
        <SheetPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
          <Cross2Icon className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </SheetPrimitive.Close>
      </SheetPrimitive.Content>
    </SheetPortal>
  ),
);
SheetContent.displayName = SheetPrimitive.Content.displayName;

const SheetHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col space-y-2 text-center sm:text-left', className)} {...props} />
);
SheetHeader.displayName = 'SheetHeader';

const SheetFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)} {...props} />
);
SheetFooter.displayName = 'SheetFooter';

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title ref={ref} className={cn('text-lg font-semibold text-foreground', className)} {...props} />
));
SheetTitle.displayName = SheetPrimitive.Title.displayName;

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />
));
SheetDescription.displayName = SheetPrimitive.Description.displayName;

export interface SheetProps extends React.ComponentProps<typeof SheetRoot> {
  /**
   * The trigger element that will open the sheet
   */
  trigger: React.ReactNode;
  /**
   * The header of the sheet, title represents the main title and description is optional
   */
  header: {
    /**
     * The main title of the sheet
     */
    title: React.ReactNode;
    /**
     * The description of the sheet
     */
    description?: React.ReactNode;
    /**
     * The className of the sheet header, useful for adding padding
     */
    className?: string;
  };
  /**
   * The content of the sheet (usually a form or a list)
   */
  children?: React.ReactNode;
  /**
   * The footer of the sheet, primaryAction is the main action and secondaryAction is optional
   * primaryAction is usually a submit button
   * secondaryAction is usually a cancel button
   */
  footer?: {
    /**
     * The main action of the sheet (usually a submit button)
     */
    primaryAction?: React.ReactNode;
    /**
     * The secondary action of the sheet (usually a cancel button)
     */
    secondaryAction?: React.ReactNode;
    /**
     * The className of the sheet footer, useful for adding padding
     */
    className?: string;
  };
  /**
   * The side of the screen the sheet will be displayed
   */
  side?: 'top' | 'bottom' | 'left' | 'right';
  /**
   * The className of the sheet content, useful for adding padding
   */
  className?: string;
}
export const Sheet: React.FC<SheetProps> = ({
  side = 'right',
  trigger,
  header,
  footer,
  children,
  className,
  ...props
}) => {
  return (
    <SheetRoot {...props}>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent side={side} className={className}>
        <SheetHeader className={header?.className}>
          <SheetTitle>{header.title}</SheetTitle>
          {header.description && <SheetDescription>{header.description}</SheetDescription>}
        </SheetHeader>
        {children}
        <SheetFooter className={cn('my-4', footer?.className)}>
          {footer?.secondaryAction && <SheetClose asChild>{footer.secondaryAction}</SheetClose>}
          {footer?.primaryAction}
        </SheetFooter>
      </SheetContent>
    </SheetRoot>
  );
};

export { SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetRoot, SheetTitle, SheetTrigger };
