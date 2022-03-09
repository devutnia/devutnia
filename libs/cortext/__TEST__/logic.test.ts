import { logic } from '../src/lib/logic';

// import { test_Data } from './mocks';

describe(`Test logic`, () => {
  describe(`Test "logic.recontext"`, () => {
    it(`should test if target object was updated with next`, () => {
      const init = { test: 'value' };
      const result = logic.recontext(init, { test: 'potato' });
      expect(result.test).toEqual('potato');
    });

    it(`should test if target primitive was updated with next`, () => {
      const init = 'value' as string;
      const result = logic.recontext(init, 'potato');
      expect(result).toEqual('potato');
    });
  });
  describe(`Test "logic.selectorPath"`, () => {
    it(`should test creation of a selector's path`, () => {
      const path = logic.selectorPath((src) => src.something.test);
      expect(path.key).toEqual('something.test');
      expect(path.steps).toEqual(['something', 'test']);
    });
  });
});
