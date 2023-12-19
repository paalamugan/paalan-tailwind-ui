import { useState } from 'react';

import { Button } from '@/components';
import { Center, Text } from '@/layouts';
import { randomId } from '@/utils';

import { useTimeout } from './use-timeout';

export default { title: 'Hooks/Utilities/useTimeout' };

export function Usage() {
  const [value, setValue] = useState('');
  const { start, clear } = useTimeout(() => setValue(randomId()), 1000);

  return (
    <Center gap="3">
      <Button onClick={start}>Start</Button>
      <Button onClick={clear} color="red">
        Clear
      </Button>
      <Text>Random value: {value}</Text>
    </Center>
  );
}
