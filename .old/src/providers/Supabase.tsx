import * as React from 'react';

import { supabase } from '../contexts';

export const SupabaseProvider = (props?: { children?: React.ReactNode }) => {
  const supabase_ctx = React.useRef(supabase.client).current;

  return (
    <supabase.context.Provider value={supabase_ctx}>
      {props?.children}
    </supabase.context.Provider>
  );
};
