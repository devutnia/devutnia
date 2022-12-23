import * as React from 'react';
import { Global, ThemeProvider, Theme } from '@emotion/react';

import { motif } from '../contexts';
import type { MotifScheme } from '../../types';

export const MotifProvider = (props?: {
  motif?: Theme;
  children?: React.ReactNode;
  globalStyles?: MotifScheme['sheet'];
}) => {
  const theme = React.useRef(props?.motif || motif.theme).current;

  return (
    <motif.context.Provider value={theme}>
      <Global styles={props?.globalStyles} />
      <ThemeProvider theme={theme}>{props?.children}</ThemeProvider>
    </motif.context.Provider>
  );
};
