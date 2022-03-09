import { unflatten } from 'flat';
interface UnflattenOptions {
  delimiter?: string | undefined;
  object?: boolean | undefined;
  overwrite?: boolean | undefined;
  transformKey?: ((key: string) => string) | undefined;
}
export const fromPaths = <T>(o: T, opt?: UnflattenOptions) => unflatten(o, opt) as T;
