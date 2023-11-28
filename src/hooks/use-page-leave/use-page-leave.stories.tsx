import { useState } from 'react';

import { Text } from '@/layouts';

import { usePageLeave } from './use-page-leave';

export default { title: 'hooks/Utilities/usePageLeave' };

export function Usage() {
  const [leftsCount, setLeftsCount] = useState(0);
  usePageLeave(() => setLeftsCount((p) => p + 1));
  return <Text>Mouse left the page {leftsCount} times</Text>;
}
