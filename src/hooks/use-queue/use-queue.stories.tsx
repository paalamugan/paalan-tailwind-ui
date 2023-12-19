import { Button } from '@/components';
import { Code, Heading, Stack } from '@/layouts';

import { useQueue } from './use-queue';

export default { title: 'Hooks/State Management/useQueue' };

export function Usage() {
  const { state, queue, add, update, cleanQueue } = useQueue({
    initialValues: [1],
    limit: 2,
  });
  return (
    <Stack>
      <Heading>State</Heading>
      <Code as="pre">{JSON.stringify(state, null, 2)}</Code>
      <Heading mt="3">Queue</Heading>
      <Code as="pre" mb="3">
        {JSON.stringify(queue, null, 2)}
      </Code>
      <Button onClick={() => add(1)}>Add 1</Button>
      <Button onClick={() => add(2)}>Add 2</Button>
      <Button onClick={() => add(3)}>Add 3</Button>
      <Button onClick={() => update(() => [4, 5, 6])}>Update to [4, 5, 6]</Button>
      <Button onClick={() => cleanQueue()}>Clean queue</Button>
    </Stack>
  );
}
