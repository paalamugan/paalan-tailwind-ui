import { Box, Center, Code, Text } from '@/layouts';

import { useMouse } from './use-mouse';

export default { title: 'hooks/UI And Dom/useMouse' };

export function Usage() {
  const { ref, x, y } = useMouse();

  return (
    <>
      <Center mb="2">
        <Box ref={ref} w="52" h="32" className="bg-blue-100" />
      </Center>
      <Text className="text-center">
        Mouse coordinates <Code>{`{ x: ${x}, y: ${y} }`}</Code>
      </Text>
    </>
  );
}

export const UsageWithoutRef = () => {
  const { x, y } = useMouse();

  return (
    <Text className="text-center">
      Mouse coordinates <Code>{`{ x: ${x}, y: ${y} }`}</Code>
    </Text>
  );
};
