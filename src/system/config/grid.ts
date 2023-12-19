import type * as CSS from 'csstype';
import type { Token } from '../utils';
import type { Config } from '../utils/prop-config';

import { t } from '../utils';

export const grid: Config = {
  gridCols: t.tailwind('grid-cols'),
  gridRows: t.tailwind('grid-rows'),
  gridColumn: t.tailwind('col-span'),
  gridColumnStart: t.tailwind('col-start'),
  gridColumnEnd: t.tailwind('col-end'),
  gridRow: t.tailwind('row-span'),
  gridRowStart: t.tailwind('row-start'),
  gridRowEnd: t.tailwind('row-end'),
  gridGap: t.space('gap'), // TODO: Add support for gridGap
  gridColumnGap: t.space('gap-x'), // TODO: Add support for gridColumnGap
  gridRowGap: t.space('gap-y'), // TODO: Add support for gridRowGap
  gridAutoFlow: true, // TODO: Add support for gridAutoFlow
  gridAutoColumns: true, // TODO: Add support for gridAutoColumns
  gridAutoRows: true, // TODO: Add support for gridAutoRows
  gridTemplate: true, // TODO: Add support for gridTemplate
  gridTemplateAreas: true, // TODO: Add support for gridTemplateAreas
  gridArea: true, // TODO: Add support for gridArea
};

export interface GridProps {
  /**
   * The CSS `grid-template-columns` property
   *
   * It defines the line names and track sizing functions of the grid columns.
   *
   * @see [Tailwind Docs](https://tailwindcss.com/docs/grid-template-columns)
   */
  gridCols?: Token<CSS.Property.GridTemplateColumns, 'gridTemplateColumns'>;
  /**
   * The CSS `grid-template-rows` property.
   *
   * It defines the line names and track sizing functions of the grid rows.
   *
   * @see [Tailwind Docs](https://tailwindcss.com/docs/grid-template-rows)
   */
  gridRows?: Token<CSS.Property.GridTemplateColumns, 'gridTemplateRows'>;
  /**
   * The CSS `grid-column` property.
   *
   * It specifies a grid item's size and location within a grid column
   * by contributing a line, a span, or nothing (automatic) to its grid placement,
   * thereby specifying the `inline-start` and `inline-end` edge of its grid area.
   *
   * @see [Tailwind Docs](https://tailwindcss.com/docs/grid-column)
   */
  gridColumn?: Token<CSS.Property.GridColumn, 'gridColumn'>;
  /**
   * The CSS `grid-column-start` property.
   *
   * It specifies a grid item’s start position within the grid column by
   * contributing a line, a span, or nothing (automatic) to its grid placement
   *
   * @see [Tailwind Docs](https://tailwindcss.com/docs/grid-column)
   */
  gridColumnStart?: Token<CSS.Property.GridColumnStart, 'gridColumnStart'>;
  /**
   * The CSS `grid-column-end` property
   *
   * It specifies a grid item’s end position within the grid column by
   * contributing a line, a span, or nothing (automatic) to its grid placement,
   * thereby specifying the block-end edge of its grid area.
   *
   * @see [Tailwind Docs](https://tailwindcss.com/docs/grid-column)
   */
  gridColumnEnd?: Token<CSS.Property.GridColumnEnd, 'gridColumnEnd'>;
  /**
   * The CSS `grid-row` property
   *
   * It specifies a grid item’s size and location within the grid row
   * by contributing a line, a span, or nothing (automatic) to its grid placement,
   * thereby specifying the `inline-start` and `inline-end` edge of its grid area.
   *
   * @see [Tailwind Docs](https://tailwindcss.com/docs/grid-row)
   */
  gridRow?: Token<CSS.Property.GridRow, 'gridRow'>;
  /**
   * The CSS `grid-row-start` property
   *
   * It specifies a grid item’s start position within the grid row by
   * contributing a line, a span, or nothing (automatic) to its grid placement,
   * thereby specifying the `inline-start` edge of its grid area.
   *
   * @see [Tailwind Docs](https://tailwindcss.com/docs/grid-row)
   */
  gridRowStart?: Token<CSS.Property.GridRowStart, 'gridRowStart'>;
  /**
   * The CSS `grid-row-end` property
   *
   * It specifies a grid item’s end position within the grid row by
   * contributing a line, a span, or nothing (automatic) to its grid placement,
   * thereby specifying the `inline-end` edge of its grid area.
   *
   * @see [Tailwind Docs](https://tailwindcss.com/docs/grid-row)
   */
  gridRowEnd?: Token<CSS.Property.GridRowEnd, 'gridRowEnd'>;
  // /**
  //  * The CSS `grid-gap` property.
  //  *
  //  * It defines the gaps (gutters) between rows and columns
  //  *
  //  * @see [Mozilla Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-gap)
  //  */
  // gridGap?: Token<CSS.Property.GridGap | number, 'space'>;
  // /**
  //  * The CSS `grid-column-gap` property.
  //  *
  //  * It defines the size of the gap (gutter) between an element's columns.
  //  *
  //  * @see [Mozilla Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/column-gap)
  //  */
  // gridColumnGap?: Token<CSS.Property.GridColumnGap | number, 'space'>;
  // /**
  //  * The CSS `grid-row-gap` property.
  //  *
  //  * It defines the size of the gap (gutter) between an element's grid rows.
  //  *
  //  * @see [Mozilla Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/row-gap)
  //  */
  // gridRowGap?: Token<CSS.Property.GridRowGap | number, 'space'>;
  // /**
  //  * The CSS `grid-template` property.
  //  *
  //  * It is a shorthand property for defining grid columns, rows, and areas.
  //  *
  //  * @see [Mozilla Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template)
  //  */
  // gridTemplate?: Token<CSS.Property.GridTemplate>;
  // /**
  //  * The CSS `grid-auto-flow` property
  //  *
  //  * It controls how the auto-placement algorithm works,
  //  * specifying exactly how auto-placed items get flowed into the grid.
  //  *
  //  * @see [Mozilla Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-auto-flow)
  //  */
  // gridAutoFlow?: Token<CSS.Property.GridAutoFlow>;
  // /**
  //  * The CSS `grid-auto-columns` property.
  //  *
  //  * It specifies the size of an implicitly-created grid column track or pattern of tracks.
  //  *
  //  * @see [Mozilla Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-auto-columns)
  //  */
  // gridAutoColumns?: Token<CSS.Property.GridAutoColumns>;
  // /**
  //  * The CSS `grid-auto-rows` property.
  //  *
  //  * It specifies the size of an implicitly-created grid row track or pattern of tracks.
  //  *
  //  * @see [Mozilla Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-auto-rows)
  //  */
  // gridAutoRows?: Token<CSS.Property.GridAutoRows>;
  // /**
  //  * The CSS `grid-template-areas` property.
  //  *
  //  * @see [Mozilla Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-areas)
  //  */
  // gridTemplateAreas?: Token<CSS.Property.GridTemplateAreas>;
  // /**
  //  * The CSS `grid-areas` property.
  //  *
  //  * It specifies a grid item’s size and location within a grid by
  //  * contributing a line, a span, or nothing (automatic)
  //  * to its grid placement, thereby specifying the edges of its grid area.
  //  *
  //  * @see [Mozilla Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-area)
  //  */
  // gridArea?: Token<CSS.Property.GridArea>;
}
