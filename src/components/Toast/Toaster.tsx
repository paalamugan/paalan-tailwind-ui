import React from 'react';

import type { FC } from 'react';
import type { HeightT, Position, ToasterProps, ToastT, ToastToDismiss } from './types';

import { flushSync } from 'react-dom';

import { GAP, TOAST_WIDTH, VIEWPORT_OFFSET, VISIBLE_TOASTS_AMOUNT } from './constant';
import { getDocumentDirection } from './helper';
import { ToastState } from './state';
import { Toast } from './Toast';

export const Toaster: FC<ToasterProps> = (props) => {
  const {
    invert,
    position = 'top-right',
    hotkey = ['altKey', 'KeyT'],
    expand,
    closeButton,
    className,
    offset,
    theme = 'light',
    richColors,
    duration,
    style,
    visibleToasts = VISIBLE_TOASTS_AMOUNT,
    toastOptions,
    dir = getDocumentDirection(),
    gap = GAP,
    loadingIcon,
  } = props;
  const [toasts, setToasts] = React.useState<ToastT[]>([]);
  const possiblePositions = React.useMemo(() => {
    const positions = toasts.filter((toast) => !!toast.position).map((toast) => toast.position) as Position[];
    return Array.from(new Set([position].concat(positions)));
  }, [toasts, position]);
  const [heights, setHeights] = React.useState<HeightT[]>([]);
  const [expanded, setExpanded] = React.useState(false);
  const [interacting, setInteracting] = React.useState(false);
  const [actualTheme, setActualTheme] = React.useState(
    theme !== 'system'
      ? theme
      : typeof window !== 'undefined'
        ? window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light'
        : 'light',
  );

  const listRef = React.useRef<HTMLOListElement>(null);
  const hotkeyLabel = hotkey.join('+').replace(/Key/g, '').replace(/Digit/g, '');
  const lastFocusedElementRef = React.useRef<HTMLElement>();
  const isFocusWithinRef = React.useRef(false);

  const removeToast = React.useCallback(
    (toast: ToastT) => setToasts((toasts) => toasts.filter(({ id }) => id !== toast.id)),
    [],
  );

  React.useEffect(() => {
    return ToastState.subscribe((toast) => {
      if ((toast as ToastToDismiss).dismiss) {
        setToasts((toasts) => toasts.map((t) => (t.id === toast.id ? { ...t, delete: true } : t)));
        return;
      }

      // Prevent batching, temp solution.
      setTimeout(() => {
        flushSync(() => {
          setToasts((toasts) => {
            const indexOfExistingToast = toasts.findIndex((t) => t.id === toast.id);

            // Update the toast if it already exists
            if (indexOfExistingToast !== -1) {
              return [
                ...toasts.slice(0, indexOfExistingToast),
                { ...toasts[indexOfExistingToast], ...toast },
                ...toasts.slice(indexOfExistingToast + 1),
              ];
            }

            return [toast, ...toasts];
          });
        });
      });
    });
  }, []);

  React.useEffect(() => {
    if (theme !== 'system') {
      setActualTheme(theme);
      return;
    }

    if (theme === 'system') {
      // check if current preference is dark
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        // it's currently dark
        setActualTheme('dark');
      } else {
        // it's not dark
        setActualTheme('light');
      }
    }

    if (typeof window === 'undefined') return;

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', ({ matches }) => {
      if (matches) {
        setActualTheme('dark');
      } else {
        setActualTheme('light');
      }
    });
  }, [theme]);

  React.useEffect(() => {
    // Ensure expanded is always false when no toasts are present / only one left
    if (toasts.length <= 1) {
      setExpanded(false);
    }
  }, [toasts]);

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isHotkeyPressed = hotkey.every((key) => {
        return event[key as keyof typeof event] || event.code === key;
      });

      if (isHotkeyPressed) {
        setExpanded(true);
        listRef.current?.focus();
      }

      if (
        event.code === 'Escape' &&
        (document.activeElement === listRef.current || listRef.current?.contains(document.activeElement))
      ) {
        setExpanded(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [hotkey]);

  React.useEffect(() => {
    if (listRef.current) {
      return () => {
        if (lastFocusedElementRef.current) {
          lastFocusedElementRef.current.focus({ preventScroll: true });
          lastFocusedElementRef.current = undefined;
          isFocusWithinRef.current = false;
        }
      };
    }
  }, []);

  if (!toasts.length) return null;

  return (
    // Remove item from normal navigation flow, only available via hotkey
    <section aria-label={`Notifications ${hotkeyLabel}`} tabIndex={-1}>
      {possiblePositions.map((position, index) => {
        const [y, x] = position.split('-');
        return (
          <ol
            key={position}
            dir={dir === 'auto' ? getDocumentDirection() : dir}
            tabIndex={-1}
            ref={listRef}
            className={className}
            data-toast-toaster
            data-theme={actualTheme}
            data-rich-colors={richColors}
            data-y-position={y}
            data-x-position={x}
            style={
              {
                '--front-toast-height': `${heights[0]?.height}px`,
                '--offset': typeof offset === 'number' ? `${offset}px` : offset || VIEWPORT_OFFSET,
                '--width': `${TOAST_WIDTH}px`,
                '--gap': `${gap}px`,
                ...style,
              } as React.CSSProperties
            }
            onBlur={(event) => {
              if (isFocusWithinRef.current && !event.currentTarget.contains(event.relatedTarget)) {
                isFocusWithinRef.current = false;
                if (lastFocusedElementRef.current) {
                  lastFocusedElementRef.current.focus({ preventScroll: true });
                  lastFocusedElementRef.current = undefined;
                }
              }
            }}
            onFocus={(event) => {
              const isNotDismissible =
                event.target instanceof HTMLElement && event.target.dataset.dismissible === 'false';

              if (isNotDismissible) return;

              if (!isFocusWithinRef.current) {
                isFocusWithinRef.current = true;
                lastFocusedElementRef.current = event.relatedTarget as HTMLElement;
              }
            }}
            onMouseEnter={() => setExpanded(true)}
            onMouseMove={() => setExpanded(true)}
            onMouseLeave={() => {
              // Avoid setting expanded to false when interacting with a toast, e.g. swiping
              if (!interacting) {
                setExpanded(false);
              }
            }}
            onPointerDown={(event) => {
              const isNotDismissible =
                event.target instanceof HTMLElement && event.target.dataset.dismissible === 'false';

              if (isNotDismissible) return;
              setInteracting(true);
            }}
            onPointerUp={() => setInteracting(false)}
          >
            {toasts
              .filter((toast) => (!toast.position && index === 0) || toast.position === position)
              .map((toast, index) => (
                <Toast
                  key={toast.id}
                  index={index}
                  toast={toast}
                  duration={toastOptions?.duration ?? duration}
                  className={toastOptions?.className}
                  descriptionClassName={toastOptions?.descriptionClassName}
                  invert={invert ?? false}
                  visibleToasts={visibleToasts}
                  closeButton={closeButton ?? false}
                  interacting={interacting}
                  position={position}
                  style={toastOptions?.style}
                  removeToast={removeToast}
                  toasts={toasts}
                  heights={heights}
                  setHeights={setHeights}
                  expandByDefault={expand ?? false}
                  expanded={expanded}
                  cancelButtonClassName={toastOptions?.cancelButtonClassName}
                  actionButtonClassName={toastOptions?.actionButtonClassName}
                  gap={gap}
                  loadingIcon={loadingIcon}
                />
              ))}
          </ol>
        );
      })}
    </section>
  );
};
