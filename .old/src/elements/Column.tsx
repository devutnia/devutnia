import styled from '@emotion/styled';

import { Sheet } from './Sheet';
import type { ColumnProps } from '../../types.d';

export const Column = styled(Sheet)<ColumnProps>((props) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: props?.gap || 'initial',
  alignItems: props?.align || 'initial',
  justifyContent: props?.justify || 'initial',
}));
