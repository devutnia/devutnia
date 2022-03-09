/* eslint-disable @typescript-eslint/no-var-requires */

const equal = require('lodash.isequal');

export const isEqual = <T>(a: T, b: T) => equal(a, b);
