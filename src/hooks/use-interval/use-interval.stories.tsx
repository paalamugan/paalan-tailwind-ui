import { useEffect, useState } from 'react';

import { Button } from '@/components';
import { Stack, Text } from '@/layouts';

import { useInterval } from './use-interval';

export default { title: 'hooks/Utilities/useInterval' };

export function Usage() {
  const [seconds, setSeconds] = useState(0);
  const interval = useInterval(() => setSeconds((s) => s + 1), 1000);

  useEffect(() => {
    interval.start();
    return interval.stop;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Stack alignItems="center">
      <Text>
        Page loaded <b>{seconds}</b> seconds ago
      </Text>
      <Button onClick={interval.toggle} color={interval.active ? 'red' : 'teal'} variant="outline">
        {interval.active ? 'Stop' : 'Start'} counting
      </Button>
    </Stack>
  );
}
