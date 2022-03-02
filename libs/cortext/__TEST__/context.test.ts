import { test_Data } from './mocks';
import { context } from '../src/lib/context';

describe('Test context', () => {
  const matter = context(test_Data);

  it(`context({...}) should return Matter()`, () => {
    expect(matter.name).toEqual('Matter');
  });

  describe('Test context matter', () => {
    it(`changing "objectOfPrimitives.text" should work`, () => {
      matter(
        (src) => src.objectOfPrimitives,
        (ctx, infer) => {
          ctx.data.text = 'duuude';
          infer(ctx);
        }
      );
      expect(matter((src) => src.objectOfPrimitives.text)).toEqual('duuude');
    });

    it(`changing "mapOfObjects" should work`, () => {
      matter(
        (src) => src.mapOfObjects,
        (ctx, infer) => {
          ctx.data.set('duuude', { item: "where's my car" });
          infer(ctx);
        }
      );
      expect(matter((src) => src.mapOfObjects.get('duuude'))).toEqual({
        item: "where's my car",
      });
    });

    it(`changing "listOfObjects" in various ways should work`, () => {
      matter(
        (src) => src.listOfObjects,
        (ctx, infer) => {
          ctx.data.push({ item: 'duuude' });
          infer(ctx);
        }
      );

      const fiber = matter(
        (src) => src.listOfObjects,
        (ctx, infer) => ({
          add: (item: typeof ctx.data[0]) => {
            ctx.data.push(item);
            infer(ctx);
          },
        })
      );

      fiber.add({ item: 'whaaaat' });

      expect(matter((src) => src.listOfObjects)).toEqual([
        { item: 'object_1' },
        { item: 'duuude' },
        { item: 'whaaaat' },
      ]);
    });
  });
});
