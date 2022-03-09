import { isEqual } from '../src/lib/isEqual';

describe(`Test isEqual`, () => {
  it(`should check if values are equal`, () => {
    expect(isEqual({ a: 'a', b: 'b' }, { a: 'a', b: 'b' })).toBe(true);
  });
  it(`should check if values are different`, () => {
    expect(isEqual({ a: 'a', b: 'b' }, { a: 'a', b: 'c' })).toBe(false);
  });
});
