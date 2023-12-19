import { useState } from 'react';

import { Heading, Stack, Strong, Text } from '@/layouts';

import { useEventListener } from './use-event-listener';

export default {
  title: 'Hooks/UI And Dom/useEventListener',
};

export function Usage() {
  const [textContent, setTextContent] = useState('');
  const handleClick = (event: MouseEvent) => {
    setTextContent((event.target as HTMLElement)?.textContent || '');
  };

  useEventListener('click', (e: MouseEvent) => handleClick(e));

  return (
    <Stack gap="4">
      <Heading as="h2">Click anywhere in the document to see the text content of the dom</Heading>
      <Text>
        <Strong>Clicked text content will show here:</Strong> {textContent}
      </Text>
    </Stack>
  );
}

export function UsageWithinTheBox() {
  const [textContent, setTextContent] = useState('');
  const handleClick = (event: MouseEvent) => {
    setTextContent((event.target as HTMLElement)?.textContent || '');
  };

  const ref = useEventListener<'click', HTMLDivElement>('click', (e: MouseEvent) => handleClick(e));

  return (
    <>
      <Stack gap="4">
        <Heading as="h2">Click anywhere in the below red border box to see the text content of the dom</Heading>
        <Text>
          <Strong>Clicked text content will show here:</Strong> {textContent}
        </Text>
      </Stack>
      <Stack gap="4" ref={ref} borderColor="red" className="border-2" p="4">
        <Text>Click me 1</Text>
        <Text>Click me 2</Text>
        <Text>Click me 3</Text>
      </Stack>
    </>
  );
}
