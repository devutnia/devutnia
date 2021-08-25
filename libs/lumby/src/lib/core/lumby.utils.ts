import { rem } from 'polished';
import { Property } from 'csstype';

import { lumbyFiber, LumbyFiber } from './lumby.fiber';
import {
  ThemeSize,
  ThemeStatus,
  FrameStylesResult,
  CanvasStylesResult,
} from './lumby.types.d';
import { css } from '@emotion/react';

export const canvasCSS = (canvas: CanvasStylesResult) => css`
  color: ${canvas.color()};
  cursor: ${canvas.cursor()};
  box-shadow: ${canvas.boxShadow()};
  border-color: ${canvas.borderColor()};
  background-color: ${canvas.backgroundColor()};
`;
export const fiberCanvasStyles = (newFiber: Partial<LumbyFiber>): CanvasStylesResult => {
  const {
    fiber: { theme },
    canvas,
  } = lumbyFiber(newFiber);

  const variant = (
    status: ThemeStatus = 'default',
    style: 'backgroundColor' | 'color' | 'borderColor'
  ) => {
    const selected = theme.variants[canvas.variant];
    // order of error | disabled | working is important
    if (canvas.error) return selected.error[style] as string;
    if (canvas.disabled) return selected.disabled[style] as string;
    if (canvas.working) return selected.working[style] as string;
    return selected[status][style] as string;
  };
  const cursor = (cursor?: string) =>
    canvas.disabled || canvas.error
      ? 'not-allowed'
      : canvas.working
      ? 'progress'
      : cursor || 'default';
  const boxShadow = (shadow = 0) => {
    if (
      (canvas.variant === 'plain' && !canvas.elevate) ||
      canvas.flat ||
      canvas.disabled ||
      canvas.error
    ) {
      return 'none';
    }
    const elevation = theme.decorators.elevation;
    if (canvas.elevate) {
      if (canvas.variant === 'plain') return elevation[1];
      else return elevation[shadow + 1];
    } else return elevation[shadow + 0];
  };

  return {
    cursor,
    boxShadow,
    color: (status) => variant(status, 'color'),
    borderColor: (status) => variant(status, 'borderColor'),
    backgroundColor: (status) => variant(status, 'backgroundColor'),
  };
};

export const frameCSS = (frame: FrameStylesResult) => css`
  width: ${frame.width()};
  height: ${frame.height()};
  margin: ${frame.margin()};
  display: ${frame.display()};
  padding: ${frame.padding()};
  font-size: ${frame.fontSize()};
  border-radius: ${frame.borderRadius()};
`;
export const fiberFrameStyles = (newFiber: Partial<LumbyFiber>): FrameStylesResult => {
  const {
    frame,
    fiber: { theme },
  } = lumbyFiber(newFiber);

  const height = (height?: string | number) => {
    if (frame.full !== 'none') return frame.full === 'screen' ? '100vh' : '100%';
    return height ? rem(height) : 'fit-content';
  };
  const width = (width?: string | number) => {
    if (frame.full !== 'none') return frame.full === 'screen' ? '100vw' : '100%';
    if (frame.block) return '100%';
    return width ? rem(width) : 'fit-content';
  };
  const spacing = (on: 'margins' | 'paddings', size?: ThemeSize) => {
    const space = (on: ThemeSize) => rem(theme.size.spacing[size || on]);
    const calc = (space: number | string) =>
      typeof space === 'number'
        ? `${space / 2}px ${space + (space / space + 2)}px`
        : `calc(${space} / 2) calc(${space} + (${space} + (${space} / ${space} + 2)))`;

    if (on === 'margins') {
      if (frame.margins) return space(frame.margins);
    } else {
      if (frame.paddings) return space(frame.paddings);
    }

    return calc(theme.size.spacing[size || frame.size]);
  };

  const display = (display: Property.Display = 'flex') =>
    frame.show === false || frame.size === 'none' ? 'none' : display;

  const borderRadius = (corners?: ThemeSize | 'disk') =>
    frame.corners === 'disk'
      ? '100%'
      : frame.corners === 'none'
      ? 'none'
      : rem(theme.decorators.borderRadius[corners || frame.corners]);

  const fontSize = (size?: ThemeSize) => rem(theme.size.fontSize[size || frame.size]);

  return {
    width,
    height,
    display,
    fontSize,
    borderRadius,
    margin: (size) => spacing('margins', size),
    padding: (size) => spacing('paddings', size),
  };
};
