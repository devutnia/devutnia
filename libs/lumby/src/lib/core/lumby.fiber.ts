import deepmerge from 'deepmerge';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import isPropValid from '@emotion/is-prop-valid';

import { lumbyTheme } from './lumby.theme';
import { canvasStylesheet } from './lumby.utils';
import { useLumbyFiber } from '.';
import {
  ThemeSize,
  GridContent,
  ThemeVariant,
  StylesheetResult,
  FiberCanvasProps,
} from './lumby.types.d';

export class LumbyCanvas {
  show = true;
  flat = false;
  block = false;
  error = false;
  elevate = false;
  working = false;
  disabled = false;
  theme = lumbyTheme();
  size: ThemeSize = 'md';
  content: GridContent = [-1, 0];
  variant: ThemeVariant = 'default';
  margins: ThemeSize | 'size' = 'size';
  paddings: ThemeSize | 'size' = 'size';
  full: 'page' | 'screen' | 'none' = 'none';
  corners: ThemeSize | 'disk' | 'size' = 'size';
}
export class LumbyFiber extends LumbyCanvas {
  fid?: string = undefined;
}

export function lumbyFiber(
  newFiber: Partial<LumbyFiber>,
  oldFiber: Partial<LumbyFiber> = new LumbyFiber()
) {
  const fiber = deepmerge(oldFiber, newFiber);
  // dirty hack to prevent deepmerge from adding items to `content` prop tuple
  fiber.content = newFiber.content as never;
  return { fiber, canvas: () => canvasStylesheet(fiber) };
}

export const FiberLayer = styled('div', {
  label: 'fiber-canvas',
  shouldForwardProp: isPropValid,
})<Partial<FiberCanvasProps>>((props) => {
  const fiber = useLumbyFiber(props.fid, props);

  const styles = {} as any;
  const canvas = fiber.canvas();

  // loop styling attributes and apply canvas styling to existing ones
  (Object.keys(canvas) as (keyof StylesheetResult)[]).forEach((attr) => {
    if (canvas[attr]) styles[attr] = canvas[attr]();
  });

  return css({
    ...styles,
    ...(() => {
      if (fiber.fiber.corners === 'disk') {
        return {
          minWidth: 10,
          minHeight: 10,
          lineHeight: 1,
          textAlign: 'center',
          width: 'fit-content',
          whiteSpace: 'nowrap',
          height: 'fit-content',
        };
      } else return undefined;
    })(),

    '&:before': (() => {
      if (fiber.fiber.corners === 'disk') {
        return {
          height: 0,
          content: '""',
          paddingTop: '100%',
          verticalAlign: 'middle',
        };
      } else return undefined;
    })(),

    '&:hover': {
      color: canvas.color('hover'),
      boxShadow: canvas.boxShadow(1),
      borderColor: canvas.borderColor('hover'),
      backgroundColor: canvas.backgroundColor('hover'),
    },

    '&:focus': {
      color: canvas.color('focus'),
      boxShadow: canvas.boxShadow(1),
      borderColor: canvas.borderColor('focus'),
      backgroundColor: canvas.backgroundColor('focus'),
    },

    '&:active': {
      color: canvas.color('active'),
      borderColor: canvas.borderColor('active'),
      backgroundColor: canvas.backgroundColor('active'),
    },
  });
});
