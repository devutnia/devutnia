/* eslint-disable @typescript-eslint/no-empty-interface */

import { CSSObject } from '@emotion/react';

import { LumbyFiber } from './lumby.fiber';
import { LumbyTheme } from './lumby.theme';

declare module '@emotion/react' {
  export interface Theme extends LumbyTheme {}
}

export type LumbySheet = CSSObject;
export type LumbyFormat = Record<LumbyArea, string | number>;
export type LumbySize = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
export type LumbyVariant = 'plain' | 'default' | 'secondary' | 'primary';
export type LumbyColor =
  | 'plain'
  | 'default'
  | 'disabled'
  | 'dark'
  | 'light'
  | 'accent'
  | 'primary'
  | 'secondary'
  | 'ternary'
  | 'error';

export interface LumbyKeys {
  color: LumbyColor;
  variants: LumbyVariant;
  decorators: 'elevation' | 'borderRadius';
  size: 'spacing' | 'fontSize' | 'borderWidth';
  status: 'default' | 'error' | 'focus' | 'hover' | 'active' | 'working' | 'disabled';
}

export interface LumbyFiberRoots {
  fibers: Record<string, Partial<LumbyFiber>>;
  setFiber: (fid: string, newFiber: Partial<LumbyFiber>) => void;
  unsetFiber: (fid: string) => boolean;
}
export interface LumbyThemeRoots {
  theme: LumbyTheme;
  setTheme: (newTheme: Partial<LumbyTheme>) => void;
}
export interface LumbyRoots extends LumbyFiberRoots, LumbyThemeRoots {}

export type LumbyExtends<Tag extends keyof JSX.IntrinsicElements> =
  JSX.IntrinsicElements[Tag] & JSX.IntrinsicElements['div'] & Partial<LumbyFiber>;
