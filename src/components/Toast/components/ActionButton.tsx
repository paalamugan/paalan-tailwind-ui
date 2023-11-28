import type { FC } from 'react';
import type { ToastT } from '../types';

import { cn } from '@/utils/helper';

import { isValidReactNode } from '../helper';

interface ActionButtonProps {
  deleteToast: () => void;
  toast: ToastT;
  className?: string;
}
export const ActionButton: FC<ActionButtonProps> = ({ toast, deleteToast, className }) => {
  if (isValidReactNode(toast.action)) return toast.action;
  const onClick = toast.action.onClick;
  return (
    <button
      data-button
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented) return;
        deleteToast();
      }}
      className={cn(className, toast.action.className)}
    >
      {toast.action.label}
    </button>
  );
};
