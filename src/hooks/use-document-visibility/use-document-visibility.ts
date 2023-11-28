import { useEffect, useState } from 'react';

export const useDocumentVisibility = (): DocumentVisibilityState => {
  const [documentVisibility, setDocumentVisibility] = useState<DocumentVisibilityState>('visible');

  useEffect(() => {
    const listener = () => setDocumentVisibility(document.visibilityState);
    document.addEventListener('visibilitychange', listener);
    return () => document.removeEventListener('visibilitychange', listener);
  }, []);

  return documentVisibility;
};
