import * as React from 'react';

import * as TooltipPrimitive from '@radix-ui/react-tooltip';

import { cn } from '@/utils/helper';

const TooltipProvider = TooltipPrimitive.Provider;

const TooltipRoot = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipPortal = TooltipPrimitive.Portal;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      'z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
      className,
    )}
    {...props}
  />
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

interface TooltipProps extends Omit<React.ComponentPropsWithoutRef<typeof TooltipContent>, 'content'> {
  /**
   * Tooltip trigger content
   *
   */
  children: React.ReactNode;
  /**
   * Tooltip body content
   *
   */
  content: React.ReactNode;
  /**
   * Tooltip side
   *
   * @default top
   */
  side?: 'top' | 'right' | 'bottom' | 'left';
  /**
   * Tooltip align
   *
   * @default center
   */
  align?: 'start' | 'center' | 'end';
  /**
   * Tooltip as portal (render tooltip in separate DOM node)
   *
   * @default false
   */
  asPortal?: boolean;
  /**
   * Tooltip open state
   *
   * @default false
   */
  open?: boolean;
  /**
   * Tooltip default open state
   *
   * @default false
   */
  defaultOpen?: boolean;
  /**
   * Tooltip on open state change handler
   *
   */
  onOpenChange?: (open: boolean) => void;
}

const Tooltip = React.forwardRef<React.ElementRef<typeof TooltipContent>, TooltipProps>(
  ({ className, children, asPortal, content, side = 'top', align = 'center', ...props }, ref) => {
    const TooltipPortalComponent = asPortal ? TooltipPortal : React.Fragment;
    const [open, setOpen] = React.useState(props.open ?? props.defaultOpen);

    React.useEffect(() => {
      if (props.open !== undefined) {
        setOpen(props.open);
      }
    }, [props.open]);

    const onOpenChangeHandle = (open: boolean) => {
      setOpen(open);
      props.onOpenChange?.(open);
    };
    return (
      <TooltipProvider delayDuration={100}>
        <TooltipRoot open={open} onOpenChange={onOpenChangeHandle}>
          <TooltipTrigger asChild>{children}</TooltipTrigger>
          <TooltipPortalComponent>
            <TooltipContent
              ref={ref}
              className={cn('bg-secondary fill-secondary text-secondary-foreground', className)}
              side={side}
              align={align}
              {...props}
            >
              {content}
              <TooltipPrimitive.Arrow width={11} height={5} />
            </TooltipContent>
          </TooltipPortalComponent>
        </TooltipRoot>
      </TooltipProvider>
    );
  },
);

export { Tooltip, TooltipContent, TooltipPortal, TooltipProvider, TooltipRoot, TooltipTrigger };
