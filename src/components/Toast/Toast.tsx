import React from 'react';

import type { FC } from 'react';
import type { ToastProps } from './types';

import { Box } from '@/layouts';
import { cn } from '@/utils/helper';

import { getAsset, Loader } from './assets';
import { ActionButton } from './components/ActionButton';
import { CancelButton } from './components/CancelButton';
import { GAP, SWIPE_THRESHOLD, TIME_BEFORE_UNMOUNT, TOAST_LIFETIME } from './constant';

export const Toast: FC<ToastProps> = (props) => {
  const {
    invert: ToasterInvert,
    toast,
    interacting,
    setHeights,
    visibleToasts,
    heights,
    index,
    toasts,
    expanded,
    removeToast,
    closeButton,
    style,
    cancelButtonClassName,
    actionButtonClassName,
    className = '',
    descriptionClassName = '',
    duration: durationFromToaster,
    position,
    loadingIcon: loadingIconProp,
    expandByDefault,
  } = props;
  const [mounted, setMounted] = React.useState(false);
  const [removed, setRemoved] = React.useState(false);
  const [swiping, setSwiping] = React.useState(false);
  const [swipeOut, setSwipeOut] = React.useState(false);
  const [offsetBeforeRemove, setOffsetBeforeRemove] = React.useState(0);
  const [initialHeight, setInitialHeight] = React.useState(0);
  const dragStartTime = React.useRef<Date | null>(null);
  const toastRef = React.useRef<HTMLLIElement>(null);
  const isFront = index === 0;
  const isVisible = index + 1 <= visibleToasts;
  const toastType = toast.type;
  const dismissible = toast.dismissible !== false;
  const toastClassname = toast.className || '';
  const toastDescriptionClassname = toast.descriptionClassName || '';

  // Height index is used to calculate the offset as it gets updated before the toast array, which means we can calculate the new layout faster.
  const heightIndex = React.useMemo(
    () => heights.findIndex((height) => height.toastId === toast.id) || 0,
    [heights, toast.id],
  );
  const duration = React.useMemo(
    () => toast.duration || durationFromToaster || TOAST_LIFETIME,
    [toast.duration, durationFromToaster],
  );
  const closeTimerStartTimeRef = React.useRef(0);
  const offset = React.useRef(0);
  const lastCloseTimerStartTimeRef = React.useRef(0);
  const pointerStartRef = React.useRef<{ x: number; y: number } | null>(null);
  const [y, x] = position.split('-');
  const toastsHeightBefore = React.useMemo(() => {
    return heights.reduce((prev, curr, reducerIndex) => {
      // Calculate offset up until current  toast
      if (reducerIndex >= heightIndex) {
        return prev;
      }

      return prev + curr.height;
    }, 0);
  }, [heights, heightIndex]);
  const invert = toast.invert || ToasterInvert;
  const disabled = toastType === 'loading';

  offset.current = React.useMemo(() => heightIndex * GAP + toastsHeightBefore, [heightIndex, toastsHeightBefore]);

  React.useEffect(() => {
    // Trigger enter animation without using CSS animation
    setMounted(true);
  }, []);

  React.useLayoutEffect(() => {
    if (!mounted) return;
    const toastNode = toastRef.current;
    if (!toastNode) return;

    const originalHeight = toastNode.style.height;
    toastNode.style.height = 'auto';
    const newHeight = toastNode.getBoundingClientRect().height;
    toastNode.style.height = originalHeight;

    setInitialHeight(newHeight);

    setHeights((heights) => {
      const alreadyExists = heights.find((height) => height.toastId === toast.id);
      if (!alreadyExists) {
        return [{ toastId: toast.id, height: newHeight }, ...heights];
      } else {
        return heights.map((height) => (height.toastId === toast.id ? { ...height, height: newHeight } : height));
      }
    });
  }, [mounted, toast.title, toast.description, setHeights, toast.id]);

  const deleteToast = React.useCallback(() => {
    // Save the offset for the exit swipe animation
    setRemoved(true);
    setOffsetBeforeRemove(offset.current);
    setHeights((h) => h.filter((height) => height.toastId !== toast.id));

    setTimeout(() => {
      removeToast(toast);
    }, TIME_BEFORE_UNMOUNT);
  }, [toast, removeToast, setHeights, offset]);

  React.useEffect(() => {
    if ((toast.promise && toastType === 'loading') || toast.duration === Infinity) return;
    let timeoutId: NodeJS.Timeout;
    let remainingTime = duration;
    // Pause the timer on each hover
    const pauseTimer = () => {
      if (lastCloseTimerStartTimeRef.current < closeTimerStartTimeRef.current) {
        // Get the elapsed time since the timer started
        const elapsedTime = new Date().getTime() - closeTimerStartTimeRef.current;

        remainingTime = remainingTime - elapsedTime;
      }

      lastCloseTimerStartTimeRef.current = new Date().getTime();
    };

    const startTimer = () => {
      closeTimerStartTimeRef.current = new Date().getTime();

      // Let the toast know it has started
      timeoutId = setTimeout(() => {
        toast.onAutoClose?.(toast);
        deleteToast();
      }, remainingTime);
    };

    if (expanded || interacting) {
      pauseTimer();
    } else {
      startTimer();
    }

    return () => clearTimeout(timeoutId);
  }, [expanded, interacting, expandByDefault, toast, duration, deleteToast, toast.promise, toastType]);

  React.useEffect(() => {
    const toastNode = toastRef.current;

    if (toastNode) {
      const height = toastNode.getBoundingClientRect().height;

      // Add toast height tot heights array after the toast is mounted
      setInitialHeight(height);
      setHeights((h) => [{ toastId: toast.id, height }, ...h]);

      return () => setHeights((h) => h.filter((height) => height.toastId !== toast.id));
    }
  }, [setHeights, toast.id]);

  React.useEffect(() => {
    if (toast.delete) {
      deleteToast();
    }
  }, [deleteToast, toast.delete]);

  function getLoadingIcon() {
    if (loadingIconProp) {
      return (
        <Box className="toast-loader" data-visible={toastType === 'loading'}>
          {loadingIconProp}
        </Box>
      );
    }
    return <Loader visible={toastType === 'loading'} />;
  }

  return (
    <li
      aria-live={toast.important ? 'assertive' : 'polite'}
      aria-atomic="true"
      role="status"
      tabIndex={0}
      ref={toastRef}
      className={cn(className, toastClassname)}
      data-toast-toast=""
      data-styled={!(toast.jsx || toast.unstyled)}
      data-mounted={mounted}
      data-promise={Boolean(toast.promise)}
      data-removed={removed}
      data-visible={isVisible}
      data-y-position={y}
      data-x-position={x}
      data-index={index}
      data-front={isFront}
      data-swiping={swiping}
      data-dismissible={dismissible}
      data-type={toastType}
      data-invert={invert}
      data-swipe-out={swipeOut}
      data-expanded={Boolean(expanded || (expandByDefault && mounted))}
      style={
        {
          '--index': index,
          '--toasts-before': index,
          '--z-index': toasts.length - index,
          '--offset': `${removed ? offsetBeforeRemove : offset.current}px`,
          '--initial-height': expandByDefault ? 'auto' : `${initialHeight}px`,
          ...style,
          ...toast.style,
        } as React.CSSProperties
      }
      onPointerDown={(event) => {
        if (disabled || !dismissible) return;
        dragStartTime.current = new Date();
        setOffsetBeforeRemove(offset.current);
        // Ensure we maintain correct pointer capture even when going outside of the toast (e.g. when swiping)
        (event.target as HTMLElement).setPointerCapture(event.pointerId);
        if ((event.target as HTMLElement).tagName === 'BUTTON') return;
        setSwiping(true);
        pointerStartRef.current = { x: event.clientX, y: event.clientY };
      }}
      onPointerUp={() => {
        if (swipeOut || !dismissible) return;

        pointerStartRef.current = null;
        const swipeAmount = Number(toastRef.current?.style.getPropertyValue('--swipe-amount').replace('px', '') || 0);
        const timeTaken = dragStartTime.current ? new Date().getTime() - dragStartTime.current.getTime() : 0;

        const velocity = Math.abs(swipeAmount) / timeTaken;

        // Remove only if threshold is met
        if (Math.abs(swipeAmount) >= SWIPE_THRESHOLD || velocity > 0.11) {
          setOffsetBeforeRemove(offset.current);
          toast.onDismiss?.(toast);
          deleteToast();
          setSwipeOut(true);
          return;
        }

        toastRef.current?.style.setProperty('--swipe-amount', '0px');
        setSwiping(false);
      }}
      onPointerMove={(event) => {
        if (!pointerStartRef.current || !dismissible) return;

        const yPosition = event.clientY - pointerStartRef.current.y;
        const xPosition = event.clientX - pointerStartRef.current.x;

        const clamp = y === 'top' ? Math.min : Math.max;
        const clampedY = clamp(0, yPosition);
        const swipeStartThreshold = event.pointerType === 'touch' ? 10 : 2;
        const isAllowedToSwipe = Math.abs(clampedY) > swipeStartThreshold;

        if (isAllowedToSwipe) {
          toastRef.current?.style.setProperty('--swipe-amount', `${yPosition}px`);
        } else if (Math.abs(xPosition) > swipeStartThreshold) {
          // User is swiping in wrong direction so we disable swipe gesture
          // for the current pointer down interaction
          pointerStartRef.current = null;
        }
      }}
    >
      {closeButton && dismissible && !toast.jsx && (
        <button
          aria-label="Close toast"
          data-disabled={disabled}
          data-close-button
          onClick={() => {
            if (disabled) return;
            deleteToast();
            toast.onDismiss?.(toast);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      )}
      {toast.jsx || React.isValidElement(toast.title) ? (
        toast.jsx || toast.title
      ) : (
        <>
          {toastType || toast.icon || toast.promise ? (
            <div data-icon="">
              {(toast.promise || toast.type === 'loading') && !toast.icon ? getLoadingIcon() : null}
              {toast.icon || (toastType && getAsset(toastType))}
            </div>
          ) : null}

          <div data-content="">
            <div data-title="">{toast.title}</div>
            {!!toast.description && (
              <div data-description="" className={cn(descriptionClassName, toastDescriptionClassname)}>
                {toast.description}
              </div>
            )}
          </div>
          {(!!toast.cancel || !!toast.action) && (
            <div className="flex items-center space-x-2">
              {toast.cancel && (
                <CancelButton
                  toast={toast}
                  dismissible={dismissible}
                  deleteToast={deleteToast}
                  className={cancelButtonClassName}
                />
              )}
              {toast.action && (
                <ActionButton toast={toast} deleteToast={deleteToast} className={actionButtonClassName} />
              )}
            </div>
          )}
        </>
      )}
    </li>
  );
};
