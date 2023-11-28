import { Input } from '@/components';
import { Stack, Text } from '@/layouts';

import { useUpdateEffect } from '.';
import { useInputState } from '../use-input-state';

export default { title: 'hooks/Life Cycle/useUpdateEffect' };

export function Usage() {
  const [value, setValue] = useInputState('John');

  useUpdateEffect(() => {
    console.log('Value updated:', value);
  }, [value]);

  return (
    <Stack>
      <Input value={value} onChange={setValue} placeholder="Enter a text" />
      <Text>Check the console.</Text>
    </Stack>
  );
}
