import { z } from 'zod';

export const config_schema = z.object({
  dev_key: z.string().optional(),
});
