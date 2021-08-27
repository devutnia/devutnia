import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { lumbyFiber, FiberLayer } from '../../core';
import { GridContent, LumbyExtends } from '../../core/lumby.types';

export interface BoxProps extends LumbyExtends<'div'> {
  content: GridContent;
}

const StyledBox = styled(FiberLayer)<Partial<BoxProps>>((props) => {
  const { canvas, fiber } = lumbyFiber(props);
  const styles = canvas();

  return css({
    border: '2px solid',
    position: 'relative',
    borderColor: styles.borderColor(),
    alignItems: styles.alignItems(props?.content?.[1]),
    alignContent: styles.alignContent(props?.content?.[0]),
    justifyContent: styles.justifyContent(props?.content?.[0]),
    '&:after': {
      top: 0,
      width: '100%',
      content: '""',
      position: 'absolute',
      cursor: styles.cursor(),
      backgroundColor: 'transparent',
      borderRadius: styles.borderRadius(),
      height: fiber.disabled || fiber.error || fiber.working ? '100%' : '0%',
    },
  });
});

export const LumbyBox: React.FC<Partial<BoxProps>> = ({ children, ...props }) => {
  console.info('LumbyBox props', props);
  return (
    <StyledBox variant={'plain'} content={[0, 1]} margins={'none'} {...props}>
      {children}
    </StyledBox>
  );
};
