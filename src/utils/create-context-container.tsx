/* eslint-disable @typescript-eslint/no-explicit-any */
import { forwardRef } from 'react';

import type React from 'react';

export const createContextContainer = <T,>(
  Component: React.FC<T>,
  Provider: React.FC<React.PropsWithChildren>,
  providerProps?: Record<string, unknown>,
) => {
  const Container = forwardRef<unknown, T>((props, ref) => (
    <Provider {...providerProps}>
      <Component {...props} ref={ref} />
    </Provider>
  ));

  Container.displayName = Component.displayName;
  (Container as any).extend = (Component as any).extend;
  (Container as any).classes = (Component as any).classes;
  return Container;
};
