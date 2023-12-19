import { Button } from '@/components';
import { Heading, Stack } from '@/layouts';

import { useSetState } from '.';

export default { title: 'Hooks/State Management/useSetState' };

export function Usage() {
  const [state, setState] = useSetState({ name: 'John', age: 35, job: 'Engineer' });

  return (
    <Stack>
      <Heading>State</Heading>
      <pre>{JSON.stringify(state, null, 2)}</pre>
      <Button variant="outline" onClick={() => setState({ age: 36 })}>
        Set age to 36
      </Button>
      <Button variant="outline" onClick={() => setState({ age: 37, job: 'Developer' })}>
        Set age to 37 and job to Developer
      </Button>
      <Button variant="outline" onClick={() => setState({ job: 'Developer3' })}>
        Set job to Developer3
      </Button>
      <Button variant="outline" onClick={() => setState({ job: 'Developer1', age: 38 })}>
        Set job to Developer and age to 38
      </Button>
      <Button variant="outline" onClick={() => setState({ name: 'John', age: 35, job: 'Engineer' })}>
        Reset
      </Button>
    </Stack>
  );
}
