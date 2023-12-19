import { useRef } from 'react';

import { Button } from '@/components';
import { Small, Stack } from '@/layouts';

import { useFocusOnPointerDown } from './use-focus-on-pointer-down';

export default {
  title: 'Hooks/UI And Dom/useFocusOnPointerDown',
};

export function Usage() {
  const ref = useRef<HTMLButtonElement>(null);
  useFocusOnPointerDown({ enabled: true, ref });

  return (
    <Stack alignItems="start">
      <Button ref={ref}>Click me</Button>
      <Small>When you click the button, the button will get focused. This hook will only work on Safari browser.</Small>
    </Stack>
  );
}
