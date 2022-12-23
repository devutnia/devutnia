import * as React from 'react';

import { motif } from '../contexts';

export function useMotif() {
  const ctx = React.useContext(motif.context);

  if (typeof ctx === 'undefined') {
    throw Error(`"useMotif" should be used inside "MotifProvider"`);
  }

  return ctx;
}
