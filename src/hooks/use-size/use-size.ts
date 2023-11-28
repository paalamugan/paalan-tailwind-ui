import { useState } from 'react';

import type { ElementSize } from '@zag-js/element-size';

import { trackElementSize } from '@zag-js/element-size';

import { useIsomorphicEffect } from '../use-isomorphic-effect';

const trackMutation = (el: HTMLElement | null, cb: () => void) => {
  if (!el || !el.parentElement) return;
  const win = el.ownerDocument?.defaultView ?? window;
  const observer = new win.MutationObserver(() => {
    cb();
  });
  observer.observe(el.parentElement, { childList: true });
  return () => {
    observer.disconnect();
  };
};

/**
 * A hook that observes the size of a list of HTML elements and returns an array of their sizes.
 * @template T - The type of the HTML element to observe.
 * @param {Object} options - The options object.
 * @param {Function} options.getNodes - A function that returns an array of HTML elements to observe.
 * @param {boolean} [options.observeMutation=true] - A boolean indicating whether to observe mutations on the first element in the array.
 * @returns {Array<ElementSize | undefined>} An array of the observed sizes.
 */
export const useSizes = <T extends HTMLElement | null>({
  getNodes,
  observeMutation = true,
}: {
  getNodes: () => T[];
  observeMutation?: boolean;
}) => {
  const [sizes, setSizes] = useState<ElementSize[]>([]);
  const [count, setCount] = useState(0);

  useIsomorphicEffect(() => {
    const elements = getNodes();

    const cleanups = elements.map((element, index) =>
      trackElementSize(element, (size) => {
        setSizes((sizes) => {
          return [...sizes.slice(0, index), size, ...sizes.slice(index + 1)] as ElementSize[];
        });
      }),
    );

    if (observeMutation) {
      const firstNode = elements[0];
      cleanups.push(
        trackMutation(firstNode, () => {
          setCount((count) => count + 1);
        }),
      );
    }

    return () => {
      cleanups.forEach((cleanup) => {
        cleanup?.();
      });
    };
  }, [count]);

  return sizes as Array<ElementSize | undefined>;
};

const isRef = <T>(ref: unknown): ref is React.RefObject<T> => {
  return typeof ref === 'object' && ref !== null && 'current' in ref;
};

/**
 * A hook that returns the size of a given HTML element or React ref object.
 * @template T - The type of the HTML element or React ref object.
 * @param {T | React.RefObject<T>} ref - The HTML element or React ref object to observe for size changes.
 * @returns {ElementSize | undefined} - The size of the observed element or undefined if it cannot be determined.
 */
export const useSize = <T extends HTMLElement | null>(ref: T | React.RefObject<T>) => {
  const [size] = useSizes({
    observeMutation: false,
    getNodes() {
      const node = isRef(ref) ? ref.current : ref;
      return [node];
    },
  });
  return size as ElementSize | undefined;
};
