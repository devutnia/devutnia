import { isEmpty } from '.';

/**
 * `get` returns the value at the end of the provided path
 * @param {Object} o - object to traverse
 * @param {String | String[]} p - string or string array with the path
 * @param {Object} [d] - optional default object that gets returned if something fails
 * @returns
 */
export const get = <T extends object>(o: T, p: string | string[], d?: T) => {
  if (isEmpty(o) || !p || p === '' || p.length === 0 || p.includes('')) return o;
  let s = Array.isArray(p) ? p : [p.split('.')];
  let i = 0;
  const l = s.length;
  while (!isEmpty(o) && i < l) o = o[s[i++] as never];
  s = undefined as never;
  return (i && i === l ? o : d) as T;
};
