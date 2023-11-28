import { useResizeObserver } from '../use-resize-observer';

/**
 * Returns a ref object and the width and height of the observed element.
 * @template T - The type of the observed element. Defaults to HTMLDivElement.
 * @returns An object containing the ref, width, and height of the observed element.
 */
export const useElementSize = <T extends HTMLElement = HTMLDivElement>() => {
  const [ref, { width, height }] = useResizeObserver<T>();
  return { ref, width, height };
};
