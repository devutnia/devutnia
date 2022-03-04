import { set } from '../src/lib/set';

describe('Test set', () => {
  describe('Test setting object', () => {
    const result = { lvl1: { lvl2: { lvl3: 'henlo' } } };

    it(`should set(obj, ['lvl1', 'lvl2', 'lvl3'], 'henlo')`, () => {
      let obj = {};
      obj = set(obj, ['lvl1', 'lvl2', 'lvl3'], 'henlo');
      expect(obj).toEqual(result);
    });
    it(`should set(obj, 'lvl1.lvl2.lvl3', 'henlo')`, () => {
      let obj = {};
      obj = set(obj, 'lvl1.lvl2.lvl3', 'henlo');
      expect(obj).toEqual(result);
    });
  });
});
