import type * as CSS from 'csstype';
import type { Token } from '../utils';
import type { Config } from '../utils/prop-config';

import { t } from '../utils';

export const position: Config = {
  position: true,
  pos: t.prop(''),
  zIndex: t.prop('z'),
  inset: t.spaceT('inset'),
  insetX: t.spaceT(['left', 'right']),
  insetInline: t.spaceT(['left', 'right']), // TODO: Add support for insetInline
  insetY: t.spaceT(['top', 'bottom']),
  insetBlock: t.spaceT(['top', 'bottom']), // TODO: Add support for insetBlock
  top: t.spaceT('top'),
  insetBlockStart: t.spaceT('top'), // TODO: Add support for insetBlockStart
  bottom: t.spaceT('bottom'),
  insetBlockEnd: t.spaceT('bottom'), // TODO: Add support for insetBlockEnd
  left: t.spaceT('left'),
  insetInlineStart: t.spaceT('left'), // TODO: Add support for insetInlineStart
  right: t.spaceT('right'),
  insetInlineEnd: t.spaceT('right'), // TODO: Add support for insetInlineEnd
};

Object.assign(position, {
  insetStart: position.insetInlineStart,
  insetEnd: position.insetInlineEnd,
});

/**
 * Types for position CSS properties
 */
export interface PositionProps {
  /**
   * The CSS `z-index` property
   */
  zIndex?: Token<CSS.Property.ZIndex, 'zIndex'>;
  /**
   * The CSS `top` property
   */
  top?: Token<CSS.Property.Top | number, 'spacing'>;
  // insetBlockStart?: Token<CSS.Property.InsetBlockStart | number, 'spacing'>;
  /**
   * The CSS `right` property
   */
  right?: Token<CSS.Property.Right | number, 'spacing'>;
  // /**
  //  * When the direction is `ltr`, `insetInlineEnd` is equivalent to `right`.
  //  * When the direction is `rtl`, `insetInlineEnd` is equivalent to `left`.
  //  */
  // insetInlineEnd?: Token<CSS.Property.InsetInlineEnd | number, 'spacing'>;
  // /**
  //  * When the direction is `ltr`, `insetEnd` is equivalent to `right`.
  //  * When the direction is `rtl`, `insetEnd` is equivalent to `left`.
  //  */
  // insetEnd?: Token<CSS.Property.InsetInlineEnd | number, 'spacing'>;
  /**
   * The CSS `bottom` property
   */
  bottom?: Token<CSS.Property.Bottom | number, 'spacing'>;
  // insetBlockEnd?: Token<CSS.Property.InsetBlockEnd | number, 'spacing'>;
  /**
   * The CSS `left` property
   */
  left?: Token<CSS.Property.Left | number, 'spacing'>;
  // insetInlineStart?: Token<CSS.Property.InsetInlineStart | number, 'spacing'>;
  /**
   * When the direction is `start`, `end` is equivalent to `left`.
   * When the direction is `start`, `end` is equivalent to `right`.
   */
  // insetStart?: Token<CSS.Property.InsetInlineStart | number, 'spacing'>;
  /**
   * The CSS `left`, `right`, `top`, `bottom` property
   */
  inset?: Token<CSS.Property.Inset | number, 'spacing'>;
  // /**
  //  * The CSS `left`, and `right` property
  //  */
  // insetX?: Token<CSS.Property.Inset | number, 'spacing'>;
  // /**
  //  * The CSS `top`, and `bottom` property
  //  */
  // insetY?: Token<CSS.Property.Inset | number, 'spacing'>;
  /**
   * The CSS `position` property
   */
  pos?: Token<CSS.Property.Position>;
  /**
   * The CSS `position` property
   */
  position?: Token<CSS.Property.Position>;
  // insetInline?: Token<CSS.Property.InsetInline>;
  // insetBlock?: Token<CSS.Property.InsetBlock>;
}
