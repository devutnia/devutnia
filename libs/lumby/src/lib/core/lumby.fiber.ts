import deepmerge from 'deepmerge';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import isPropValid from '@emotion/is-prop-valid';

import { lumbyTheme } from './lumby.theme';
import { useFiber } from './use.fiber.hook';
import { LumbySize, LumbySheet, LumbyVariant } from './lumby.types';

export class LumbyFiber {
  size: LumbySize = 'md';
  margins: LumbySize = 'md';
  variant: LumbyVariant = 'default';
  corners: LumbySize | 'disk' | 'none' = 'md';
  flat = false;
  block = false;
  error = false;
  elevate = false;
  working = false;
  disabled = false;

  theme = lumbyTheme();

  fid?: string | undefined = undefined;
  stylesheet?: LumbySheet | undefined = undefined;
}

const baseFiber = new LumbyFiber();
const fiberTips = Object.keys(baseFiber) as (keyof LumbyFiber)[];

export function lumbyFiber(newFiber: Partial<LumbyFiber>) {
  const newTips = newFiber && (Object.keys(newFiber) as (keyof LumbyFiber)[]);

  if (newFiber && newTips) {
    return newTips.reduce((fiber, tip) => {
      if (fiberTips.includes(tip)) {
        if (tip === 'theme' && newFiber?.theme) {
          fiber.theme = deepmerge(baseFiber.theme, newFiber.theme);
        } else if (newFiber?.[tip]) fiber[tip] = newFiber[tip] as never;
      }
      return fiber;
    }, {} as Partial<LumbyFiber>);
  }
  return newFiber;
}

export const FiberLayer = styled('div', {
  label: 'lumby-fiber',
  shouldForwardProp: isPropValid,
})<Partial<LumbyFiber>>((props) => {
  const { styles, fiber } = useFiber(props?.fid, props);

  return css({
    border: '2px solid',
    transition: 'all .1s ease-in-out',
    ...styles.size(),
    ...styles.block(),
    ...styles.cursor(),
    ...styles.corners(),
    ...styles.elevate(),
    ...styles.variant(),
    ...fiber?.stylesheet,
    '&:hover': { ...styles.variant('hover') },
    '&:focus': { ...styles.variant('focus') },
    '&:active': { ...styles.variant('active') },
  });
});
