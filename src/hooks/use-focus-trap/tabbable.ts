const TABBABLE_NODES = /input|select|textarea|button|object/;
export const FOCUS_SELECTOR = 'a, input, select, textarea, button, object, [tabindex]';

function hidden(element: HTMLElement) {
  if (import.meta.env.TEST) {
    return false;
  }

  return element.style.display === 'none';
}

function visible(element: HTMLElement) {
  const isHidden =
    element.getAttribute('aria-hidden') || element.getAttribute('hidden') || element.getAttribute('type') === 'hidden';

  if (isHidden) {
    return false;
  }

  let parentElement: HTMLElement = element;
  while (parentElement) {
    if (parentElement === document.body || parentElement.nodeType === 11) {
      break;
    }

    if (hidden(parentElement)) {
      return false;
    }

    parentElement = parentElement.parentNode as HTMLElement;
  }

  return true;
}

function getElementTabIndex(element: HTMLElement) {
  const tabIndex = element.getAttribute('tabindex');
  return parseInt(tabIndex || '', 10);
}

export function focusable(element: HTMLElement) {
  const nodeName = element.nodeName.toLowerCase();
  const isTabIndexNotNaN = !Number.isNaN(getElementTabIndex(element));
  const res =
    (TABBABLE_NODES.test(nodeName) && !element.hasAttribute('disabled')) ||
    (element instanceof HTMLAnchorElement ? element.href || isTabIndexNotNaN : isTabIndexNotNaN);

  return res && visible(element);
}

export function tabbable(element: HTMLElement) {
  const tabIndex = getElementTabIndex(element);
  const isTabIndexNaN = Number.isNaN(tabIndex);
  return (isTabIndexNaN || tabIndex >= 0) && focusable(element);
}

export function findTabbableDescendants(element: HTMLElement): HTMLElement[] {
  return Array.from(element.querySelectorAll<HTMLElement>(FOCUS_SELECTOR)).filter(tabbable);
}
