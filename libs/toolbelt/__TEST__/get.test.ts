import { get } from '../src/lib/get';

describe('Test get', () => {
  describe('Test accessing deep object', () => {
    const obj = { lvl1: { lvl2: { lvl3: 'henlo' } } };
    it(`should get(obj, ['lvl1'])`, () => {
      const result = get(obj, ['lvl1']);
      expect(result).toEqual({ lvl2: { lvl3: 'henlo' } });
    });
    it(`should get(obj, ['lvl1', 'lvl2'])`, () => {
      const result = get(obj, ['lvl1', 'lvl2']);
      expect(result).toEqual({ lvl3: 'henlo' });
    });
    it(`should get(obj, ['lvl1', 'lvl2', 'lvl3'])`, () => {
      const result = get(obj, ['lvl1', 'lvl2', 'lvl3']);
      expect(result).toEqual('henlo');
    });

    it(`should get(obj, 'lvl1')`, () => {
      const result = get(obj, 'lvl1');
      expect(result).toEqual({ lvl2: { lvl3: 'henlo' } });
    });
    it(`should get(obj, 'lvl1.lvl2')`, () => {
      const result = get(obj, 'lvl1.lvl2');
      expect(result).toEqual({ lvl3: 'henlo' });
    });
    it(`should get(obj, 'lvl1.lvl2.lvl3')`, () => {
      const result = get(obj, 'lvl1.lvl2.lvl3');
      expect(result).toEqual('henlo');
    });
    it(`should get(obj, 'lvl1.lvl2.lvl3')`, () => {
      const result = get(obj, 'lvl1.lvl2.lvl3');
      expect(result).toEqual('henlo');
    });
  });

  describe('Test accessing object with arrays', () => {
    const obj = {
      lvl1: [{ lvl2_a: { lvl3_a: 'henlo' } }, { lvl2_b: { lvl3_b: 'woof' } }],
    };
    it(`should get(obj, ['lvl1', '0'])`, () => {
      const result = get(obj, ['lvl1', '0']);
      expect(result).toEqual({ lvl2_a: { lvl3_a: 'henlo' } });
    });
    it(`should get(obj, 'lvl1[0]')`, () => {
      const result = get(obj, 'lvl1[0]');
      expect(result).toEqual({ lvl2_a: { lvl3_a: 'henlo' } });
    });
    it(`should get(obj, 'lvl1.0')`, () => {
      const result = get(obj, 'lvl1.0');
      expect(result).toEqual({ lvl2_a: { lvl3_a: 'henlo' } });
    });

    it(`should get(obj, ['lvl1', '0', 'lvl2_a'])`, () => {
      const result = get(obj, ['lvl1', '0', 'lvl2_a']);
      expect(result).toEqual({ lvl3_a: 'henlo' });
    });
    it(`should get(obj, 'lvl1[0].lvl2_a')`, () => {
      const result = get(obj, 'lvl1[0].lvl2_a');
      expect(result).toEqual({ lvl3_a: 'henlo' });
    });
    it(`should get(obj, 'lvl1.0.lvl2_a')`, () => {
      const result = get(obj, 'lvl1.0.lvl2_a');
      expect(result).toEqual({ lvl3_a: 'henlo' });
    });
  });

  describe('Test accessing object containing Maps and Sets', () => {
    const obj = {
      lvl1: { lvl2_a: new Map([['doge', { says: 'woof' }]]), lvl2_b: new Set(['henlo']) },
    };

    it(`should get(obj, ['lvl1', 'lvl2_a'])`, () => {
      const result = get(obj, ['lvl1', 'lvl2_a']);
      expect(result).toEqual(new Map([['doge', { says: 'woof' }]]));
    });
    it(`should get(obj, ['lvl1', 'lvl2_b'])`, () => {
      const result = get(obj, ['lvl1', 'lvl2_b']);
      expect(result).toEqual(new Set(['henlo']));
    });
  });
});
