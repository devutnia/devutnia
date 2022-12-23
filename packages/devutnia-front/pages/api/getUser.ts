// Creating a new supabase server client object (e.g. in API route):
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import type { NextApiRequest, NextApiResponse } from 'next';

const getUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const supabaseServerClient = createServerSupabaseClient({ req, res });
  const { data, error } = await supabaseServerClient.auth.getUser();

  if (error) res.status(400).json(error);
  res.status(200).json(data.user);
};

export default getUser;
