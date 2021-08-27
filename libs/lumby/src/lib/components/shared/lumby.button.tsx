import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { LumbyBox } from './lumby.box';
import { lumbyFiber } from '../../core';
import { LumbyExtends } from '../../core/lumby.types';

export interface ButtonProps extends LumbyExtends<'button'> {
  icon?: React.ReactElement;
}

const StyledButton = styled(LumbyBox)<Partial<ButtonProps>>((props) => {
  const { canvas, fiber } = lumbyFiber(props);
  const styles = canvas();

  return css({
    cursor: styles.cursor('pointer'),
  });
});

export const LumbyButton: React.FC<Partial<ButtonProps>> = ({ children, ...props }) => {
  console.info('LumbyBox props', props);
  return (
    <StyledButton content={[0, 0]} {...props} as="button">
      {children}
    </StyledButton>
  );
};
