import { test_Data } from './mocks';
import { context } from '../src/lib/context';

describe('Test context', () => {
  const fiber = context(test_Data);

  it(`context({...}) should return Fiber()`, () => {
    expect(fiber.name).toEqual('Fiber');
  });

  describe('Test context fiber', () => {
    it(`changing "objectOfPrimitives.text" should work`, () => {
      fiber(
        (src) => src.objectOfPrimitives,
        (ctx, infer) => {
          ctx.data.text = 'duuude';
          infer(ctx);
        }
      );
      expect(fiber((src) => src.objectOfPrimitives.text)).toEqual('duuude');
    });

    it(`changing "mapOfObjects" should work`, () => {
      fiber(
        (src) => src.mapOfObjects,
        (ctx, infer) => {
          ctx.data.set('duuude', { item: "where's my car" });
          infer(ctx);
        }
      );
      expect(fiber((src) => src.mapOfObjects.get('duuude'))).toEqual({
        item: "where's my car",
      });
    });
  });
});
