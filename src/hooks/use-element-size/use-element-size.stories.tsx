import { Textarea } from '@/components/Textarea';
import { Center, Text } from '@/layouts';

import { useElementSize } from './use-element-size';

export default { title: 'Hooks/UI And Dom/useElementSize' };

export function Usage() {
  const { ref, width, height } = useElementSize<HTMLTextAreaElement>();

  return (
    <Center gap="2">
      <Text mb="3">Resize textarea by dragging its right bottom corner</Text>
      <Textarea ref={ref} w="80" h="36" parentClassName="items-center" className="resize" />
      <Text className="text-center" mt="3">
        {JSON.stringify({ width, height }, null, 2)}
      </Text>
    </Center>
  );
}
