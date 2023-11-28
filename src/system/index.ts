import type { Config } from './utils/prop-config';

import { mergeWith } from 'lodash-es';

import { flexbox, grid, layout, position, space } from './config';

export const systemProps: Config = mergeWith({}, flexbox, layout, grid, position, space);

const layoutSystem = Object.assign({}, space, layout, flexbox, grid, position);
export const layoutPropNames = Object.keys(layoutSystem) as (keyof typeof layoutSystem)[];

export const propNames = Object.keys(systemProps);
const styleProps = { ...systemProps };

export const isStyleProp = (prop: string) => prop in styleProps;
