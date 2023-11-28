import type { FC } from 'react';
import type { ToastT } from '../types';

import { cn } from '@/utils/helper';

import { isValidReactNode } from '../helper';

interface CancelButtonProps {
  dismissible: boolean;
  deleteToast: () => void;
  toast: ToastT;
  className?: string;
}

export const CancelButton: FC<CancelButtonProps> = ({ toast, dismissible, deleteToast, className }) => {
  if (isValidReactNode(toast.cancel)) return toast.cancel;
  const onClick = toast.cancel.onClick;
  return (
    <button
      data-button
      data-cancel
      onClick={() => {
        if (!dismissible) return;
        deleteToast();
        onClick?.();
      }}
      className={cn(className, toast.cancel.className)}
    >
      {toast.cancel.label}
    </button>
  );
};
