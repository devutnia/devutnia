import { z } from 'zod';

export const devKeyPrint = z.string().uuid().optional();

export const yardPrint = z.array(z.string()).optional();

export const configPrint = z.object({
  dev_key: devKeyPrint,
  yards: yardPrint,
});
