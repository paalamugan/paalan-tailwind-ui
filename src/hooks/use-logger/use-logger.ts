/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from 'react';

import type { DependencyList } from 'react';

import { useUpdateEffect } from '../use-update-effect';

/**
 * A custom hook that logs component lifecycle events and props changes.
 * @param componentName - The name of the component to log.
 * @param props - The props to log.
 * @returns void
 */
export const useLogger = (componentName: string, props: DependencyList = []) => {
  const propsRef = useRef(props);

  useEffect(() => {
    propsRef.current = props;
  }, props);

  useEffect(() => {
    console.log(`${componentName} mounted`, ...propsRef.current);
    return () => console.log(`${componentName} unmounted`);
  }, [componentName]);

  useUpdateEffect(() => {
    console.log(`${componentName} updated`, ...props);
  }, props);
};
