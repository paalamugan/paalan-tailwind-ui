import { useState } from 'react';

import { Box, Center, Code, Text } from '@/layouts';

import { useMove } from './use-move';

export default { title: 'Hooks/UI And Dom/useMove' };

export function Usage() {
  const [value, setValue] = useState({ x: 0.2, y: 0.6 });
  const { ref, active } = useMove(setValue);

  return (
    <>
      <Center>
        <Box ref={ref} w="60" h="52" className="bg-blue-100" position="relative">
          <Box
            w="5"
            h="5"
            className={active ? 'bg-teal-700' : 'bg-blue-700'}
            position="absolute"
            style={{
              left: `calc(${value.x * 100}% - 0.5rem)`,
              top: `calc(${value.y * 100}% - 0.5rem)`,
            }}
          />
        </Box>
      </Center>
      <Text className="text-center" mt="5">
        Values <Code>{`{ x: ${Math.round(value.x * 100)}, y: ${Math.round(value.y * 100)} }`}</Code>
      </Text>
    </>
  );
}

export function HorizontalSlider() {
  const [value, setValue] = useState(0.2);
  const { ref } = useMove(({ x }) => setValue(x));

  return (
    <>
      <Center>
        <Box ref={ref} w="80" h="5" className="bg-blue-100" position="relative">
          {/* Filled bar */}
          <Box
            h="5"
            bg="blue"
            style={{
              width: `${value * 100}%`,
            }}
          />
          {/* Thumb */}
          <Box
            position="absolute"
            w="5"
            h="5"
            top="0"
            className="cursor-pointer bg-blue-800"
            style={{
              left: `calc(${value * 100}% - 0.5rem)`,
            }}
          />
        </Box>
      </Center>
      <Text className="text-center" mt="5">
        Values: {Math.round(value * 100)}
      </Text>
    </>
  );
}
