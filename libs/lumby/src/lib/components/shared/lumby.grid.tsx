import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { LumbyBox } from './lumby.box';
import { lumbyFiber } from '../../core';
import { GridGap, GridContent, GridTypes, LumbyExtends } from '../../core/lumby.types';
import { rem } from 'polished';

export interface GridProps extends LumbyExtends<'div'> {
  gap: GridGap;
  grid: GridTypes;
  content: GridContent;
}

const StyledGrid = styled(LumbyBox)<Partial<GridProps>>((props) => {
  const { canvas, fiber } = lumbyFiber(props);
  const styles = canvas();

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

  return css({
    gap: styles.padding(),
    display: styles.display('grid'),
    gridTemplateRows: props.grid && template('x', props.grid),
    gridTemplateColumns: props.grid && template('y', props.grid),
  });
});

export const LumbyGrid: React.FC<Partial<GridProps>> = ({ children, ...props }) => {
  return (
    <StyledGrid
      block
      margins="none"
      variant="plain"
      content={[-1, 0]}
      grid={['repeat', 150]}
      {...props}
    >
      {children}
    </StyledGrid>
  );
};
