import { deepClone } from '../src/lib/deepClone';

describe('Test deepClone', () => {
  it('should test that original object and deep clone are not deeply equal', () => {
    const o = {} as { item: string };
    const clone = deepClone(o);
    o.item = 'duuude';

    expect(clone).not.toStrictEqual(o);
  });
});
