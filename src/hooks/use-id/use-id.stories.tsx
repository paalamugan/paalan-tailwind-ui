import { LabelInput } from '@/components';
import { Heading, Stack, VStack } from '@/layouts';

import { useId } from './use-id';

export default { title: 'Hooks/State Management/useId' };

export function Usage() {
  function Input({ id }: { id?: string }) {
    const uuid = useId(id);

    return <LabelInput id={uuid} label="Input label" type="text" />;
  }

  // input and label will have id 'my-id'
  const withId = <Input id="my-id" />;

  // input and label will have random id 'random-fZMoF'
  const withoutId = <Input />;
  return (
    <Stack gap="4">
      <VStack>
        <Heading as="h4">Input and label will have id 'my-id'</Heading>
        {withId}
      </VStack>
      <VStack>
        <Heading as="h4">Input and label will have random id 'random-fZMoF'</Heading>
        {withoutId}
      </VStack>
    </Stack>
  );
}
