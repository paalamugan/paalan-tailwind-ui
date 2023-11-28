import type React from 'react';

export type ToastTypes = 'normal' | 'action' | 'success' | 'error' | 'warning' | 'info' | 'default' | 'loading';

export type PromiseT<Data = unknown> = Promise<Data> | (() => Promise<Data>);

export type PromiseData<ToastData> = ExternalToast & {
  loading?: string | React.ReactNode;
  success?: string | React.ReactNode | ((data: ToastData) => React.ReactNode | string);
  error?: string | React.ReactNode | ((error: unknown) => React.ReactNode | string);
  finally?: () => void | Promise<void>;
};

/**
 * Represents the properties of a toast notification.
 */
export interface ToastT {
  /**
   * The id of the toast.
   */
  id: number | string;
  /**
   * The title of the toast.
   */
  title?: string | React.ReactNode;
  /**
   * The type of the toast.
   */
  type?: ToastTypes;
  /**
   * The icon of the toast.
   */
  icon?: React.ReactNode;
  /**
   * The JSX content of the toast.
   */
  jsx?: React.ReactNode;
  /**
   * Whether to invert the toast colors.
   */
  invert?: boolean;
  /**
   * Whether the toast is dismissible.
   */
  dismissible?: boolean;
  /**
   * The description of the toast.
   */
  description?: React.ReactNode;
  /**
   * The duration of the toast in milliseconds.
   */
  duration?: number;
  /**
   * Whether to show a delete button for the toast.
   */
  delete?: boolean;
  /**
   * Whether the toast is important.
   */
  important?: boolean;
  /**
   * The action button of the toast.
   */
  action?: {
    label: string;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    className?: string;
  };
  /**
   * The cancel button of the toast.
   */
  cancel?: {
    label: string;
    onClick?: () => void;
    className?: string;
  };
  /**
   * The callback function to be called when the toast is dismissed.
   */
  onDismiss?: (toast: ToastT) => void;
  /**
   * The callback function to be called when the toast is auto-closed.
   */
  onAutoClose?: (toast: ToastT) => void;
  /**
   * The promise associated with the toast.
   */
  promise?: PromiseT;
  /**
   * The class name for the cancel button.
   */
  cancelButtonClassName?: string;
  /**
   * The class name for the action button.
   */
  actionButtonClassName?: string;
  /**
   * The style of the toast.
   */
  style?: React.CSSProperties;
  /**
   * Whether to apply no styles to the toast.
   */
  unstyled?: boolean;
  /**
   * The class name for the toast.
   */
  className?: string;
  /**
   * The class name for the description of the toast.
   */
  descriptionClassName?: string;
  /**
   * The position of the toast. Can be 'top-left', 'top-right', 'bottom-left', 'bottom-right', 'top-center', or 'bottom-center'.
   */
  position?: Position;
}

export type Position = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center';
export interface HeightT {
  height: number;
  toastId: number | string;
}

/**
 * Options for configuring a Toast component.
 */
interface ToastOptions {
  /**
   * className for the toast.
   */
  className?: string;
  /**
   * className for the toast description.
   */
  descriptionClassName?: string;
  /**
   * Style object for the toast.
   */
  style?: React.CSSProperties;
  /**
   * className for the cancel button.
   */
  cancelButtonClassName?: string;
  /**
   * className for the action button.
   */
  actionButtonClassName?: string;
  /**
   * Duration in milliseconds for which the toast should be displayed.
   */
  duration?: number;
  /**
   * Whether to apply default styles to the toast.
   */
  unstyled?: boolean;
}

/**
 * Props for the Toaster component.
 */
export interface ToasterProps {
  /**
   * Whether to invert the theme.
   */
  invert?: boolean;
  /**
   * The theme to use. Can be 'light', 'dark', or 'system'.
   */
  theme?: 'light' | 'dark' | 'system';
  /**
   * The position of the toaster on the screen.
   */
  position?: Position;
  /**
   * The hotkey to trigger the toaster.
   */
  hotkey?: string[];
  /**
   * Whether to use rich colors.
   */
  richColors?: boolean;
  /**
   * Whether to expand the toaster to full width.
   */
  expand?: boolean;
  /**
   * The duration of each toast in milliseconds.
   */
  duration?: number;
  /**
   * The gap between toasts in pixels.
   */
  gap?: number;
  /**
   * The maximum number of visible toasts.
   */
  visibleToasts?: number;
  /**
   * Whether to show a close button on each toast.
   */
  closeButton?: boolean;
  /**
   * Additional options for each toast.
   * @summary See {@link ToastOptions}.
   */
  toastOptions?: ToastOptions;
  /**
   * The class name for the toaster.
   */
  className?: string;
  /**
   * The style object for the toaster.
   */
  style?: React.CSSProperties;
  /**
   * The offset of the toaster from the edge of the screen.
   */
  offset?: string | number;
  /**
   * The direction of the toaster.
   */
  dir?: 'rtl' | 'ltr' | 'auto';
  /**
   * The loading icon to show while the toaster is loading.
   */
  loadingIcon?: React.ReactNode;
}

export enum SwipeStateTypes {
  SwipedOut = 'SwipedOut',
  SwipedBack = 'SwipedBack',
  NotSwiped = 'NotSwiped',
}

export type ToastTheme = 'light' | 'dark';

export interface ToastToDismiss {
  id: number | string;
  dismiss: boolean;
}

export type ExternalToast = Omit<ToastT, 'id' | 'type' | 'title' | 'jsx' | 'delete' | 'promise'> & {
  id?: number | string;
};

export interface ToastProps {
  toast: ToastT;
  toasts: ToastT[];
  index: number;
  expanded: boolean;
  invert: boolean;
  heights: HeightT[];
  setHeights: React.Dispatch<React.SetStateAction<HeightT[]>>;
  removeToast: (toast: ToastT) => void;
  gap?: number;
  position: Position;
  visibleToasts: number;
  expandByDefault: boolean;
  closeButton: boolean;
  interacting: boolean;
  style?: React.CSSProperties;
  cancelButtonClassName?: string;
  actionButtonClassName?: string;
  duration?: number;
  className?: string;
  unstyled?: boolean;
  descriptionClassName?: string;
  loadingIcon?: React.ReactNode;
}
