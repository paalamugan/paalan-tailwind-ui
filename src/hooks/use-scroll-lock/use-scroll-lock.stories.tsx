import { Button } from '@/components/Button';
import { Box, Heading, P, Strong } from '@/layouts';

import { useScrollLock } from './use-scroll-lock';

export default { title: 'hooks/UI And Dom/useScrollLock' };

export function Usage() {
  const [scrollLocked, setScrollLocked] = useScrollLock();

  return (
    <Box>
      <Heading>useScrollLock Hook Example</Heading>
      <P mb="5">
        Scroll is currently <Strong>{scrollLocked ? 'locked' : 'unlocked'}</Strong>
      </P>
      <Button onClick={() => setScrollLocked(!scrollLocked)}>{scrollLocked ? 'Unlock scroll' : 'Lock scroll'}</Button>
    </Box>
  );
}
