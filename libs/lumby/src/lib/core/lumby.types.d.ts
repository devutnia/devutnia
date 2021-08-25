/* eslint-disable @typescript-eslint/no-empty-interface */

import { Property } from 'csstype';
import { CSSObject } from '@emotion/react';

import { LumbyFiber } from './lumby.fiber';
import { LumbyTheme } from './lumby.theme';

declare module '@emotion/react' {
  export interface Theme extends LumbyTheme {}
}

export interface LumbyRoots extends FiberRoots, ThemeRoots {}
export type LumbyExtends<Tag extends keyof JSX.IntrinsicElements> =
  JSX.IntrinsicElements[Tag] & JSX.IntrinsicElements['div'] & Partial<LumbyFiber>;

export type GridGap = [row: number | string, col: number | string];
export type GridContent = [x?: -1 | 0 | 1 | 8, y?: -1 | 0 | 1 | 8];
export type GridTypes =
  | [type: 'describe', row: string, col?: string]
  | [type: 'repeat', min: number | string, max?: number | string]
  | [
      type: 'iterate',
      row: [n: number, size?: number | string],
      col: [n: number, size?: number | string]
    ];

export interface GridStyles {
  display: FiberStyles['display'];
  alignItems: (n?: GridContent[0]) => string;
  justifyItems: (n?: GridContent[1]) => string;
  gridTemplateRows: (type?: GridTypes[0]) => string;
  gridTemplateColumns: (type?: GridTypes[0]) => string;
}

export interface FiberRoots {
  unsetFiber: (fid: string) => boolean;
  fibers: Record<string, Partial<LumbyFiber>>;
  setFiber: (fid: string, newFiber: Partial<LumbyFiber>) => void;
}
export interface FiberProps {}
export interface FrameStylesResult {
  margin: (size?: ThemeSize) => string;
  padding: (size?: ThemeSize) => string;
  fontSize: (size?: ThemeSize) => string;
  width: (width?: string | number) => string;
  height: (height?: string | number) => string;
  display: (display?: Property.Display) => string;
  borderRadius: (corners?: ThemeSize | 'disk') => string;
}
export interface CanvasStylesResult {
  color: (status?: ThemeStatus) => string;
  boxShadow: (shadow?: 0 | 1 | 2) => string;
  cursor: (cursor?: Property.Cursor) => string;
  borderColor: (status?: ThemeStatus) => string;
  backgroundColor: (status?: ThemeStatus) => string;
}
export interface FiberStylesheetProps {
  styles: FiberStyles;
  fiber: Omit<LumbyFiber, 'stylesheet'>;
}

type ThemeSheet = CSSObject;
type ThemeVariant = 'plain' | 'default' | 'secondary' | 'primary';
type ThemeSize = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'none';
type ThemeStatus =
  | 'default'
  | 'error'
  | 'focus'
  | 'hover'
  | 'active'
  | 'working'
  | 'disabled';
type ThemeColor =
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
interface ThemeRoots {
  theme: LumbyTheme;
  setTheme: (newTheme: Partial<LumbyTheme>) => void;
}

declare module '@devutnia/lumby' {
  export namespace Lumby {
    interface Roots extends LumbyRoots {}
    type Extends<Tag extends keyof JSX.IntrinsicElements> = LumbyExtends<Tag>;
  }
  export namespace Grid {
    type Gap = GridGap;
    type Types = GridTypes;
    type Content = GridContent;
    interface Props extends GridProps {}
    interface Styles extends GridStyles {}
  }

  export namespace Fiber {
    interface Roots extends FiberRoots {}
    interface Styles extends FiberStyles {}
  }

  export namespace Theme {
    type Size = ThemeSize;
    type Color = ThemeColor;
    type Sheet = ThemeSheet;
    type Status = ThemeStatus;
    type Variant = ThemeVariant;
    interface Roots extends ThemeRoots {}
  }
}
