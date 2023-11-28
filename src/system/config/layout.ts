import type { TailwindStyledTheme } from '@/types';
import type * as CSS from 'csstype';
import type { Length, Token } from '../utils';
import type { Config } from '../utils/prop-config';

import { t, transforms } from '../utils';

const hiddenBreakPoint: Record<keyof TailwindStyledTheme['screens'], string> = {
  xs: `xs:hidden`,
  sm: `sm:hidden`,
  md: `md:hidden`,
  lg: `lg:hidden`,
  xl: `xl:hidden`,
  '2xl': `2xl:hidden`,
  '3xl': `3xl:hidden`,
};

export const layout: Config = {
  width: t.sizes('w'),
  inlineSize: t.sizesT('w'), // TODO: Add support for inlineSize
  height: t.sizes('h'),
  blockSize: t.sizes('h'), // TODO: Add support for blockSize
  boxSize: t.sizes(['w', 'h']),
  minWidth: t.sizes('min-w'),
  minInlineSize: t.sizes('min-w'), // TODO: Add support for minInlineSize
  minHeight: t.sizes('min-h'),
  minBlockSize: t.sizes('min-h'), // TODO: Add support for minBlockSize
  maxWidth: t.sizes('max-w'),
  maxInlineSize: t.sizes('max-w'), // TODO: Add support for maxInlineSize
  maxHeight: t.sizes('max-h'),
  maxBlockSize: t.sizes('max-h'), // TODO: Add support for maxBlockSize
  rounded: t.tailwindT('rounded'),
  overflow: true, // TODO: Add support for overflow
  overflowX: true, // TODO: Add support for overflowX
  overflowY: true, // TODO: Add support for overflowY
  overscrollBehavior: true, // TODO: Add support for overscrollBehavior
  overscrollBehaviorX: true, // TODO: Add support for overscrollBehaviorX
  overscrollBehaviorY: true, // TODO: Add support for overscrollBehaviorY
  display: {
    transform: (value) => {
      if (value === 'none') return 'hidden';
      return value;
    },
  },
  aspectRatio: true, // TODO: Add support for aspectRatio
  hideFrom: t.tailwind('hidden', hiddenBreakPoint),
  verticalAlign: true, // TODO: Add support for verticalAlign
  boxSizing: true, // TODO: Add support for boxSizing
  boxDecorationBreak: true, // TODO: Add support for boxDecorationBreak
  float: t.propT('float', transforms.float), // TODO: Add support for float
  objectFit: true, // TODO: Add support for objectFit
  objectPosition: true, // TODO: Add support for objectPosition
  visibility: true, // TODO: Add support for visibility
  isolation: true, // TODO: Add support for isolation
};

Object.assign(layout, {
  w: layout.width,
  h: layout.height,
  minW: layout.minWidth,
  maxW: layout.maxWidth,
  minH: layout.minHeight,
  maxH: layout.maxHeight,
  overscroll: layout.overscrollBehavior,
  overscrollX: layout.overscrollBehaviorX,
  overscrollY: layout.overscrollBehaviorY,
});

/**
 * Types for layout related CSS properties
 */
export interface LayoutProps {
  /**
   * The CSS `display` property
   */
  display?: Token<CSS.Property.Display>;
  /**
   * Hides an element from the specified breakpoint and up
   */
  hideFrom?: Token<string & NonNullable<unknown>, 'breakpoints'>;
  /**
   * The CSS `width` property
   */
  width?: Token<CSS.Property.Width | number, 'width'>;
  /**
   * The CSS `width` property
   */
  w?: Token<CSS.Property.Width | number, 'width'>;
  // inlineSize?: Token<CSS.Property.InlineSize | number, 'width'>;
  /**
   * The CSS `width` and `height` property
   */
  boxSize?: Token<CSS.Property.Width | number, 'width' | 'height'>;
  /**
   * The CSS `max-width` property
   */
  maxWidth?: Token<CSS.Property.MaxWidth | number, 'maxWidth'>;
  /**
   * The CSS `max-width` property
   */
  maxW?: Token<CSS.Property.MaxWidth | number, 'maxWidth'>;
  // maxInlineSize?: Token<CSS.Property.MaxInlineSize | number, 'maxWidth'>;
  /**
   * The CSS `min-width` property
   */
  minWidth?: Token<CSS.Property.MinWidth | number, 'minWidth'>;
  /**
   * The CSS `min-width` property
   */
  minW?: Token<CSS.Property.MinWidth | number, 'minWidth'>;
  // minInlineSize?: Token<CSS.Property.MinInlineSize | number, 'minWidth'>;
  /**
   * The CSS `height` property
   */
  height?: Token<CSS.Property.Height | number, 'height'>;
  /**
   * The CSS `height` property
   */
  h?: Token<CSS.Property.Height | number, 'height'>;
  // blockSize?: Token<CSS.Property.BlockSize | number, 'height'>;
  /**
   * The CSS `max-height` property
   */
  maxHeight?: Token<CSS.Property.MaxHeight | number, 'maxHeight'>;
  /**
   * The CSS `max-height` property
   */
  maxH?: Token<CSS.Property.MaxHeight | number, 'maxHeight'>;
  // maxBlockSize?: Token<CSS.Property.MaxBlockSize | number, 'maxHeight'>;
  /**
   * The CSS `min-height` property
   */
  minHeight?: Token<CSS.Property.MinHeight | number, 'minHeight'>;
  /**
   * The CSS `min-height` property
   */
  minH?: Token<CSS.Property.MinHeight | number, 'minHeight'>;
  // minBlockSize?: Token<CSS.Property.MinBlockSize | number, 'minHeight'>;
  /**
   * The CSS `border-radius` property
   */
  rounded?: Token<CSS.Property.BorderRadius<Length>, 'borderRadius'>;
  // /**
  //  * The CSS `vertical-align` property
  //  *
  //  */
  // verticalAlign?: Token<CSS.Property.VerticalAlign<Length>>;
  // /**
  //  * The CSS `overflow` property
  //  */
  // overflow?: Token<CSS.Property.Overflow>;
  // /**
  //  * The CSS `overflow-x` property
  //  */
  // overflowX?: Token<CSS.Property.OverflowX>;
  // /**
  //  * The CSS `overflow-y` property
  //  */
  // overflowY?: Token<CSS.Property.OverflowY>;
  // /**
  //  * The CSS `box-sizing` property
  //  */
  // boxSizing?: CSS.Property.BoxSizing;
  // /**
  //  * The CSS `box-decoration` property
  //  */
  // boxDecorationBreak?: Token<CSS.Property.BoxDecorationBreak>;
  // /**
  //  * The CSS `float` property
  //  */
  // float?: Token<CSS.Property.Float>;
  // /**
  //  * The CSS `object-fit` property
  //  */
  // objectFit?: Token<CSS.Property.ObjectFit>;
  // /**
  //  * The CSS `object-position` property
  //  */
  // objectPosition?: Token<CSS.Property.ObjectPosition<Length>>;
  // /**
  //  * The CSS `overscroll-behavior` property
  //  */
  // overscrollBehavior?: Token<CSS.Property.OverscrollBehavior>;
  // /**
  //  * The CSS `overscroll-behavior` property
  //  */
  // overscroll?: Token<CSS.Property.OverscrollBehavior>;
  // /**
  //  * The CSS `overscroll-behavior-x` property
  //  */
  // overscrollBehaviorX?: Token<CSS.Property.OverscrollBehaviorX>;
  // /**
  //  * The CSS `overscroll-behavior-x` property
  //  */
  // overscrollX?: Token<CSS.Property.OverscrollBehaviorX>;
  // /**
  //  * The CSS `overscroll-behavior-y` property
  //  */
  // overscrollBehaviorY?: Token<CSS.Property.OverscrollBehaviorY>;
  // /**
  //  * The CSS `overscroll-behavior-y` property
  //  */
  // overscrollY?: Token<CSS.Property.OverscrollBehaviorY>;
  // /**
  //  * The CSS `visibility` property
  //  */
  // visibility?: Token<CSS.Property.Visibility>;
  // /**
  //  * The CSS `isolation` property
  //  */
  // isolation?: Token<CSS.Property.Isolation>;
  // /**
  //  * The CSS `aspect-ratio` property
  //  */
  // aspectRatio?: Token<CSS.Property.AspectRatio>;
}
