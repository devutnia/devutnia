import { context as cortext } from '../src/lib/context';

describe('Test examples', () => {
  describe('Test TL;DR', () => {
    const context = { nameOfYourCat: 'potato' };
    const source = cortext(context);

    const matter = source(
      (src) => src.nameOfYourCat,
      (ctx, infer) => ({
        read: () => ctx.data,
        write: (text: string) => {
          ctx.data = text;
          infer(ctx);
        },
      })
    );

    it(`should check cat's name`, () => {
      expect(matter.read()).toEqual('potato');
    });

    it(`should change cat's name`, () => {
      matter.write('still potato');
      expect(matter.read()).toEqual('still potato');
    });
  });

  describe('Test example with comments', () => {
    const context = {
      nameOfYourCat: 'potato',
      someObject: { item: 'value' },
      mapOfThings: new Map([['thingy', { id: 'thingy' }]]),
    };
    const source = cortext(context);
    const someObject = source((src) => src.someObject);

    it(`should check "thingy"`, () => {
      expect(source((src) => src.mapOfThings.get('thingy'))).toEqual({
        id: 'thingy',
      });
    });
    it(`should check "someObject"`, () => {
      expect(someObject).toEqual({ item: 'value' });
    });

    const SomeObjectModule = source(
      (src) => src.someObject,
      (ctx, infer) => {
        ctx.data.item = 'change the value';
        return {
          read: () => ctx.data,
          write: (text: string) => {
            ctx.data.item = text;
            infer(ctx);
          },
        };
      }
    );

    it(`should check "SomeObjectModule.read()"`, () => {
      expect(SomeObjectModule.read()).toEqual({ item: 'change the value' });
    });

    it(`should update with "SomeObjectModule.write()" and check with "SomeObjectModule.read()"`, () => {
      SomeObjectModule.write('no changes after all');
      expect(SomeObjectModule.read()).toEqual({ item: 'no changes after all' });
    });
  });
});
