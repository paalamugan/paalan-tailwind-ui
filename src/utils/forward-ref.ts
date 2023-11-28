import { forwardRef as forwardReactRef } from 'react';

import type { As, ComponentWithAs, PropsOf, RightJoinProps } from '@/types/tailwind-styled-component';

export const forwardRef = <Props extends object, Component extends As>(
  component: React.ForwardRefRenderFunction<
    React.ElementRef<Component>,
    RightJoinProps<PropsOf<Component>, Props> & {
      as?: As;
    }
  >,
) => {
  return forwardReactRef(component) as unknown as ComponentWithAs<Component, Props>;
};
