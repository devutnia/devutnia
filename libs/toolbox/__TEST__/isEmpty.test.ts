import { isEmpty } from '../src/lib/isEmpty';

describe(`Test isEmpty`, () => {
  //
  it(`should confirm that {} isEmpty`, () => {
    expect(isEmpty({})).toEqual(true);
  });
  it(`should confirm that [] isEmpty`, () => {
    expect(isEmpty([])).toEqual(true);
  });
  it(`should confirm that null isEmpty`, () => {
    expect(isEmpty(null)).toEqual(true);
  });
  it(`should confirm that undefined isEmpty`, () => {
    expect(isEmpty(undefined)).toEqual(true);
  });
  it(`should confirm that '' isEmpty`, () => {
    expect(isEmpty('')).toEqual(true);
  });
  it(`should confirm that new Map() isEmpty`, () => {
    expect(isEmpty(new Map([['', '']]))).toEqual(true);
  });
  it(`should confirm that false isEmpty`, () => {
    expect(isEmpty(false)).not.toEqual(true);
  });
});
