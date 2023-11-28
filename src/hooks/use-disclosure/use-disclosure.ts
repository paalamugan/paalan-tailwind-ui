import { useCallback, useState } from 'react';

import type React from 'react';

import { useCallbackRef } from '../use-callback-ref';
import { useId } from '../use-id';

/**
 * Props for the useDisclosure hook.
 */
export interface UseDisclosureOptions {
  /**
   * Whether the disclosure is currently open.
   */
  isOpen?: boolean;
  /**
   * Whether the disclosure should be open by default.
   */
  defaultIsOpen?: boolean;
  /**
   * Function to be called when the disclosure is closed.
   */
  onClose?(): void;
  /**
   * Function to be called when the disclosure is opened.
   */
  onOpen?(): void;
  /**
   * The ID of the disclosure.
   */
  id?: string;
}

type HTMLProps = Omit<React.HTMLAttributes<HTMLElement>, 'color'>;

/**
 * A hook that provides state and functions for controlling the open/closed state of a disclosure component.
 *
 * @param options - An optional object of options to configure the hook.
 * @param options.onClose - A function to be called when the disclosure is closed.
 * @param options.onOpen - A function to be called when the disclosure is opened.
 * @param options.isOpen - A boolean indicating whether the disclosure is open or closed.
 * @param options.id - An optional ID to use for the disclosure component.
 * @param options.defaultIsOpen - A boolean indicating whether the disclosure should be open by default.
 *
 * @returns An object containing the current state and functions for controlling the disclosure component.
 */
export const useDisclosure = (options: UseDisclosureOptions = {}) => {
  const { onClose: onCloseProp, onOpen: onOpenProp, isOpen: isOpenProp, id: idProp } = options;

  const handleOpen = useCallbackRef(onOpenProp);
  const handleClose = useCallbackRef(onCloseProp);

  const [isOpenState, setIsOpen] = useState(options.defaultIsOpen || false);

  const isOpen = isOpenProp !== undefined ? isOpenProp : isOpenState;

  const isControlled = isOpenProp !== undefined;

  const uid = useId();
  const id = idProp ?? `disclosure-${uid}`;

  const onClose = useCallback(() => {
    if (!isControlled) {
      setIsOpen(false);
    }
    handleClose?.();
  }, [isControlled, handleClose]);

  const onOpen = useCallback(() => {
    if (!isControlled) {
      setIsOpen(true);
    }
    handleOpen?.();
  }, [isControlled, handleOpen]);

  const onToggle = useCallback(() => {
    if (isOpen) {
      onClose();
    } else {
      onOpen();
    }
  }, [isOpen, onOpen, onClose]);

  function getButtonProps(props: HTMLProps = {}): HTMLProps {
    return {
      ...props,
      'aria-expanded': isOpen,
      'aria-controls': id,
      onClick(event) {
        props.onClick?.(event);
        onToggle();
      },
    };
  }

  function getDisclosureProps(props: HTMLProps = {}): HTMLProps {
    return {
      ...props,
      hidden: !isOpen,
      id,
    };
  }

  return {
    isOpen,
    onOpen,
    onClose,
    onToggle,
    isControlled,
    getButtonProps,
    getDisclosureProps,
  };
};

export type UseDisclosureReturn = ReturnType<typeof useDisclosure>;
