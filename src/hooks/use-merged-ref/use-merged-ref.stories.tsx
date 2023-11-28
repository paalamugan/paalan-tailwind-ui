import { useRef } from 'react';

import { Box } from '@/layouts';

import { useClickOutside } from '../use-click-outside';
import { useFocusTrap } from '../use-focus-trap';
import { mergeRefs, useMergedRef } from '../use-merged-ref';

export default { title: 'hooks/Utilities/useMergedRef' };

export function Usage() {
  const myRef = useRef(null);
  const clickOutsideRef = useClickOutside(() => {});
  const focusTrapRef = useFocusTrap();
  const mergedRef = useMergedRef(myRef, clickOutsideRef, focusTrapRef);

  return <Box ref={mergedRef} />;
}

export function MergeRefsFunction() {
  const myRef = useRef(null);
  const useClickOutsideRef = useClickOutside(() => {});
  const mergedRef = mergeRefs(myRef, useClickOutsideRef);
  return <Box ref={mergedRef} />;
}
