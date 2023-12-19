import { Button } from '@/components';
import { HStack, Text } from '@/layouts';
import { randomId } from '@/utils';

import { useForceUpdate } from './use-force-update';

export default { title: 'Hooks/Life Cycle/useForceUpdate' };

export function Usage() {
  const forceUpdate = useForceUpdate();

  return (
    <HStack justifyContent="center">
      <Text>{randomId()}</Text>
      <Button onClick={forceUpdate}>Force update</Button>
    </HStack>
  );
}
