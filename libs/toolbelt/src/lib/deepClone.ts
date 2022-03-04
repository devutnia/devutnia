// https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore/issues/121#issuecomment-789936075

export const deepClone = <T extends object>(o: T): T => {
  if (Array.isArray(o)) return o.map(deepClone) as never;
  if (typeof o !== 'object') return o;
  return Object.fromEntries(Object.entries(o).map(([k, v]) => [k, deepClone(v)])) as T;
};
