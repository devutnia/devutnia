import { rem } from 'polished';
import { Property } from 'csstype';

import { LumbyFiber } from './lumby.fiber';
import { ThemeSize, GridContent, ThemeStatus, StylesheetResult } from './lumby.types.d';

export const canvasStylesheet = (newFiber: LumbyFiber): StylesheetResult => {
  const fiber = newFiber || new LumbyFiber();
  const { decorators, variants, size } = fiber.theme;

  const borderRadius = (corners?: ThemeSize | 'disk' | 'size') =>
    fiber.corners === 'disk'
      ? '100%'
      : fiber.corners === 'size'
      ? rem(decorators.borderRadius[fiber.size])
      : rem(decorators.borderRadius[(corners || fiber.corners) as never]);

  const variant = (
    status: ThemeStatus = 'default',
    style: 'backgroundColor' | 'color' | 'borderColor'
  ) => {
    const selected = variants[fiber.variant];
    // order of error | disabled | working is important
    if (fiber.error) return selected.error[style] as string;
    if (fiber.disabled) return selected.disabled[style] as string;
    if (fiber.working) return selected.working[style] as string;
    return selected?.[status][style] as string;
  };

  const cursor = (cursor?: string) =>
    fiber.disabled || fiber.error
      ? 'not-allowed'
      : fiber.working
      ? 'progress'
      : cursor || 'default';

  const boxShadow = (elevation = 0) => {
    if (
      (fiber.variant === 'plain' && !fiber.elevate) ||
      fiber.flat ||
      fiber.disabled ||
      fiber.error
    ) {
      return 'none';
    }
    if (fiber.elevate) {
      if (fiber.variant === 'plain') return decorators.elevation[1];
      else return decorators.elevation[elevation + 1];
    } else return decorators.elevation[elevation + 0];
  };

  const spacing = (on: 'margins' | 'paddings', newSize?: ThemeSize | 'size') => {
    const calc = (space: number | string) =>
      typeof space === 'number'
        ? `${space / 2}px ${space + (space / space + 2)}px`
        : `calc(${space} / 2) calc(${space} + (${space} + (${space} / ${space} + 2)))`;

    const space = (on: ThemeSize | 'size') =>
      rem(fiber.theme.size.spacing[(newSize as never) || on]);

    if (on === 'margins' && fiber.margins !== 'size') {
      if (fiber.margins) return space(fiber.margins);
    }
    if (on === 'paddings') {
      if (fiber.paddings && fiber.paddings !== 'size') return space(fiber.paddings);
      if (fiber.corners === 'disk') return space(fiber.size);
    }

    return calc(size.spacing[(newSize as never) || fiber.size]);
  };

  const fontSize = (newSize?: ThemeSize) => rem(size.fontSize[newSize || fiber.size]);

  const placeItems = <T extends GridContent[0]>(axis: 'x' | 'y', n?: T) => {
    const isX = axis === 'x';
    const pos = n || fiber.content[isX ? 0 : 1];
    const mindAxis = (pos?: any) => (isX ? pos < 0 : pos > 0);
    return pos === 8
      ? 'stretch'
      : pos === 0 || fiber.corners === 'disk'
      ? 'center'
      : !pos || mindAxis(pos)
      ? 'flex-start'
      : 'flex-end';
  };

  const height = (height?: string | number) => {
    if (fiber.full !== 'none') return fiber.full === 'screen' ? '100vh' : '100%';
    return height ? rem(height) : 'fit-content';
  };

  const width = (width?: string | number) => {
    if (fiber.full !== 'none') return fiber.full === 'screen' ? '100vw' : '100%';
    if (fiber.block) return '100%';
    return width ? rem(width) : 'fit-content';
  };

  const display = (display: Property.Display = 'flex') =>
    fiber.show === false || fiber.size === 'none' ? 'none' : display;

  return {
    width,
    height,
    cursor,
    display,
    fontSize,
    boxShadow,
    borderRadius,
    alignItems: (n) => placeItems('y', n),
    alignContent: (n) => placeItems('x', n),
    justifyContent: (n) => placeItems('x', n),
    margin: (size) => spacing('margins', size),
    color: (status) => variant(status, 'color'),
    padding: (size) => spacing('paddings', size),
    borderColor: (status) => variant(status, 'borderColor'),
    backgroundColor: (status) => variant(status, 'backgroundColor'),
  };
};
