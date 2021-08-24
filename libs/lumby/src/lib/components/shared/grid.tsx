import { rem } from 'polished';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { LumbyBox } from './box';
import { FiberLayer, fiberStyles, gridStyles, LumbyFiber } from '../../core';
import {
  GridGap,
  GridTypes,
  ThemeSheet,
  GridContent,
  LumbyExtends,
} from '../../core/lumby.types.d';

export interface GridProps extends LumbyExtends<'div'> {
  gap: GridGap;
  grid: GridTypes;
  content: GridContent;
}

const StyledLumbyBox = styled(LumbyBox)<Partial<GridProps>>((props) => {
  const styles = fiberStyles(props);

  return css({
    width: styles.width(),
    height: styles.height(),
    boxShadow: styles.boxShadow(0),
    padding: styles.padding(props?.size),
    '&:hover': {
      boxShadow: styles.boxShadow(),
    },
  });
});

const StyledGrid = styled(FiberLayer)<Partial<GridProps>>((props) => {
  const fiber = fiberStyles(props);
  const stylesheet = {
    position: 'relative',
  } as ThemeSheet;

  if (props?.grid) {
    const grid = gridStyles(props);
    stylesheet['display'] = grid.display('grid');
    stylesheet['gridTemplateRows'] = grid.gridTemplateRows();
    stylesheet['alignItems'] = grid.alignItems(props.content?.[1]);
    stylesheet['gridTemplateColumns'] = grid.gridTemplateColumns();
    stylesheet['justifyItems'] = grid.justifyItems(props.content?.[0]);
  }

  if (props?.gap) stylesheet['gap'] = `${rem(props.gap[0])} ${rem(props.gap[1])}`;

  return css({
    ...stylesheet,
    width: fiber.width(),
    cursor: fiber.cursor(),
  });
});

export const LumbyGrid: React.FC<Partial<GridProps>> = ({ children, ...props }) => {
  const removeProps = (props: Partial<GridProps>) => {
    const propsCopy = { ...props } as Partial<GridProps>;
    const fiberKeys = Object.keys(new LumbyFiber()) as (keyof LumbyFiber)[];
    fiberKeys.forEach((key) => {
      if (typeof propsCopy[key] === 'boolean') delete propsCopy[key];
    });
    console.log('propsCopy', propsCopy);
    return propsCopy;
  };

  return (
    <StyledLumbyBox {...props}>
      <StyledGrid
        // variant="plain"
        // flat={props.flat}
        // block={props.block}
        // content={props.content}
        // gap={props.gap || [5, 10]}
        // margins={props.margins || 'none'}
        // paddings={props.paddings || 'none'}
        // grid={props.grid || ['repeat', 200]}
        // size={props.size}
        // corners={props.corners}
        {...props}
      >
        {children}
      </StyledGrid>
    </StyledLumbyBox>
  );
};
