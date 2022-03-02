import { test_Data } from './mocks';
import { context } from '../src/lib/context';

describe('Test context', () => {
  const fiber = context(test_Data);

  it(`context({...}) should return Matter()`, () => {
    expect(fiber.name).toEqual('Matter');
  });

  describe('Test context matter', () => {
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

    it(`changing "listOfObjects" in various ways should work`, () => {
      fiber(
        (src) => src.listOfObjects,
        (ctx, infer) => {
          ctx.data.push({ item: 'duuude' });
          infer(ctx);
        }
      );

      const matter = fiber(
        (src) => src.listOfObjects,
        (ctx, infer) => ({
          add: (item: typeof ctx.data[0]) => {
            ctx.data.push(item);
            infer(ctx);
          },
        })
      );

      matter.add({ item: 'whaaaat' });

      expect(fiber((src) => src.listOfObjects)).toEqual([
        { item: 'object_1' },
        { item: 'duuude' },
        { item: 'whaaaat' },
      ]);
    });

    // it(`changing "listOfObjects" in various ways should work`, () => {
    //   fiber(
    //     (src) => src.listOfObjects,
    //     (ctx, infer) => {
    //       ctx.data.push({ item: 'duuude' });
    //       infer(ctx);
    //     }
    //   );

    //   const matter = fiber(
    //     (src) => src.listOfObjects,
    //     (ctx, infer) => ({
    //       add: (item: typeof ctx.data[0]) => {
    //         ctx.data.push(item);
    //         infer(ctx);
    //       },
    //     })
    //   );
    // });
  });
});
