import { deepFreeze } from '../src/lib/deepFreeze';

import { test_Data } from './mocks';

describe('Test deepFreeze', () => {
  it('should deep freeze an object', () => {
    const frozen = deepFreeze(test_Data);
    expect(Object.isFrozen(frozen)).toBe(true);
  });
});
