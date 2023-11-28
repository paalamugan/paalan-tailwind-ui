import type { UseSubscriptionOptions } from './use-subscription';

import { Observable } from 'zen-observable-ts';

import { Text } from '@/layouts';

import { useSubscription } from './use-subscription';

export default { title: 'hooks/Utilities/useSubscription' };

export function Usage() {
  const options: UseSubscriptionOptions = {
    onInitialize: () => {
      // Return an array of observables to subscribe to
      return [
        new Observable((subscriber) => {
          setTimeout(() => {
            subscriber.next('Hello');
            subscriber.complete();
          }, 1000);
        }),
        new Observable((subscriber) => {
          setTimeout(() => {
            subscriber.next('World');
            subscriber.complete();
          }, 2000);
        }),
      ];
    },
    onSuccess: (result) => {
      console.log('Success:', result);
    },
    onError: (error) => {
      console.error('Error:', error);
    },
    isUnSubscribedAfterResponse: true,
  };

  // Use the useSubscription hook
  useSubscription(options, []);

  return <Text>Check the console for the output.</Text>;
}
