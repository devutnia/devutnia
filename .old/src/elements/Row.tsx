import styled from '@emotion/styled';

import { Sheet } from './Sheet';
import type { RowProps } from '../../types.d';

export const Row = styled(Sheet)<RowProps>((props) => ({
  display: 'flex',
  flexDirection: 'row',
  gap: props?.gap || 'initial',
  alignItems: props?.align || 'initial',
  justifyContent: props?.justify || 'initial',
}));
