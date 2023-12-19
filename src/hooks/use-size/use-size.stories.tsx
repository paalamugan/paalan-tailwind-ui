import { useRef } from 'react';

import { Box } from '@/layouts';
import { H2, P } from '@/layouts/Typography';

import { useSize } from './use-size';

export default { title: 'Hooks/UI And Dom/useSize' };

export function Usage() {
  const ref = useRef<HTMLDivElement>(null);
  const size = useSize(ref);
  return (
    <Box>
      <H2>Measured Size: {JSON.stringify(size, null, 4)}</H2>
      <P className="border border-dashed bg-pink-200 p-2" ref={ref}>
        In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form
        of a document or a typeface without relying on meaningful content
      </P>
    </Box>
  );
}
