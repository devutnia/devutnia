import styled from '@emotion/styled';

import { FiberLayer } from '../../../core/lumby.fiber';

const StyledButton = styled(FiberLayer)`
  cursor: pointer;
`;
export const SharedButton = StyledButton.withComponent('button');
