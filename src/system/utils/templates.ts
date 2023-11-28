/**
 * The CSS transform order following the upcoming spec from CSSWG
 * translate => rotate => scale => skew
 * @see https://drafts.csswg.org/css-transforms-2/#ctm
 * @see https://www.stefanjudis.com/blog/order-in-css-transformation-transform-functions-vs-individual-transforms/
 */
const transformTemplate = [
  'rotate(var(--tw-rotate, 0))',
  'scaleX(var(--tw-scale-x, 1))',
  'scaleY(var(--tw-scale-y, 1))',
  'skewX(var(--tw-skew-x, 0))',
  'skewY(var(--tw-skew-y, 0))',
];

export function getTransformTemplate() {
  return ['translateX(var(--tw-translate-x, 0))', 'translateY(var(--tw-translate-y, 0))', ...transformTemplate].join(
    ' ',
  );
}

export function getTransformGpuTemplate() {
  return ['translate3d(var(--tw-translate-x, 0), var(--tw-translate-y, 0), 0)', ...transformTemplate].join(' ');
}

export const filterTemplate = {
  '--tw-blur': 'var(--tw-empty,/*!*/ /*!*/)',
  '--tw-brightness': 'var(--tw-empty,/*!*/ /*!*/)',
  '--tw-contrast': 'var(--tw-empty,/*!*/ /*!*/)',
  '--tw-grayscale': 'var(--tw-empty,/*!*/ /*!*/)',
  '--tw-hue-rotate': 'var(--tw-empty,/*!*/ /*!*/)',
  '--tw-invert': 'var(--tw-empty,/*!*/ /*!*/)',
  '--tw-saturate': 'var(--tw-empty,/*!*/ /*!*/)',
  '--tw-sepia': 'var(--tw-empty,/*!*/ /*!*/)',
  '--tw-drop-shadow': 'var(--tw-empty,/*!*/ /*!*/)',
  filter: [
    'var(--tw-blur)',
    'var(--tw-brightness)',
    'var(--tw-contrast)',
    'var(--tw-grayscale)',
    'var(--tw-hue-rotate)',
    'var(--tw-invert)',
    'var(--tw-saturate)',
    'var(--tw-sepia)',
    'var(--tw-drop-shadow)',
  ].join(' '),
};

export const backdropFilterTemplate = {
  backdropFilter: [
    'var(--tw-backdrop-blur)',
    'var(--tw-backdrop-brightness)',
    'var(--tw-backdrop-contrast)',
    'var(--tw-backdrop-grayscale)',
    'var(--tw-backdrop-hue-rotate)',
    'var(--tw-backdrop-invert)',
    'var(--tw-backdrop-opacity)',
    'var(--tw-backdrop-saturate)',
    'var(--tw-backdrop-sepia)',
  ].join(' '),
  '--tw-backdrop-blur': 'var(--tw-empty,/*!*/ /*!*/)',
  '--tw-backdrop-brightness': 'var(--tw-empty,/*!*/ /*!*/)',
  '--tw-backdrop-contrast': 'var(--tw-empty,/*!*/ /*!*/)',
  '--tw-backdrop-grayscale': 'var(--tw-empty,/*!*/ /*!*/)',
  '--tw-backdrop-hue-rotate': 'var(--tw-empty,/*!*/ /*!*/)',
  '--tw-backdrop-invert': 'var(--tw-empty,/*!*/ /*!*/)',
  '--tw-backdrop-opacity': 'var(--tw-empty,/*!*/ /*!*/)',
  '--tw-backdrop-saturate': 'var(--tw-empty,/*!*/ /*!*/)',
  '--tw-backdrop-sepia': 'var(--tw-empty,/*!*/ /*!*/)',
};

export function getRingTemplate(value: string) {
  return {
    '--tw-ring-offset-shadow': `var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)`,
    '--tw-ring-shadow': `var(--tw-ring-inset) 0 0 0 calc(var(--tw-ring-width) + var(--tw-ring-offset-width)) var(--tw-ring-color)`,
    '--tw-ring-width': value,
    boxShadow: [`var(--tw-ring-offset-shadow)`, `var(--tw-ring-shadow)`, `var(--tw-shadow, 0 0 #0000)`].join(', '),
  };
}
