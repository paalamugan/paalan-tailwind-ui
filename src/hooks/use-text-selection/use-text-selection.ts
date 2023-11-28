import { useCallback, useEffect, useState } from 'react';

import { useForceUpdate } from '../use-force-update/use-force-update';

/**
 * A hook that returns the current text selection object, if any.
 * Returns `null` if there is no text selection.
 * @returns The current text selection object, or `null` if there is no text selection.
 */
export const useTextSelection = (): Selection | null => {
  const forceUpdate = useForceUpdate();
  const [selection, setSelection] = useState<Selection | null>(null);

  const handleSelectionChange = useCallback(() => {
    setSelection(document.getSelection());
    forceUpdate();
  }, [forceUpdate]);

  useEffect(() => {
    setSelection(document.getSelection());
    document.addEventListener('selectionchange', handleSelectionChange);
    return () => document.removeEventListener('selectionchange', handleSelectionChange);
  }, [handleSelectionChange]);

  return selection;
};
