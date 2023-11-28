import { forwardRef, useRef, useState } from 'react';

import type React from 'react';

import { createPortal } from 'react-dom';

import { useIsomorphicEffect } from '@/hooks/use-isomorphic-effect';
import { assignRef } from '@/utils/assign-ref';

const createPortalNode = (props: React.ComponentPropsWithoutRef<'div'>) => {
  const node = document.createElement('div');
  node.setAttribute('data-portal', 'true');
  if (typeof props.className === 'string') {
    node.classList.add(...props.className.split(' '));
  }

  if (typeof props.style === 'object') {
    Object.assign(node.style, props.style);
  }

  if (typeof props.id === 'string') {
    node.setAttribute('id', props.id);
  }

  return node;
};

export interface PortalProps extends React.ComponentPropsWithoutRef<'div'> {
  /** Portal children, for example, custom modal or popover */
  children: React.ReactNode;

  /** Element inside which portal should be created, by default a new div element is created and appended to the `document.body` */
  target?: HTMLElement | string;
}

const defaultProps: Partial<PortalProps> = {};

export const Portal = forwardRef<HTMLDivElement, PortalProps>((props, ref) => {
  const { children, target, ...others } = { ...defaultProps, ...props };

  const [mounted, setMounted] = useState(false);
  const nodeRef = useRef<HTMLElement | null>(null);

  useIsomorphicEffect(() => {
    setMounted(true);
    nodeRef.current = !target
      ? createPortalNode(others)
      : typeof target === 'string'
        ? document.querySelector(target)
        : target;

    if (!nodeRef.current) return;
    assignRef(ref, nodeRef.current as HTMLDivElement);

    if (!target && nodeRef.current) {
      document.body.appendChild(nodeRef.current);
    }

    return () => {
      if (!target && nodeRef.current) {
        document.body.removeChild(nodeRef.current);
      }
    };
  }, [target]);

  if (!mounted || !nodeRef.current) {
    return null;
  }

  return createPortal(<>{children}</>, nodeRef.current);
});

Portal.displayName = 'Portal';
