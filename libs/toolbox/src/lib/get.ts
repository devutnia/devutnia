// https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_get

export const get = <T>(obj: T, path: string | string[], defaultValue?: T) => {
  const travel = (regexp: RegExp) =>
    String.prototype.split
      .call(path, regexp)
      .filter(Boolean)
      .reduce(
        (res, key) => (res !== null && res !== undefined ? res[key as never] : res),
        obj
      );
  const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/);
  return result === undefined || result === obj ? defaultValue : result;
};
