import type * as CSS from 'csstype';
import type {
  AlignContentKey,
  AlignItemsKey,
  AlignSelfKey,
  FlexDirectionKey,
  FlexWrapKey,
  JustifyContentKey,
  JustifyItemsKey,
  JustifySelfKey,
  PlaceContentKey,
  PlaceItemsKey,
  PlaceSelfKey,
} from '../constants/flexbox-styling';
import type { Config } from '../utils/prop-config';
import type { Length, Token } from '../utils/types';

import {
  alignContent,
  alignItems,
  alignSelf,
  flexDirection,
  flexWrap,
  justifyContent,
  justifyItems,
  justifySelf,
  placeContent,
  placeItems,
  placeSelf,
} from '../constants/flexbox-styling';
import { t } from '../utils';

export const flexbox: Config = {
  alignItems: t.tailwind('items', alignItems),
  alignContent: t.tailwind('content', alignContent),
  justifyItems: t.tailwind('justify-items', justifyItems),
  justifyContent: t.tailwind('justify', justifyContent),
  flexWrap: t.tailwind('flex', flexWrap),
  flexDirection: t.tailwind('flex', flexDirection),
  flex: t.tailwind('flex'),
  flexFlow: true, // TODO: Add support for flexFlow
  flexGrow: {
    transform: (value) => (+value === 1 ? 'flex-grow' : 'flex-grow-0'),
  },
  flexShrink: {
    transform: (value) => (+value === 1 ? 'flex-shrink' : 'flex-shrink-0'),
  },
  flexBasis: {
    transform: (value) => `basis-${value}`,
  },
  justifySelf: t.tailwind('justify-self', justifySelf),
  alignSelf: t.tailwind('self', alignSelf),
  order: t.space('order'),
  placeItems: t.tailwind('place-items', placeItems),
  placeContent: t.tailwind('place-content', placeContent),
  placeSelf: t.tailwind('place-self', placeSelf),
  gap: t.space('gap'),
  rowGap: t.space('gap-y'),
  columnGap: t.space('gap-x'),
};

Object.assign(flexbox, {
  flexDir: flexbox.flexDirection,
});

export interface FlexboxProps {
  /**
   * The CSS `align-items` property.
   *
   * It defines the `align-self` value on all direct children as a group.
   *
   * - In Flexbox, it controls the alignment of items on the Cross Axis.
   * - In Grid Layout, it controls the alignment of items on the Block Axis within their grid area.
   *
   * @see [Mozilla Docs](https://developer.mozilla.org/docs/Web/CSS/align-items)
   */
  alignItems?: Token<CSS.Property.AlignItems> & AlignItemsKey;
  /**
   * The CSS `align-content` property.
   *
   * It defines the distribution of space between and around
   * content items along a flexbox cross-axis or a grid's block axis.
   *
   * @see [Mozilla Docs](https://developer.mozilla.org/docs/Web/CSS/align-content)
   */
  alignContent?: Token<CSS.Property.AlignContent> & AlignContentKey;
  /**
   * The CSS `justify-items` property.
   *
   * It defines the default `justify-self` for all items of the box,
   * giving them all a default way of justifying each box
   * along the appropriate axis.
   *
   * @see [Mozilla Docs](https://developer.mozilla.org/docs/Web/CSS/justify-items)
   */
  justifyItems?: Token<CSS.Property.JustifyItems> & JustifyItemsKey;
  /**
   * The CSS `justify-content` property.
   *
   * It defines how the browser distributes space between and around content items
   * along the main-axis of a flex container, and the inline axis of a grid container.
   *
   * @see [Mozilla Docs](https://developer.mozilla.org/docs/Web/CSS/justify-content)
   */
  justifyContent?: Token<CSS.Property.JustifyContent> & JustifyContentKey;
  /**
   * The CSS `flex-wrap` property.
   *
   * It defines whether flex items are forced onto one line or
   * can wrap onto multiple lines. If wrapping is allowed,
   * it sets the direction that lines are stacked.
   *
   * @see [Mozilla Docs](https://developer.mozilla.org/docs/Web/CSS/flex-wrap)
   */
  flexWrap?: Token<CSS.Property.FlexWrap> & FlexWrapKey;
  // /**
  //  * The CSS `flex-flow` property.
  //  *
  //  * It is a shorthand property for `flex-direction` and `flex-wrap`.
  //  * It specifies the direction of a flex container, as well as its wrapping behavior.
  //  *
  //  * @see [Mozilla Docs](https://developer.mozilla.org/docs/Web/CSS/flex-flow)
  //  */
  // flexFlow?: Token<CSS.Property.FlexFlow>;
  /**
   * The CSS `flex-basis` property.
   *
   * It defines the initial main size of a flex item.
   *
   * @see [Mozilla Docs](https://developer.mozilla.org/docs/Web/CSS/flex-basis)
   */
  flexBasis?: Token<CSS.Property.FlexBasis<Length>, 'flexBasis'>;
  /**
   * The CSS `flex-direction` property.
   *
   * It defines how flex items are placed in the flex container
   * defining the main axis and the direction (normal or reversed).
   *
   * @see [Mozilla Docs](https://developer.mozilla.org/docs/Web/CSS/flex-direction)
   */
  flexDirection?: Token<CSS.Property.FlexDirection> & FlexDirectionKey;
  /**
   * The CSS `flex-direction` property.
   *
   * It defines how flex items are placed in the flex container
   * defining the main axis and the direction (normal or reversed).
   *
   * @see [Mozilla Docs](https://developer.mozilla.org/docs/Web/CSS/flex-direction)
   */
  flexDir?: Token<CSS.Property.FlexDirection> & FlexDirectionKey;
  /**
   * The CSS `flex` property.
   *
   * It defines how a flex item will grow or shrink
   * to fit the space available in its flex container.
   *
   * @see [Mozilla Docs](https://developer.mozilla.org/docs/Web/CSS/flex)
   */
  flex?: Token<CSS.Property.Flex<Length>, 'flex'>;
  /**
   * The CSS `gap` property.
   *
   * It defines the gap between items in both flex and
   * grid contexts.
   *
   * @see [Mozilla Docs](https://developer.mozilla.org/docs/Web/CSS/gap)
   */
  gap?: Token<CSS.Property.Gap<Length>, 'space'>;
  /**
   * The CSS `row-gap` property.
   *
   * It sets the size of the gap (gutter) between an element's grid rows.
   *
   * @see [Mozilla Docs](https://developer.mozilla.org/docs/Web/CSS/row-gap)
   */
  rowGap?: Token<CSS.Property.RowGap<Length>, 'space'>;
  /**
   * The CSS `column-gap` property.
   *
   * It sets the size of the gap (gutter) between an element's columns.
   *
   * @see [Mozilla Docs](https://developer.mozilla.org/docs/Web/CSS/column-gap)
   */
  columnGap?: Token<CSS.Property.ColumnGap<Length>, 'space'>;
  /**
   * The CSS `justify-self` property.
   *
   * It defines the way a box is justified inside its
   * alignment container along the appropriate axis.
   *
   * @see [Mozilla Docs](https://developer.mozilla.org/docs/Web/CSS/flex-flow)
   */
  justifySelf?: Token<CSS.Property.JustifySelf> & JustifySelfKey;
  /**
   * The CSS `align-self` property.
   *
   * It works like `align-items`, but applies only to a
   * single flexbox item, instead of all of them.
   *
   * @see [Mozilla Docs](https://developer.mozilla.org/docs/Web/CSS/align-self)
   */
  alignSelf?: Token<CSS.Property.AlignSelf> & AlignSelfKey;
  /**
   * The CSS `order` property.
   *
   * It defines the order to lay out an item in a flex or grid container.
   *
   * @see [Mozilla Docs](https://developer.mozilla.org/docs/Web/CSS/order)
   */
  order?: Token<CSS.Property.Order, 'order'>;
  /**
   * The CSS `flex-grow` property.
   *
   * It defines how much a flexbox item should grow
   * if there's space available.
   *
   * @see [Mozilla Docs](https://developer.mozilla.org/docs/Web/CSS/flex-grow)
   */
  flexGrow?: Token<CSS.Property.FlexGrow | (string & number)> & ('0' | '1');
  /**
   * The CSS `flex-shrink` property.
   *
   * It defines how much a flexbox item should shrink
   * if there's not enough space available.
   *
   * @see [Mozilla Docs](https://developer.mozilla.org/docs/Web/CSS/flex-shrink)
   */
  flexShrink?: Token<CSS.Property.FlexShrink | (string & number)> & ('0' | '1');
  /**
   * The CSS `place-items` property.
   *
   * It allows you to align items along both the block and
   * inline directions at once (i.e. the align-items and justify-items properties)
   * in a relevant layout system such as `Grid` or `Flex`.
   *
   * @see [Mozilla Docs](https://developer.mozilla.org/docs/Web/CSS/place-items)
   */
  placeItems?: Token<CSS.Property.PlaceItems> & PlaceItemsKey;
  /**
   * The CSS `place-content` property.
   *
   * It allows you to align content along both the block and
   * inline directions at once (i.e. the align-content and justify-content properties)
   * in a relevant layout system such as Grid or Flexbox.
   *
   * @see [Mozilla Docs](https://developer.mozilla.org/docs/Web/CSS/place-content)
   */
  placeContent?: Token<CSS.Property.PlaceContent> & PlaceContentKey;
  /**
   * The CSS `place-self` property.
   *
   * It allows you to align an individual item in both the block and
   * inline directions at once (i.e. the align-self and justify-self properties)
   * in a relevant layout system such as Grid or Flexbox.
   *
   * @see [Mozilla Docs](https://developer.mozilla.org/docs/Web/CSS/place-self)
   */
  placeSelf?: Token<CSS.Property.PlaceSelf> & PlaceSelfKey;
}
