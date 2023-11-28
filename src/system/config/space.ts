import type * as CSS from 'csstype';
import type { Token } from '../utils';
import type { Config } from '../utils/prop-config';

import { t } from '../utils';

export const space: Config = {
  margin: t.space('m'),
  marginTop: t.space('mt'),
  marginBlockStart: t.space('mt'), // TODO: Add support for marginBlockStart
  marginRight: t.space('mr'),
  marginInlineEnd: t.space('me'),
  marginBottom: t.space('mb'),
  marginBlockEnd: t.space('mb'), // TODO: Add support for marginBlockEnd
  marginLeft: t.space('ml'),
  marginInlineStart: t.space('ms'),
  marginX: t.space(['ms', 'me']),
  marginInline: t.space(['ms', 'me']),
  marginY: t.space(['mt', 'mb']),
  marginBlock: t.space(['mt', 'mb']), // TODO: Add support for marginBlock
  padding: t.space('p'),
  paddingTop: t.space('pt'),
  paddingBlockStart: t.space('pt'), // TODO: Add support for paddingBlockStart
  paddingRight: t.space('pr'),
  paddingBottom: t.space('pb'),
  paddingBlockEnd: t.space('pb'), // TODO: Add support for paddingBlockEnd
  paddingLeft: t.space('pl'),
  paddingInlineStart: t.space('ps'),
  paddingInlineEnd: t.space('pe'),
  paddingX: t.space(['pl', 'pr']),
  paddingInline: t.space(['ps', 'pe']),
  paddingY: t.space(['pt', 'pb']),
  paddingBlock: t.space(['pt', 'pb']), // TODO: Add support for paddingBlock
};

Object.assign(space, {
  m: space.margin,
  mt: space.marginTop,
  mr: space.marginRight,
  me: space.marginInlineEnd,
  marginEnd: space.marginInlineEnd,
  mb: space.marginBottom,
  ml: space.marginLeft,
  ms: space.marginInlineStart,
  marginStart: space.marginInlineStart,
  mx: space.marginX,
  my: space.marginY,
  p: space.padding,
  pt: space.paddingTop,
  py: space.paddingY,
  px: space.paddingX,
  pb: space.paddingBottom,
  pl: space.paddingLeft,
  ps: space.paddingInlineStart,
  paddingStart: space.paddingInlineStart,
  pr: space.paddingRight,
  pe: space.paddingInlineEnd,
  paddingEnd: space.paddingInlineEnd,
});

/**
 * Types for space related CSS properties
 */
export interface SpaceProps {
  /**
   * Margin on top, left, bottom and right
   */
  m?: Token<CSS.Property.Margin | number, 'space'>;
  /**
   * Margin on top, left, bottom and right
   */
  margin?: Token<CSS.Property.Margin | number, 'space'>;
  /**
   * Margin on top
   */
  mt?: Token<CSS.Property.Margin | number, 'space'>;
  // marginBlockStart?: Token<CSS.Property.MarginBlockStart | number, 'space'>;
  /**
   * Margin on top
   */
  marginTop?: Token<CSS.Property.MarginTop | number, 'space'>;
  /**
   * Margin on right
   */
  mr?: Token<CSS.Property.MarginRight | number, 'space'>;
  /**
   * When direction is `ltr`, `marginInlineEnd` is equivalent to `marginRight`.
   * When direction is `rtl`, `marginInlineEnd` is equivalent to `marginLeft`.
   */
  marginInlineEnd?: Token<CSS.Property.MarginInlineEnd | number, 'space'>;
  /**
   * When direction is `ltr`, `marginEnd` is equivalent to `marginRight`.
   * When direction is `rtl`, `marginEnd` is equivalent to `marginLeft`.
   */
  marginEnd?: Token<CSS.Property.MarginInlineEnd | number, 'space'>;
  /**
   * When direction is `ltr`, `me` is equivalent to `marginRight`.
   * When direction is `rtl`, `me` is equivalent to `marginLeft`.
   */
  me?: Token<CSS.Property.MarginInlineEnd | number, 'space'>;
  /**
   * Margin on right
   */
  marginRight?: Token<CSS.Property.MarginRight | number, 'space'>;
  /**
   * Margin on bottom
   */
  mb?: Token<CSS.Property.MarginBottom | number, 'space'>;
  // marginBlockEnd?: Token<CSS.Property.MarginBlockEnd | number, 'space'>;
  /**
   * Margin on bottom
   */
  marginBottom?: Token<CSS.Property.MarginBottom | number, 'space'>;
  /**
   * Margin on left
   */
  ml?: Token<CSS.Property.MarginLeft | number, 'space'>;
  /**
   * When direction is `ltr`, `marginInlineStart` is equivalent to `marginLeft`.
   * When direction is `rtl`, `marginInlineStart` is equivalent to `marginRight`.
   */
  marginInlineStart?: Token<CSS.Property.MarginInlineStart | number, 'space'>;
  /**
   * When direction is `ltr`, `marginStart` is equivalent to `marginLeft`.
   * When direction is `rtl`, `marginStart` is equivalent to `marginRight`.
   */
  marginStart?: Token<CSS.Property.MarginInlineStart | number, 'space'>;
  /**
   * When direction is `ltr`, `ms` is equivalent to `marginLeft`.
   * When direction is `rtl`, `ms` is equivalent to `marginRight`.
   */
  ms?: Token<CSS.Property.MarginInlineStart | number, 'space'>;
  /**
   * Margin on left
   */
  marginLeft?: Token<CSS.Property.MarginLeft | number, 'space'>;
  /**
   * Margin on left and right
   */
  mx?: Token<CSS.Property.Margin | number, 'space', 'auto'>;
  // marginInline?: Token<CSS.Property.MarginInline | number, 'space'>;
  /**
   * Margin on left and right
   */
  marginX?: Token<CSS.Property.Margin | number, 'space'>;
  /**
   * Margin on top and bottom
   */
  my?: Token<CSS.Property.Margin | number, 'space'>;
  // marginBlock?: Token<CSS.Property.MarginBlock | number, 'space'>;
  /**
   * Margin on top and bottom
   */
  marginY?: Token<CSS.Property.Margin | number, 'space'>;
  /**
   * Padding on top, left, bottom and right
   */
  p?: Token<CSS.Property.Padding | number, 'space'>;
  /**
   * Padding on top, left, bottom and right
   */
  padding?: Token<CSS.Property.Padding | number, 'space'>;
  /**
   * Padding on top
   */
  pt?: Token<CSS.Property.PaddingTop | number, 'space'>;
  // paddingBlockStart?: Token<CSS.Property.PaddingBlockStart | number, 'space'>;
  /**
   * Padding on top
   */
  paddingTop?: Token<CSS.Property.PaddingTop | number, 'space'>;
  /**
   * Padding on right
   */
  pr?: Token<CSS.Property.PaddingRight | number, 'space'>;
  /**
   * When direction is `ltr`, `paddingInlineEnd` is equivalent to `paddingRight`.
   * When direction is `rtl`, `paddingInlineEnd` is equivalent to `paddingLeft`.
   */
  paddingInlineEnd?: Token<CSS.Property.PaddingInlineEnd | number, 'space'>;
  /**
   * When direction is `ltr`, `paddingEnd` is equivalent to `paddingRight`.
   * When direction is `rtl`, `paddingEnd` is equivalent to `paddingLeft`.
   */
  paddingEnd?: Token<CSS.Property.PaddingInlineEnd | number, 'space'>;
  /**
   * When direction is `ltr`, `pe` is equivalent to `paddingRight`.
   * When direction is `rtl`, `pe` is equivalent to `paddingLeft`.
   */
  pe?: Token<CSS.Property.PaddingInlineEnd | number, 'space'>;
  /**
   * Padding on right
   */
  paddingRight?: Token<CSS.Property.PaddingRight | number, 'space'>;
  /**
   * Padding on bottom
   */
  pb?: Token<CSS.Property.PaddingBottom | number, 'space'>;
  // paddingBlockEnd?: Token<CSS.Property.PaddingBlockEnd | number, 'space'>;
  /**
   * Padding on bottom
   */
  paddingBottom?: Token<CSS.Property.PaddingBottom | number, 'space'>;
  /**
   * Padding on left
   */
  pl?: Token<CSS.Property.PaddingLeft | number, 'space'>;
  /**
   * When direction is `ltr`, `paddingInlineStart` is equivalent to `paddingLeft`.
   * When direction is `rtl`, `paddingInlineStart` is equivalent to `paddingRight`.
   */
  paddingInlineStart?: Token<CSS.Property.PaddingInlineStart | number, 'space'>;
  /**
   * When direction is `ltr`, `paddingStart` is equivalent to `paddingLeft`.
   * When direction is `rtl`, `paddingStart` is equivalent to `paddingRight`.
   */
  paddingStart?: Token<CSS.Property.PaddingInlineStart | number, 'space'>;
  /**
   * When direction is `ltr`, `ps` is equivalent to `paddingLeft`.
   * When direction is `rtl`, `ps` is equivalent to `paddingRight`.
   */
  ps?: Token<CSS.Property.PaddingInlineStart | number, 'space'>;
  /**
   * Padding on left
   */
  paddingLeft?: Token<CSS.Property.PaddingLeft | number, 'space'>;
  /**
   * Padding on left and right
   */
  px?: Token<CSS.Property.Padding | number, 'space'>;
  // paddingInline?: Token<CSS.Property.PaddingInline | number, 'space'>;
  /**
   * Padding on left and right
   */
  paddingX?: Token<CSS.Property.Padding | number, 'space'>;
  /**
   * Padding on top and bottom
   */
  py?: Token<CSS.Property.Padding | number, 'space'>;
  // paddingBlock?: Token<CSS.Property.PaddingBlock | number, 'space'>;
  /**
   * Padding on top and bottom
   */
  paddingY?: Token<CSS.Property.Padding | number, 'space'>;
}
