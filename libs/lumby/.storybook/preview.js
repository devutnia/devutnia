import { css } from '@emotion/react';

import LumbyProvider, { LumbyTheme } from '../src';

const theme = new LumbyTheme();
const globalStyles = css`
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
    transition: background-color 0.2s ease-in;
  }
`;

export const decorators = [
  (Story) => (
    <LumbyProvider theme={theme} globalStyles={[globalStyles]}>
      <Story />
    </LumbyProvider>
  ),
];
