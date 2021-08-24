import { rem } from 'polished';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { FiberLayer, fiberStyles } from '../../core';
import { GridContent, LumbyExtends } from '../../core/lumby.types.d';

export interface BoxProps extends LumbyExtends<'div'> {
  content: GridContent;
}

const StyledBox = styled(FiberLayer)<Partial<BoxProps>>((props) => {
  const styles = fiberStyles(props);

  return css({
    position: 'relative',
    display: styles.display(),
    alignContent: styles.alignContent(props.content?.[1]),
    justifyContent: styles.justifyContent(props.content?.[0]),
  });
});

export const LumbyBox: React.FC<Partial<BoxProps>> = ({ children, ...props }) => {
  return (
    <StyledBox variant="plain" margins="none" content={[0, 0]} {...props}>
      {children}
    </StyledBox>
  );
};
