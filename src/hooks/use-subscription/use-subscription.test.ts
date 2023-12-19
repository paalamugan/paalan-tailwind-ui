import { renderHook } from '@testing-library/react';
import { Observable } from 'zen-observable-ts';

import { useSubscription } from './use-subscription';

describe('Hooks/useSubscription', () => {
  it('should call onSuccess when all observables emit at least once', async () => {
    const observable1 = new Observable((observer) => {
      observer.next('observable1');
      observer.complete();
    });
    const observable2 = new Observable((observer) => {
      observer.next('observable2');
      observer.complete();
    });

    const onSuccess = jest.fn();

    renderHook(() =>
      useSubscription({
        onInitialize: () => [observable1, observable2],
        onSuccess,
      }),
    );

    await Promise.resolve();

    expect(onSuccess).toHaveBeenCalledWith({
      data: 'observable1',
      index: 0,
    });

    expect(onSuccess).toHaveBeenCalledWith({
      data: 'observable2',
      index: 1,
    });
  });

  it('should call onError when an observable emits an error', async () => {
    const observable1 = new Observable((observer) => {
      observer.next('observable1');
      observer.complete();
    });
    const observable2 = new Observable((observer) => {
      observer.error(new Error('observable2 error'));
    });

    const onError = jest.fn();

    renderHook(() =>
      useSubscription({
        onInitialize: () => [observable1, observable2],
        onError,
      }),
    );

    await Promise.resolve();

    expect(onError).toHaveBeenCalledWith({
      error: new Error('observable2 error'),
      index: 1,
    });
  });

  it('should unsubscribe from observables after onSuccess is called if isUnSubscribedAfterResponse is true', async () => {
    const observable1 = new Observable((observer) => {
      observer.next('observable1');
      observer.complete();
    });
    const observable2 = new Observable((observer) => {
      observer.next('observable2');
      observer.complete();
    });

    const unsubscribe = jest.fn();
    const subscription1 = {
      unsubscribe,
      closed: false,
    };
    const subscription2 = {
      unsubscribe,
      closed: false,
    };

    jest.spyOn(observable1, 'subscribe').mockImplementation((args: unknown) => {
      (args as { next: (value: string) => void }).next('observable1');
      return subscription1;
    });

    jest.spyOn(observable2, 'subscribe').mockImplementation((args: unknown) => {
      (args as { next: (value: string) => void }).next('observable2');
      return subscription2;
    });

    renderHook(() =>
      useSubscription({
        onInitialize: () => [observable1, observable2],
        onSuccess: () => {},
        isUnSubscribedAfterResponse: true,
      }),
    );

    await Promise.resolve();

    expect(unsubscribe).toHaveBeenCalledTimes(2);
    expect(unsubscribe).toHaveBeenCalledWith();
    expect(unsubscribe).toHaveBeenCalledWith();
  });

  it('should not unsubscribe from observables after onSuccess is called if isUnSubscribedAfterResponse is false', async () => {
    const observable1 = new Observable((observer) => {
      observer.next('observable1');
      observer.complete();
    });
    const observable2 = new Observable((observer) => {
      observer.next('observable2');
      observer.complete();
    });

    const unsubscribe = jest.fn();

    renderHook(() =>
      useSubscription({
        onInitialize: () => [observable1, observable2],
        onSuccess: () => {},
        isUnSubscribedAfterResponse: false,
      }),
    );

    await Promise.resolve();

    expect(unsubscribe).not.toHaveBeenCalled();
  });
});
