import { Textarea } from '@/components/Textarea';
import { Center, Code, Text } from '@/layouts';

import { useResizeObserver } from './use-resize-observer';

export default { title: 'hooks/UI And Dom/useResizeObserver' };

export function Usage() {
  const [ref, rect] = useResizeObserver<HTMLTextAreaElement>();

  return (
    <Center gap="2" flexDir="column">
      <Text mb="3">Resize the textarea to see the rect changes</Text>
      <Textarea ref={ref} w="80" h="36" parentClassName="items-center" className="resize bg-blue-100" />
      <Text className="text-center" mt="3">
        Rect: <Code>{JSON.stringify(rect, null, 2)}</Code>
      </Text>
    </Center>
  );
}
