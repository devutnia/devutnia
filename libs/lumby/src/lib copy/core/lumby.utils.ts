/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { rem } from 'polished';
import { Property } from 'csstype';

import { LumbyFiber } from './lumby.fiber';
import {
  GridTypes,
  ThemeSize,
  GridStyles,
  GridContent,
  FiberStyles,
  ThemeStatus,
} from './lumby.types.d';
import { GridProps } from '../components';

export const fiberStyles = (newFiber?: Partial<LumbyFiber>): FiberStyles => {
  const fiber = { ...new LumbyFiber(), ...newFiber } as LumbyFiber;
  const { theme, margins, paddings, show, size, block, full } = fiber;

  const height = (height?: string | number) => {
    if (full !== 'none') return full === 'screen' ? '100vh' : '100%';
    return height ? rem(height) : 'fit-content';
  };
  const width = (width?: string | number) => {
    if (full !== 'none') return full === 'screen' ? '100vw' : '100%';
    if (block) return '100%';
    return width ? rem(width) : 'fit-content';
  };

  const spacing = (on: 'margins' | 'paddings', size?: ThemeSize) => {
    const calc = (space: number | string) =>
      typeof space === 'number'
        ? `${space / 2}px ${space + (space / space + 2)}px`
        : `calc(${space} / 2) calc(${space} + (${space} + (${space} / ${space} + 2)))`;

    if (on === 'margins') {
      if (margins) return rem(theme.size.spacing[size || margins]);
    } else {
      if (paddings) return rem(theme.size.spacing[size || paddings]);
    }
    return calc(theme.size.spacing[size || fiber.size]);
  };

  const cursor = (cursor?: string) =>
    fiber.disabled || fiber.error
      ? 'not-allowed'
      : fiber.working
      ? 'progress'
      : cursor || 'default';

  const borderRadius = (corners?: ThemeSize | 'disk') =>
    fiber.corners === 'disk'
      ? '100%'
      : fiber.corners === 'none'
      ? 'none'
      : rem(fiber.theme.decorators.borderRadius[corners || fiber.corners]);

  const boxShadow = (shadow = 0) => {
    if (
      (fiber.variant === 'plain' && !fiber.elevate) ||
      fiber.flat ||
      fiber.disabled ||
      fiber.error
    ) {
      return 'none';
    }
    if (fiber.elevate) {
      if (fiber.variant === 'plain') return fiber.theme.decorators.elevation[1];
      else return fiber.theme.decorators.elevation[shadow + 1];
    } else return fiber.theme.decorators.elevation[shadow + 0];
  };

  const variant = (
    status: ThemeStatus = 'default',
    style: 'backgroundColor' | 'color' | 'borderColor'
  ) => {
    const selected = fiber.theme.variants[fiber.variant];
    if (fiber.error) return selected.error[style] as string;
    if (fiber.disabled) return selected.disabled[style] as string;
    if (fiber.working) return selected.working[style] as string;
    return selected[status][style] as string;
  };

  const fontSize = (size?: ThemeSize) =>
    rem(fiber.theme.size.fontSize[size || fiber.size]);

  const display = (display: Property.Display = 'flex') =>
    show === false || size === 'none' ? 'none' : display;

  const placeItems = <T extends GridContent[0]>(axis: 'x' | 'y', n?: T) => {
    const isX = axis === 'x';
    const mindAxis = (n?: T) => n && (isX ? n < 0 : n > 0);
    return n === 8
      ? 'stretch'
      : n === 0
      ? 'center'
      : !n || mindAxis(n)
      ? 'flex-start'
      : 'flex-end';
  };

  return {
    width,
    cursor,
    height,
    display,
    fontSize,
    boxShadow,
    borderRadius,
    alignContent: (n) => placeItems('y', n),
    justifyContent: (n) => placeItems('x', n),
    margin: (size) => spacing('margins', size),
    color: (status) => variant(status, 'color'),
    padding: (size) => spacing('paddings', size),
    borderColor: (status) => variant(status, 'borderColor'),
    backgroundColor: (status) => variant(status, 'backgroundColor'),
  };
};

export function gridStyles(props: Partial<GridProps>): GridStyles {
  const fiber = fiberStyles(props);

  const placeItems = <T extends GridContent[0]>(axis: 'x' | 'y', n?: T) => {
    const isX = axis === 'x';
    const mindAxis = (n?: T) => n && (isX ? n < 0 : n > 0);
    return n === 8 ? 'stretch' : n === 0 ? 'center' : !n || mindAxis(n) ? 'start' : 'end';
  };

  const template = <T extends GridTypes>(
    axis: 'x' | 'y',
    [type, ...terms]: T,
    newType?: T[0]
  ): string => {
    const isX = axis === 'x';

    if (type === 'repeat' && axis === 'x') return 'auto';

    if (newType === 'iterate' || type === 'iterate') {
      const [[nRow, sizeRow], [nCol, sizeCol]] = terms as any[];
      const n = isX ? nRow : nCol;
      const size = isX ? sizeRow : sizeCol;
      return `repeat(${n}, ${size ? rem(size) : '1fr'})`;
    }

    if (newType === 'describe' || type === 'describe') {
      const [row, col] = terms as any[];
      return isX ? row : col;
    }

    const [min, max] = terms as any[];
    const minmax = (n?: unknown) => {
      if (!n) return '1fr';
      if (typeof n !== 'number') return n;
      return rem(n);
    };

    return `repeat(auto-fit, minmax(${minmax(min)}, ${minmax(max)}))`;
  };

  return {
    display: fiber.display,
    alignItems: (n) => placeItems('y', n),
    justifyItems: (n) => placeItems('x', n),
    gridTemplateRows: (type) => template('x', props.grid!, type),
    gridTemplateColumns: (type) => template('y', props.grid!, type),
  };
}
