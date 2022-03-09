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

    // it(`changing "listOfObjects" in various ways should work`, () => {
    //   matter(
    //     (src) => src.listOfObjects,
    //     (ctx, infer) => {
    //       ctx.data.push({ item: 'duuude' });
    //       infer(ctx);
    //     }
    //   );

    //   const fiber = matter(
    //     (src) => src.listOfObjects,
    //     (ctx, infer) => ({
    //       add: (item: typeof ctx.data[0]) => {
    //         ctx.data.push(item);
    //         infer(ctx);
    //       },
    //     })
    //   );

    //   fiber.add({ item: 'whaaaat' });

    //   expect(matter((src) => src.listOfObjects)).toEqual([
    //     { item: 'object_1' },
    //     { item: 'duuude' },
    //     { item: 'whaaaat' },
    //   ]);
    // });
  });
});
