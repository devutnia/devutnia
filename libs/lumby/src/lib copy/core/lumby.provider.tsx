import { useMemo } from 'react';
import { Global, ThemeProvider, Interpolation, css } from '@emotion/react';

import { useLumbyTheme, lumbyTheme, LumbyTheme } from '../core';

export interface LumbyProviderProps {
  theme?: Partial<LumbyTheme>;
  globalStyles?: Interpolation<LumbyTheme>[];
}

const globalLumbyStyles = (theme: LumbyTheme) => css`
  *,
  *:active,
  *:focus-visible {
    box-sizing: border-box;
    border-style: none;
    outline: none;
  }
  body.light-mode {
    color: ${theme.colors.dark};
    background-color: ${theme.colors.light};
    transition: background-color 0.1s ease-out;
  }
  body.dark-mode {
    color: ${theme.colors.light};
    background-color: ${theme.colors.dark};
    transition: background-color 0.1s ease-in;
  }
`;

export const LumbyProvider: React.FC<LumbyProviderProps> = ({
  theme,
  children,
  globalStyles,
}) => {
  const lumby = useLumbyTheme(lumbyTheme(theme));

  const renderGlobals = useMemo(
    () => globalStyles?.map((style, i) => <Global key={i} styles={style} />),
    [globalStyles]
  );

  return (
    <ThemeProvider theme={lumby.theme}>
      <Global styles={globalLumbyStyles(lumby.theme)} />
      {renderGlobals}
      {children}
    </ThemeProvider>
  );
};
