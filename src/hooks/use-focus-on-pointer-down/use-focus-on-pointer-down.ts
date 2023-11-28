import { useEventListener } from '../use-event-listener';
import { isRefObject, isSafari } from './helper';

/**
 * Props for the `useFocusOnPointerDown` hook.
 */
export interface UseFocusOnMouseDownOptions {
  /**
   * Whether the hook is enabled or not.
   */
  enabled?: boolean;
  /**
   * Ref to the element that should be focused on pointer down.
   */
  ref: React.RefObject<HTMLElement>;
  /**
   * An array of elements or refs to check if the pointer down event occurred on them.
   */
  elements?: Array<React.RefObject<HTMLElement> | HTMLElement | null>;
}

/**
 *  Polyfill to get `relatedTarget` working correctly consistently
 * across all browsers.
 *
 * It ensures that elements receives focus on pointer down if
 * it's not the active element.
 *
 * A hook that focuses on an element when a pointer down event occurs on it.
 * @param options - The options object.
 * @param options.ref - The ref object of the element to focus on.
 * @param options.elements - An array of elements or refs to check if the pointer down event occurred on them.
 * @param options.enabled - Whether the hook is enabled or not.
 */
export const useFocusOnPointerDown = (options: UseFocusOnMouseDownOptions) => {
  const { ref, elements, enabled = false } = options;

  const doc = () => ref.current?.ownerDocument ?? document;

  useEventListener(
    'pointerdown',
    (event) => {
      if (!isSafari() || !enabled) return;
      const target = event.target as HTMLElement;

      const els = elements ?? [ref];
      const isValidTarget = els.some((elementOrRef) => {
        const el = isRefObject(elementOrRef) ? elementOrRef.current : elementOrRef;
        return el?.contains(target) || el === target;
      });

      if (doc().activeElement !== target && isValidTarget) {
        event.preventDefault();
        target.focus();
      }
    },
    undefined,
    doc,
  );
};
