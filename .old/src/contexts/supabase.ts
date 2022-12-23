import * as React from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase_url = 'https://joiejdenewszlsdiswfm.supabase.co';
const supabase_key = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpvaWVqZGVuZXdzemxzZGlzd2ZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzExOTU3MjUsImV4cCI6MTk4Njc3MTcyNX0.aKHnQ8bcy0NVV6ZKfTo6UOCnx65hyaULEQqGRsXjnAc`;

const supabase_client = createClient(supabase_url, supabase_key);

const supabase = {
  client: supabase_client,
  context: React.createContext<typeof supabase_client>(undefined as never),
};

export { supabase };
