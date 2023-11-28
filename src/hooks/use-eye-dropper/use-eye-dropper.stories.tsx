import { useState } from 'react';

import { Button } from '@/components';
import { Box, Flex, Stack, Strong } from '@/layouts';

import { useEyeDropper } from './use-eye-dropper';

export default { title: 'hooks/Utilities/useEyeDropper' };

export function Usage() {
  const [color, setColor] = useState('');
  const { open, supported } = useEyeDropper();

  return (
    <Stack p="10" alignItems="start">
      <Flex gap="2">
        <Strong>Supported:</Strong> {supported.toString()} <br />
      </Flex>
      <Flex gap="2">
        <Strong>Color:</Strong> {color || 'No color picked yet'}
      </Flex>
      <Flex gap="2" alignItems="center">
        <Strong>Background:</Strong> <Box w="4" h="4" rounded="sm" style={{ backgroundColor: color }}></Box>
      </Flex>
      <Button type="button" onClick={async () => setColor((await open()).sRGBHex)}>
        Pick color
      </Button>
    </Stack>
  );
}
