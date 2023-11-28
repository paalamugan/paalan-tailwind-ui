import * as React from 'react';

import * as TabsPrimitive from '@radix-ui/react-tabs';

import { cn } from '@/utils/helper';

const TabsRoot = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> & { strip?: boolean }
>(({ className, strip, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      'inline-flex items-center justify-center',
      {
        'h-9 rounded-lg  bg-muted p-1 text-muted-foreground': !strip,
        ' border-b border-gray-300 bg-background text-foreground': strip,
      },
      className,
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> & { strip?: boolean }
>(({ className, strip, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      'inline-flex items-center justify-center whitespace-nowrap px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
      {
        'rounded-md data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow':
          !strip,
        'cursor-pointer py-2 outline-none hover:text-primary data-[state=active]:text-primary data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0]':
          strip,
      },
      className,
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      className,
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export interface TabsProps extends React.ComponentPropsWithoutRef<typeof TabsRoot> {
  /**
   * The active tab
   */
  activeTab: string;
  /**
   * Optional handler for when the tab changes
   */
  onTabChange?: (tab: string) => void;
  /**
   * The tabs to render in the component
   * label: The label for the tab
   * value: The value for the tab
   * content: The content to render for the tab
   * triggerClassName: Optional class name for the tab trigger
   * contentClassName: Optional class name for the tab content
   */
  /**
   * Optional class name for the all tab trigger
   */
  triggerClassName?: string;
  /**
   * Optional class name for the all tab content
   */
  contentClassName?: string;
  tabs: {
    label: string;
    value: string;
    content: React.ReactNode;
    triggerClassName?: string;
    contentClassName?: string;
  }[];
  /**
   * Optional class name for the tab list
   */
  tabListClassName?: string;
  /**
   * Optional flag to strip the default styles from the component
   * @default true
   */
  strip?: boolean;
}

/**
 * A set of layered sections of content—known as tab panels—that are displayed one at a time.
 */
const Tabs = React.forwardRef<React.ElementRef<typeof TabsRoot>, TabsProps>(
  (
    {
      activeTab: tab,
      onTabChange,
      tabs,
      tabListClassName,
      triggerClassName: allTriggerClassName,
      contentClassName: allContentClassName,
      strip = true,
      ...props
    },
    ref,
  ) => {
    const [activeTab, setActiveTab] = React.useState(tab);
    React.useEffect(() => {
      setActiveTab(tab);
    }, [tab]);

    const onTabChangeHandle = (value: string) => {
      setActiveTab(value);
      onTabChange?.(value);
    };

    return (
      <TabsRoot {...props} value={activeTab} onValueChange={onTabChangeHandle} ref={ref}>
        <TabsList className={tabListClassName} strip={strip}>
          {tabs.map(({ label, value, triggerClassName }) => (
            <TabsTrigger value={value} key={value} className={cn(allTriggerClassName, triggerClassName)} strip={strip}>
              {label}
            </TabsTrigger>
          ))}
        </TabsList>

        {tabs.map(({ value, content, contentClassName }) => (
          <TabsContent key={value} value={value} className={cn(allContentClassName, contentClassName)}>
            {content}
          </TabsContent>
        ))}
      </TabsRoot>
    );
  },
);
export { Tabs, TabsContent, TabsList, TabsRoot, TabsTrigger };
