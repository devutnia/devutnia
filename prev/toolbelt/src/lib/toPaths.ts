import { flatten } from 'flat';
interface FlattenOptions {
  delimiter?: string | undefined;
  safe?: boolean | undefined;
  maxDepth?: number | undefined;
  transformKey?: ((key: string) => string) | undefined;
}
export const toPaths = <T>(o: T, opt?: FlattenOptions) => flatten(o, opt) as T;
