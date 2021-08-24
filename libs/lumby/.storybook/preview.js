import LumbyProvider, { LumbyTheme } from '../src';

const theme = new LumbyTheme();

export const decorators = [
  (Story) => (
    <LumbyProvider theme={theme}>
      <Story />
    </LumbyProvider>
  ),
];
