/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * https://stackoverflow.com/questions/54733539/javascript-implementation-of-lodash-set-method
 */

export const set = <T>(obj: T, path: string | string[], value: any) => {
  if (Object(obj) !== obj) return obj;
  if (!Array.isArray(path)) path = path.toString().match(/[^.[\]]+/g) || [];
  path
    .slice(0, -1)
    .reduce(
      (a, c, i) =>
        Object(a[c]) === a[c]
          ? a[c]
          : (a[c] = Math.abs(path[i + 1] as never) >> 0 === +path[i + 1] ? [] : {}),
      obj as typeof value
    )[path[path.length - 1]] = value;
  return obj;
};
