import { LabelInput } from '@/components';
import { Box, Text } from '@/layouts';

import { useValidatedState } from './use-validated-state';

export default { title: 'hooks/State Management/useValidatedState' };

export function Usage() {
  const [{ value, lastValidValue, valid }, setEmail] = useValidatedState('', (val) => /^\S+@\S+$/.test(val), true);

  return (
    <Box maxW="md" mx="auto" style={{ overflowWrap: 'break-word' }}>
      <LabelInput
        value={value}
        onChange={(event) => setEmail(event.currentTarget.value)}
        required
        isInvalid={!valid}
        placeholder="email@example.com"
        label="Your email"
      />

      <Text size="sm" mt="4">
        <Text color="dimmed" as="span">
          Current value:
        </Text>{' '}
        {value || '[empty string]'}
      </Text>

      <Text size="sm">
        <Text color="dimmed" as="span">
          Last valid value:
        </Text>{' '}
        {lastValidValue || '[empty string]'}
      </Text>
    </Box>
  );
}
