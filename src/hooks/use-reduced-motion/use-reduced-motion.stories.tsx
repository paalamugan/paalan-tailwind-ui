import { Badge } from '@/components/Badge';

import { useReducedMotion } from './use-reduced-motion';

export default { title: 'hooks/UI And Dom/useReducedMotion' };

export function Usage() {
  const reduceMotion = useReducedMotion();

  return (
    <Badge bg={reduceMotion ? 'red' : 'teal'} style={{ transitionDuration: reduceMotion ? '0ms' : '200ms' }}>
      {reduceMotion ? 'You prefer to reduce motion' : 'You prefer not to reduce motion'}
    </Badge>
  );
}
