import React from 'react';

import { Heading, Stack } from '@/layouts';

import { useLatestValue } from '.';

export default { title: 'Hooks/State Management/useLatestValue' };

export function Usage() {
  const [count, setCount] = React.useState(0);
  const value = useLatestValue(count);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCount((c) => ++c);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Stack gap="4">
      <Heading as="h4">Count value: {count}</Heading>
      <Heading as="h4">Latest value: {value}</Heading>
    </Stack>
  );
}
