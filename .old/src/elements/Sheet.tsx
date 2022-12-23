import styled from '@emotion/styled';

import { toggleSheet } from '../utils';
import type { SheetToggles } from '../../types.d';

export const Sheet = styled.div<SheetToggles>(({ theme, children, ...toggles }) => {
  const sheet = toggleSheet(theme, toggles);

  return {
    ...sheet,
    ...theme?.scheme?.[toggles?.scheme || 'base']?.sheet,
  };
});
