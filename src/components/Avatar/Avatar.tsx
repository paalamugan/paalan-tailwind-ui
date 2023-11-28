import * as React from 'react';

import * as AvatarPrimitive from '@radix-ui/react-avatar';

import { cn } from '@/utils/helper';

const AvatarRoot = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn('relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full', className)}
    {...props}
  />
));
AvatarRoot.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image ref={ref} className={cn('aspect-square h-full w-full', className)} {...props} />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn('flex h-full w-full items-center justify-center rounded-full bg-muted', className)}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

interface AvatarProps extends Omit<React.ComponentPropsWithoutRef<typeof AvatarRoot>, 'children'> {
  /**
   * The image source to use for the avatar.
   */
  src?: string;
  /**
   * The fallback content to use when the `src` is not available.
   */
  fallback?: React.ReactNode;
}
const Avatar = React.forwardRef<React.ElementRef<typeof AvatarRoot>, AvatarProps>(
  ({ src, fallback, ...props }, ref) => (
    <AvatarRoot ref={ref} {...props}>
      <AvatarImage src={src} />
      {fallback && <AvatarFallback>{fallback}</AvatarFallback>}
    </AvatarRoot>
  ),
);
Avatar.displayName = 'Avatar';

export { Avatar, AvatarFallback, AvatarImage, AvatarRoot };
