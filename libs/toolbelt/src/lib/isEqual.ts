import { isDeepStrictEqual } from 'util';

export const isEqual = <T>(a: T, b: T) => isDeepStrictEqual(a, b);
