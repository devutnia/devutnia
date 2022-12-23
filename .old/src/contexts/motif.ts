import * as React from 'react';
import { Theme } from '@emotion/react';

import { createMotif } from '../utils';

const motif = {
  theme: createMotif(),
  context: React.createContext<Theme>(undefined as never),
};

export { motif };
