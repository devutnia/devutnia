import * as React from 'react';

import { supabase } from '../contexts';

export function useSupabase() {
  const ctx = React.useContext(supabase.context);

  if (typeof ctx === 'undefined') {
    throw Error(`"useSupabase" should be used inside "SupabaseProvider"`);
  }

  return ctx;
}
