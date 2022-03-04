import { toPaths } from './toPaths';
import { fromPaths } from './fromPaths';

const reapply = <T>(o: T, n: ((data: T) => void) | Partial<T>) => {
  if (typeof n === 'function') n(o);
  else if (Array.isArray(o)) o = o.concat(n) as never;
  else if (typeof n !== 'object') o = n;
  else o = Object.assign(o, n);
  return o;
};

export const merge = {
  arrays: <T extends unknown[]>(a: T, n: ((data: T) => void) | T) => reapply(a, n),
  objects: <T extends object>(o: T, n: ((data: T) => void) | Partial<T>) => {
    return fromPaths(reapply(toPaths(o), toPaths(reapply(o, n))));
  },
};
