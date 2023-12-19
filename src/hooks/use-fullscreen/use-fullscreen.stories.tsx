import { Button } from '@/components/Button';
import { Box, Stack } from '@/layouts';

import { useFullscreen } from './use-fullscreen';

export default { title: 'Hooks/UI And Dom/useFullscreen' };

export function Usage() {
  const { toggle, fullscreen } = useFullscreen();

  return (
    <Button onClick={toggle} color={fullscreen ? 'red' : 'blue'}>
      {fullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
    </Button>
  );
}

export function CustomTargetElement() {
  const { ref, toggle, fullscreen } = useFullscreen();

  return (
    <Stack alignItems="center">
      <Box
        as="img"
        ref={ref}
        src="https://images.unsplash.com/photo-1545569341-9eb8b30979d9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80"
        alt="From unsplash.com"
        width="52"
      />
      <Button onClick={toggle} color={fullscreen ? 'red' : 'blue'}>
        {fullscreen ? 'Exit Fullscreen' : 'View Image Fullscreen'}
      </Button>
    </Stack>
  );
}
