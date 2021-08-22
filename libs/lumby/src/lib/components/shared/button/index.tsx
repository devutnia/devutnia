import styled from '@emotion/styled';

import { fiberStylesheet, FiberLayer } from '../../../core';

const StyledButton = styled(FiberLayer)((props) => {
  const styles = fiberStylesheet(props);
  return {
    cursor: styles.cursor().cursor || 'pointer',
  };
});
export const SharedButton = StyledButton.withComponent('button');
