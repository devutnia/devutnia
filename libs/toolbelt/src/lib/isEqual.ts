/* eslint-disable @typescript-eslint/no-explicit-any */

import { deepStrictEqual } from 'assert';

export const isEqual = <T>(a: T, b: T) => {
  try {
    deepStrictEqual(a, b);
    return true;
  } catch {
    return false;
  }
};
