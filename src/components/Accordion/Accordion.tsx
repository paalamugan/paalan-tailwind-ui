import * as React from 'react';

import * as AccordionPrimitive from '@radix-ui/react-accordion';

import { ChevronDownIcon } from '@/icons/icons';
import { cn } from '@/utils/helper';

const AccordionRoot = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => {
  return <AccordionPrimitive.Item ref={ref} className={cn('border-b', className)} {...props} />;
});
AccordionItem.displayName = 'AccordionItem';

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        'flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180',
        className,
      )}
      {...props}
    >
      {children}
      <ChevronDownIcon className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(
      'overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down',
      className,
    )}
    {...props}
  >
    <div className="pb-4 pt-0">{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

/**
 * Represents an item in the Accordion component.
 */
interface AccordionItem {
  /** The value associated with the Accordion item. */
  value: string;
  /** The title of the Accordion item. */
  title: React.ReactNode;
  /** The content of the Accordion item. */
  content: React.ReactNode;
}
/**
 * Props for the Accordion component.
 */
type AccordionProps = React.ComponentProps<typeof AccordionRoot> & {
  /** The items to render in the Accordion. */
  items: AccordionItem[];
  /**
   * The type of Accordion. Defaults to `single`.
   * @default 'single'
   */
  type: 'single' | 'multiple';
  /**
   * Whether an accordion item can be collapsed after it has been opened.
   * @default false
   */
  collapsible?: boolean;
};

/**
 * Renders an accordion component with the given items.
 */
const Accordion: React.FC<AccordionProps> = ({ items, ...props }) => {
  return (
    <AccordionRoot {...props}>
      {items.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionTrigger>{item.title}</AccordionTrigger>
          <AccordionContent>{item.content}</AccordionContent>
        </AccordionItem>
      ))}
    </AccordionRoot>
  );
};
Accordion.displayName = 'Accordion';

export { Accordion, AccordionContent, AccordionItem, AccordionRoot, AccordionTrigger };
