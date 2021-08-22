import { useMemo } from 'react';
import { Global, ThemeProvider, Interpolation } from '@emotion/react';

import { useLumby } from '../core';
import { lumbyTheme, LumbyTheme } from './lumby.theme';

export interface LumbyProviderProps {
  theme?: Partial<LumbyTheme>;
  globalStyles?: Interpolation<LumbyTheme>[];
}

export const LumbyProvider: React.FC<LumbyProviderProps> = ({
  theme,
  children,
  globalStyles,
}) => {
  const lumby = useLumby(lumbyTheme(theme));

  const renderGlobals = useMemo(
    () => globalStyles?.map((style, i) => <Global key={i} styles={style} />),
    [globalStyles]
  );

  return (
    <ThemeProvider theme={lumby.theme}>
      {renderGlobals}
      {children}
    </ThemeProvider>
  );
};
