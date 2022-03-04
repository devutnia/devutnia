// https://gist.github.com/jsjain/a2ba5d40f20e19f734a53c0aad937fbb

export const isEqual = <T extends Record<string | keyof T, T[keyof T]>>(
  a: T,
  b: T
): boolean => {
  if (a === b) return true;

  if ((a === undefined || b === undefined || a === null || b === null) && (a || b)) {
    return false;
  }
  if (typeof a !== typeof b) return false;

  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;

    let equal = true;
    for (let i = 0; i < a.length; i++) {
      if (!isEqual(a[i], b[i])) {
        equal = false;
        break;
      }
    }
    return equal;
  }
  if (typeof a === 'object') {
    let equal = true;
    const fKeys = Object.keys(a);
    const sKeys = Object.keys(b);
    if (fKeys.length !== sKeys.length) return false;

    for (let i = 0; i < fKeys.length; i++) {
      if (a[fKeys[i]] && b[fKeys[i]]) {
        if (a[fKeys[i]] === b[fKeys[i]]) continue; // eslint-disable-line

        if (
          a[fKeys[i]] &&
          (Array.isArray(a[fKeys[i]]) || typeof a[fKeys[i]] === 'object')
        ) {
          equal = isEqual(a[fKeys[i]], b[fKeys[i]]);
          if (!equal) break;
        } else if (a[fKeys[i]] !== b[fKeys[i]]) {
          equal = false;
          break;
        }
      } else if ((a[fKeys[i]] && !b[fKeys[i]]) || (!a[fKeys[i]] && b[fKeys[i]])) {
        equal = false;
        break;
      }
    }
    return equal;
  }
  return a === b;
};
