import { merge } from '../src/lib/merge';

describe('Test merge', () => {
  it('should test merging objects', () => {
    const initial = {
      object_1: { item: 'object_1' },
      object_2: { item: 'object_2' },
    };
    const update = {
      object_2: { addendum: 'duuude' },
      object_3: { item: 'object_3' },
    };
    const result = {
      object_1: { item: 'object_1' },
      object_2: { item: 'object_2', addendum: 'duuude' },
      object_3: { item: 'object_3' },
    };
    const merged = merge.objects(initial, update as never);

    expect(merged).toEqual(result);
  });

  it('should test merging arrays', () => {
    const initial = [{ item: 'object_1' }];
    const update = [{ item: 'object_2' }];
    const result = [{ item: 'object_1' }, { item: 'object_2' }];

    const merged = merge.arrays(initial, update);
    console.log('merged', merged);
    expect(merged).toEqual(result);
  });
});
