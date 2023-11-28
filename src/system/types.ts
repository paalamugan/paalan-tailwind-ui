import type * as CSS from 'csstype';
import type { FlexboxProps, GridProps, LayoutProps, PositionProps, SpaceProps } from './config';
import type { ResponsiveValue } from './utils/types';

export interface StyleProps extends SpaceProps, FlexboxProps, GridProps, LayoutProps, PositionProps {}

export interface SystemCSSProperties extends CSS.Properties, Omit<StyleProps, keyof CSS.Properties> {}

export type ThemeThunk<T> = T | ((theme: Record<string, unknown>) => T);

type PropertyValue<K extends keyof SystemCSSProperties> = ThemeThunk<
  ResponsiveValue<boolean | number | string | SystemCSSProperties[K]>
>;

export type CSSWithMultiValues = {
  [K in keyof SystemCSSProperties]?: K extends keyof StyleProps ? StyleProps[K] | PropertyValue<K> : PropertyValue<K>;
};

type CSSDefinition<D> = D | string | RecursiveCSSSelector<D | string>;

export interface RecursiveCSSSelector<D> {
  [selector: string]: CSSDefinition<D> & D;
}

export type RecursiveCSSObject<D> = D & (D | RecursiveCSSSelector<D>);

export type SystemStyleObject = RecursiveCSSObject<CSSWithMultiValues>;

export interface SystemProps extends StyleProps {}
