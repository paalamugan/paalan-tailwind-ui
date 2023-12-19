import type { TailwindStyledTheme } from '@/types';

export const SUPPORTED_TAILWIND_CLASSES: Array<keyof TailwindStyledTheme> = [
  'padding',
  'margin',
  'width',
  'height',
  'minWidth',
  'maxWidth',
  'minHeight',
  'maxHeight',
  'gap',
  'order',
  'inset',
  'flex',
  'gridTemplateColumns',
  'gridTemplateRows',
  'gridColumn',
  'gridRow',
  'gridColumnStart',
  'gridColumnEnd',
  'gridRowStart',
  'gridRowEnd',
];

/**
 * *Whenever you add a new property to SUPPORTED_TAILWIND_CLASSES, you must also add tailwind classname first prefix "word" to this regex.
 * *For example, if you add a new property "borderRadius", you must add "rounded" to the regex below.
 */
export const SUPPORTED_TAILWIND_CLASS_REGEX =
  /^(p|px|py|pt|pb|pl|pr|pe|ps|m|mx|my|mt|mb|ml|mr|me|ms|w|h|min|max|basis|rounded|gap|order|inset|top|right|bottom|left|flex|grid-cols|grid-rows|col|row)-+/;
