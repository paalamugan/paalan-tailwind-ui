import { Text } from '@/layouts';

import { useIsomorphicEffect } from './use-isomorphic-effect';

export default { title: 'hooks/Life Cycle/useIsomorphicEffect' };

export function Usage() {
  useIsomorphicEffect(() => {
    document.title = 'title';
  }, []);

  return <Text>Check the title of the page</Text>;
}
