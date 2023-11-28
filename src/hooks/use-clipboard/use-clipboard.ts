import { useState } from 'react';

export const useClipboard = ({ timeout = 2000 } = {}) => {
  const [error, setError] = useState<Error | null>(null);
  const [copied, setCopied] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);
  const [copyTimeout, setCopyTimeout] = useState<NodeJS.Timeout>();

  const handleCopyResult = (value: boolean) => {
    clearTimeout(copyTimeout);
    setCopyTimeout(setTimeout(() => setCopied(false), timeout));
    setCopied(value);
    setHasCopied(value);
  };

  const copy = (valueToCopy: string) => {
    if ('clipboard' in navigator) {
      navigator.clipboard
        .writeText(valueToCopy)
        .then(() => handleCopyResult(true))
        .catch((err) => setError(err));
    } else {
      setError(new Error('useClipboard: navigator.clipboard is not supported'));
      setHasCopied(false);
    }
  };

  const reset = () => {
    setCopied(false);
    setError(null);
    clearTimeout(copyTimeout);
    setHasCopied(false);
  };

  const paste = async () => {
    if ('clipboard' in navigator) {
      try {
        const text = await navigator.clipboard.readText();
        return text;
      } catch (err) {
        setError(err as Error);
      }
    } else {
      setError(new Error('useClipboard: navigator.clipboard is not supported'));
    }
  };

  return { copy, reset, error, copied, hasCopied, paste };
};
