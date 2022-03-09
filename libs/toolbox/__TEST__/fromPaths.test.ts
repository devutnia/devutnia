import { fromPaths } from '../src/lib/fromPaths';

import { test_Data, test_DataPaths } from './mocks';

describe('Test fromPaths', () => {
  it(`should turn [key,value] pairs into object`, () => {
    const object = fromPaths(test_DataPaths);
    expect(object).toEqual(test_Data);
  });
});
