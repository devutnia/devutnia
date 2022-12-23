import React from 'react';
import { User, Session, AuthError } from '@supabase/supabase-js';

import { useSupabase } from './useSupabase';

export interface AuthData {
  user: User | null;
  session: Session | null;
}

export function useAuthentication() {
  const supabase = useSupabase();

  const [data, setData] = React.useState<AuthData>();
  const [error, setError] = React.useState<AuthError | null>();

  const register = React.useCallback(
    async (phone: string, password: string) => {
      const { data, error } = await supabase.auth.signUp({
        phone,
        password,
      });
      if (!error) setData(data);
      else setError(error);
    },
    [supabase.auth]
  );

  const subscribe = React.useCallback(
    async (email: string, password: string) => {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (!error) setData(data);
      else setError(error);
    },
    [supabase.auth]
  );

  const enter = React.useCallback(
    async (phone: string, password: string) => {
      const { data, error } = await supabase.auth.signInWithPassword({
        phone,
        password,
      });
      if (!error) setData(data);
      else setError(error);
    },
    [supabase.auth]
  );

  const leave = React.useCallback(
    async (phone: string, password: string) => {
      const { error } = await supabase.auth.signOut();
      if (!error) setData(undefined);
      else setError(error);
    },
    [supabase.auth]
  );

  const refresh = React.useCallback(async () => {
    const user = await supabase.auth.getUser();
    const session = await supabase.auth.getSession();
    if (user.error || session.error) setError(user.error || session.error);
    else setData({ session: session.data.session, user: user.data.user });
  }, [supabase.auth]);

  return { register, subscribe, enter, leave, refresh, data, error };
}
