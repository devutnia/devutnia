import deepmerge from 'deepmerge';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import isPropValid from '@emotion/is-prop-valid';

import { lumbyTheme } from './lumby.theme';
import { canvasCSS, fiberCanvasStyles, fiberFrameStyles, frameCSS } from './lumby.utils';
import { ThemeSize, ThemeVariant, FiberStylesheetProps } from './lumby.types.d';

export class LumbyFiberFrame {
  show = true;
  block = false;
  size: ThemeSize = 'md';
  margins?: ThemeSize = undefined;
  paddings?: ThemeSize = undefined;
  corners: ThemeSize | 'disk' = 'md';
  full: 'page' | 'screen' | 'none' = 'none';
}
export class LumbyFiberCanvas extends LumbyFiberFrame {
  flat = false;
  error = false;
  elevate = false;
  working = false;
  disabled = false;
  variant: ThemeVariant = 'plain';
}
export class LumbyFiber extends LumbyFiberCanvas {
  theme = lumbyTheme();
  fid?: string = undefined;
  stylesheet?: (props: FiberStylesheetProps) => unknown;
}

export function lumbyFiber(
  newFiber: Partial<LumbyFiber>,
  oldFiber: Partial<LumbyFiber> = new LumbyFiber()
) {
  const fiber = deepmerge(oldFiber, newFiber);
  const { fid, stylesheet, theme, ...canvas } = fiber;
  const { disabled, working, elevate, error, variant, ...frame } = canvas;
  const styles = {
    frame: (newFiber?: Partial<LumbyFiber>) => fiberFrameStyles(newFiber || fiber),
    canvas: (newFiber?: Partial<LumbyFiber>) => fiberCanvasStyles(newFiber || fiber),
  };

  return { fiber, frame, canvas, styles };
}

export const FiberCanvas = styled('div', {
  label: 'canvas',
  shouldForwardProp: isPropValid,
})<Partial<LumbyFiber>>((props) => {
  const { styles } = lumbyFiber(props);

  return css`
    ${canvasCSS(styles.canvas())};
    ${frameCSS(styles.frame())};
  `;
});

export const FiberFrame = styled('div', {
  label: 'frame',
  shouldForwardProp: isPropValid,
})<Partial<LumbyFiber>>((props) => {
  const { styles } = lumbyFiber(props);

  return css`
    position: relative;
    ${frameCSS(styles.frame())};
  `;
});
