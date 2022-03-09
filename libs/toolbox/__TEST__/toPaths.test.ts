import { toPaths } from '../src/lib/toPaths';

import { test_Data, test_DataPaths } from './mocks';

describe('Test toPaths', () => {
  it(`should turn the object into [key,value] pairs`, () => {
    const paths = toPaths(test_Data);
    expect(paths).toEqual(test_DataPaths);
  });
});
