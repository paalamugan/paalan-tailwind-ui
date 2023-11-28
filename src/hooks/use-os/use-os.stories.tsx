import { Strong } from '@/layouts';

import { useOs } from './use-os';

export default { title: 'hooks/Utilities/useOs' };

export function Usage() {
  const os = useOs();
  return (
    <>
      Your os is <Strong>{os}</Strong>
    </>
  );
}
