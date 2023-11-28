import { useEffect, useRef } from 'react';

import type { DependencyList } from 'react';
import type { Observable } from 'zen-observable-ts';

/**
 * Options for the useSubscription hook.
 */
export interface UseSubscriptionOptions {
  /**
   * A function that returns an array of Observables or a single Observable.
   * These Observables will be subscribed to when the component mounts.
   */
  onInitialize: () => Observable<unknown>[] | Observable<unknown>;

  /**
   * A function that will be called when all the Observables from `onInitialize` have emitted at least once.
   * @param result - An object containing the latest values emitted by each Observable in `onInitialize`, as well as an `index` property indicating the order in which the Observables were passed to `onInitialize`.
   */
  onSuccess?: (result: { data: unknown; index: number }) => Promise<void> | void;

  /**
   * An optional function that will be called if any of the Observables from `onInitialize` emit an error.
   * @param error - An object containing the error that was emitted, as well as an `index` property indicating the order in which the Observable that emitted the error was passed to `onInitialize`.
   */
  onError?: (error: { error: unknown; index: number }) => Promise<void> | void;

  /**
   * If `true`, the Observables from `onInitialize` will be unsubscribed from after `onSuccess` or `onError` is called.
   * Defaults to `false`.
   */
  isUnSubscribedAfterResponse?: boolean;
}

/**
 * Subscribes to one or more observables and executes callbacks on success or error.
 * @param options - An object containing the following properties:
 *   - onInitialize: A function that returns an array of observables to subscribe to.
 *   - onSuccess: A function that is called when an observable emits a value. It receives an object containing the emitted value and the index of the observable in the array.
 *   - onError: A function that is called when an observable emits an error. It receives an object containing the error and the index of the observable in the array.
 *   - isUnSubscribedAfterResponse: A boolean indicating whether to unsubscribe from the observable after a response is received. Defaults to true.
 * @param deps - An array of dependencies to watch for changes. When any of these dependencies change, the hook will re-subscribe to the observables.
 */
export const useSubscription = (options: UseSubscriptionOptions, deps: DependencyList = []) => {
  const { onInitialize, onSuccess, onError, isUnSubscribedAfterResponse = true } = options;
  const onInitializeRef = useRef(onInitialize);
  const onSuccessRef = useRef(onSuccess);
  const onErrorRef = useRef(onError);
  const onSuccessCalledRef = useRef(new Map<Observable<unknown>, boolean>());
  const onErrorCalledRef = useRef(new Map<Observable<unknown>, boolean>());

  useEffect(() => {
    onInitializeRef.current = onInitialize;
  }, [onInitialize]);

  useEffect(() => {
    onSuccessRef.current = onSuccess;
  }, [onSuccess]);

  useEffect(() => {
    onErrorRef.current = onError;
  }, [onError]);

  useEffect(() => {
    const initialize = onInitializeRef.current?.();
    if (!initialize) return;
    const subscriptions = Array.isArray(initialize) ? initialize : [initialize];

    const subs = subscriptions.map((sub) => {
      const subscription = sub.subscribe({
        next: async (result: unknown) => {
          const index = subscriptions.indexOf(sub);
          try {
            if (onSuccessCalledRef.current.get(sub)) return;
            onSuccessCalledRef.current.set(sub, true);
            await onSuccessRef.current?.({
              data: result,
              index,
            });
          } catch (error) {
            onErrorCalledRef.current.set(sub, true);
            onErrorRef.current?.({
              index: subscriptions.indexOf(sub),
              error: error,
            });
          } finally {
            if (isUnSubscribedAfterResponse) {
              subscription.unsubscribe();
            }
          }
        },
        error: (error: unknown) => {
          if (isUnSubscribedAfterResponse) {
            subscription.unsubscribe();
          }
          if (onErrorCalledRef.current.get(sub)) return;
          onErrorCalledRef.current.set(sub, true);
          onErrorRef.current?.({
            index: subscriptions.indexOf(sub),
            error: error,
          });
        },
      });
      return subscription;
    });
    return () => {
      subs.forEach((sub) => {
        if (sub.closed) return;
        sub.unsubscribe();
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};
