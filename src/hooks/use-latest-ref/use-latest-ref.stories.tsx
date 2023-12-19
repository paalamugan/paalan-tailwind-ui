import { Button } from '@/components/Button';
import { Flex, Heading, Stack } from '@/layouts';

import { useLatestRef } from './use-latest-ref';

export default { title: 'Hooks/State Management/useLatestRef' };

export function Usage() {
  const ref = useLatestRef(0);

  return (
    <Stack gap="4">
      <Heading as="h4">Check the console</Heading>
      <Flex gap="4">
        <Button type="button" onClick={() => (ref.current += 1)}>
          Increment ref
        </Button>
        <Button type="button" variant="outline" onClick={() => console.log(ref.current)}>
          Log ref
        </Button>
      </Flex>
    </Stack>
  );
}
