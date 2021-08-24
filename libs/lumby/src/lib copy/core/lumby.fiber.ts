import deepmerge from 'deepmerge';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import isPropValid from '@emotion/is-prop-valid';

import { lumbyTheme } from './lumby.theme';
import { useLumbyFiber } from './lumby.fiber.hook';
import { FiberStylesheetProps, ThemeSize, ThemeVariant } from './lumby.types.d';

export class LumbyFiber {
  show = true;
  flat = false;
  block = false;
  error = false;
  elevate = false;
  working = false;
  disabled = false;
  theme = lumbyTheme();
  size: ThemeSize = 'md';
  variant: ThemeVariant = 'default';
  corners: ThemeSize | 'disk' = 'md';
  full: 'page' | 'screen' | 'none' = 'none';

  margins?: ThemeSize = undefined;
  paddings?: ThemeSize = undefined;
  fid?: string | undefined = undefined;
  stylesheet?: (props: FiberStylesheetProps) => ReturnType<typeof css> | undefined =
    undefined;
}

export const FiberLayer = styled('div', {
  label: 'lumby-fiber',
  shouldForwardProp: isPropValid,
})<Partial<LumbyFiber>>((props) => {
  const { styles } = useLumbyFiber(props?.fid, props);

  return css({
    border: '2px solid',
    transition: 'all .07s ease-in',

    color: styles.color(),
    width: styles.width(),
    cursor: styles.cursor(),
    height: styles.height(),
    margin: styles.margin(),
    display: styles.display(),
    padding: styles.padding(),
    fontSize: styles.fontSize(),
    boxShadow: styles.boxShadow(),
    borderColor: styles.borderColor(),
    borderRadius: styles.borderRadius(),
    backgroundColor: styles.backgroundColor(),

    '&:hover': {
      color: styles.color('hover'),
      boxShadow: styles.boxShadow(1),
      borderColor: styles.borderColor('hover'),
      backgroundColor: styles.backgroundColor('hover'),
    },

    '&:focus': {
      color: styles.color('focus'),
      boxShadow: styles.boxShadow(1),
      borderColor: styles.borderColor('focus'),
      backgroundColor: styles.backgroundColor('focus'),
    },

    '&:active': {
      color: styles.color('active'),
      borderColor: styles.borderColor('active'),
      backgroundColor: styles.backgroundColor('active'),
    },
  });
});

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
