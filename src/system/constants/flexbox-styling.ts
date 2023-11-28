export const flexDirection = {
  row: 'flex-row',
  'row-reverse': 'flex-row-reverse',
  column: 'flex-col',
  'column-reverse': 'flex-col-reverse',
} as const;
export type FlexDirectionKey = keyof typeof flexDirection;

export const justifyContent = {
  normal: 'justify-normal',
  start: 'justify-start',
  end: 'justify-end',
  center: 'justify-center',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly',
  stretch: 'justify-stretch',
} as const;
export type JustifyContentKey = keyof typeof justifyContent;

export const justifyItems = {
  start: 'justify-items-start',
  end: 'justify-items-end',
  center: 'justify-items-center',
  stretch: 'justify-items-stretch',
} as const;
export type JustifyItemsKey = keyof typeof justifyItems;

export const justifySelf = {
  auto: 'justify-self-auto',
  start: 'justify-self-start',
  end: 'justify-self-end',
  center: 'justify-self-center',
  stretch: 'justify-self-stretch',
} as const;
export type JustifySelfKey = keyof typeof justifySelf;

export const alignItems = {
  start: 'items-start',
  end: 'items-end',
  center: 'items-center',
  baseline: 'items-baseline',
  stretch: 'items-stretch',
} as const;
export type AlignItemsKey = keyof typeof alignItems;

export const alignContent = {
  normal: 'content-normal',
  start: 'content-start',
  end: 'content-end',
  center: 'content-center',
  between: 'content-between',
  around: 'content-around',
  evenly: 'content-evenly',
  baseline: 'content-baseline',
  stretch: 'content-stretch',
} as const;
export type AlignContentKey = keyof typeof alignContent;

export const alignSelf = {
  auto: 'self-auto',
  start: 'self-start',
  end: 'self-end',
  center: 'self-center',
  stretch: 'self-stretch',
  baseline: 'self-baseline',
} as const;
export type AlignSelfKey = keyof typeof alignSelf;

export const placeItems = {
  start: 'place-items-start',
  end: 'place-items-end',
  center: 'place-items-center',
  stretch: 'place-items-stretch',
  baseline: 'place-items-baseline',
} as const;
export type PlaceItemsKey = keyof typeof placeItems;

export const placeContent = {
  start: 'place-content-start',
  end: 'place-content-end',
  center: 'place-content-center',
  stretch: 'place-content-stretch',
  between: 'place-content-between',
  around: 'place-content-around',
  evenly: 'place-content-evenly',
  baseline: 'place-content-baseline',
} as const;
export type PlaceContentKey = keyof typeof placeContent;

export const placeSelf = {
  auto: 'place-self-auto',
  start: 'place-self-start',
  end: 'place-self-end',
  center: 'place-self-center',
  stretch: 'place-self-stretch',
} as const;
export type PlaceSelfKey = keyof typeof placeSelf;

export const flexWrap = {
  nowrap: 'flex-nowrap',
  wrap: 'flex-wrap',
  'wrap-reverse': 'flex-wrap-reverse',
} as const;
export type FlexWrapKey = keyof typeof flexWrap;
