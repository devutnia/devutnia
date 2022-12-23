import * as React from 'react';
import styled from '@emotion/styled';

import { Sheet } from './Sheet';
import type { RowProps } from '../../types.d';

const StyledInput = styled(Sheet)().withComponent('input');

export const Input: typeof StyledInput = (props) => {
  const [value, setValue] = React.useState();

  return <StyledInput {...props} />;
};
