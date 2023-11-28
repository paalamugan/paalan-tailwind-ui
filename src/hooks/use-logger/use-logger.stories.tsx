import { useMemo, useState } from 'react';

import { Button } from '@/components/Button';
import { Stack, Text } from '@/layouts';

import { useLogger } from './use-logger';

export default { title: 'hooks/Life Cycle/useLogger' };

export function Usage() {
  const [count, setCount] = useState(0);
  useLogger(
    'Usage',
    useMemo(() => [{ count, hello: 'world' }], [count]),
  );
  return (
    <Stack alignItems="start">
      <Button onClick={() => setCount((c) => c + 1)}>Update state ({count})</Button>
      <Text>Check the console</Text>
    </Stack>
  );
}
