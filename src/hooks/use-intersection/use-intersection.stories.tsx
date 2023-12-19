import { useRef } from 'react';

import { Box, Text } from '@/layouts';
import { Paper } from '@/layouts/Paper';

import { useIntersection } from './use-intersection';

export default { title: 'Hooks/UI And Dom/useIntersection' };

export function Usage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { ref, entry } = useIntersection({
    root: containerRef.current,
    threshold: 1,
  });

  return (
    <Paper ref={containerRef} h="128" className="overflow-y-scroll">
      <Text p="5">Scroll down to see the intersection status</Text>
      <Box pt="128" pb="5">
        <Paper
          ref={ref}
          p="10"
          className={entry?.isIntersecting ? 'bg-green-500' : 'bg-red-500'}
          style={{
            minWidth: '50%',
          }}
        >
          <Text color={'white'} className="font-bold">
            {entry?.isIntersecting ? 'Fully visible' : 'Obscured'}
          </Text>
        </Paper>
      </Box>
    </Paper>
  );
}
