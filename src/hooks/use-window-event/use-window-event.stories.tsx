import { useRef } from 'react';

import { Input } from '@/components';
import { Code, P, Stack } from '@/layouts';

import { useWindowEvent } from './use-window-event';

export default { title: 'hooks/UI And Dom/useWindowEvent' };

export function Usage() {
  const inputRef = useRef<HTMLInputElement>(null);

  useWindowEvent('keydown', (event) => {
    if (event.code === 'KeyK' && (event.ctrlKey || event.metaKey)) {
      event.preventDefault();
      inputRef.current?.focus();
    }
  });

  return (
    <Stack>
      <P>
        Press <Code>⌘ + K</Code> on mac or <Code>Ctrl + K</Code> to focus the input below
      </P>
      <Input ref={inputRef} />
    </Stack>
  );
}
