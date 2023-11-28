import { Box } from '@/layouts';

import { useHover } from './use-hover';

export default { title: 'hooks/UI And Dom/useHover' };

export function Usage() {
  const { hovered, ref } = useHover();
  return (
    <Box ref={ref} className="bg-blue-200" p="3">
      {hovered ? 'I am hovered' : 'Put mouse over me please'}
    </Box>
  );
}
