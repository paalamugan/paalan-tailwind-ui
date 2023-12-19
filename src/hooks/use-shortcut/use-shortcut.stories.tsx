import { useState } from 'react';

import { Box, Heading, Stack, Strong, Text } from '@/layouts';

import { useShortcut } from './use-shortcut';

export default { title: 'Hooks/Utilities/useShortcut' };

export function Usage() {
  const onKeyDown = useShortcut({ timeout: 300, preventDefault: () => true });
  const [pressedKey, setPressedKey] = useState('');

  const handleShortcut = (keysSoFar: string) => {
    console.log('Shortcut pressed:', keysSoFar);
    setPressedKey(keysSoFar);
  };

  return (
    <Stack>
      <Heading>Press a key to trigger the shortcut</Heading>
      <Box onKeyDown={onKeyDown(handleShortcut)} tabIndex={0}>
        Click here to focus and press a key
      </Box>
      <Text>
        Pressed key: <Strong>{pressedKey}</Strong>
      </Text>
    </Stack>
  );
}
