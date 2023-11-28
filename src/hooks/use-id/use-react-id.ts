import React from 'react';

const useId: () => string | undefined = React.useId || (() => undefined);

export const useReactId = (prefix = '') => {
  const id = useId();
  return id ? `${prefix ? `${prefix}-` : ''}${id.replace(/:/g, '')}` : '';
};
