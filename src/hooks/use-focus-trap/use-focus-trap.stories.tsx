import { Input, Label } from '@/components';
import { Box, Heading, Stack, VStack } from '@/layouts';

import { useFocusTrap } from './use-focus-trap';

export default {
  title: 'Hooks/UI And Dom/useFocusTrap',
};

export function UsageWithFocusTrapEnabled() {
  const focusTrapRef = useFocusTrap(); // default is true

  return (
    <Box ref={focusTrapRef}>
      <Heading as="h2" mb="4">
        Input Element will get focus when component mount
      </Heading>
      <VStack>
        <Label>First input</Label>
        <Input />
      </VStack>
    </Box>
  );
}

export function UsageWithFocusTrapDisabled() {
  const focusTrapRef = useFocusTrap(false);

  return (
    <Box ref={focusTrapRef}>
      <Heading as="h2" mb="4">
        Input Element will not get focus when component mount
      </Heading>
      <VStack>
        <Label>First input</Label>
        <Input />
      </VStack>
    </Box>
  );
}

export function UsageWithInitialFocus() {
  const focusTrapRef = useFocusTrap();

  return (
    <Stack ref={focusTrapRef} gap="4">
      <Heading as="h2" mb="4">
        Second input will have initial focus when component mount
      </Heading>
      <VStack>
        <Label>First input</Label>
        <Input />
      </VStack>
      <VStack>
        <Label>Second input</Label>
        <Input data-autofocus />
      </VStack>
      <VStack>
        <Label>Third input</Label>
        <Input />
      </VStack>
    </Stack>
  );
}
