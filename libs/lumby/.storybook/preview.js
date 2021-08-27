import LumbyProvider from '../src';
import { LumbyTheme } from '../src/lib/core';

const theme = new LumbyTheme();

export const decorators = [
  (Story) => (
    <LumbyProvider theme={theme}>
      <Story />
    </LumbyProvider>
  ),
];
