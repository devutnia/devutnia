# Cortext

Cortext is a reactive context management tool aimed at speeding up development of POC/MVP JavaScript applications by providing extreme modularity of reactive logic.<br>
Cortext is not another state management library. It is built with one ([valtio](https://github.com/pmndrs/valtio)), but it uses it to ensure your logic works within the most recent context.<br>
State management isn't the goal of this library. Context is.

<br/>

## How to use

Cortext introduces minimal API.

```typescript
import cortext from '@devutnia/cortext';

const context = {
  nameOfYourCat: 'potato',
  someObject: { item: 'value' },
  mapOfThings: new Map([['thingy', { id: 'thingy' }]]),
};

// this initializes the context
const source = cortext(context);

// this reads the context
const thingy = source((src) => src.mapOfThings.get('thingy')); // { id: 'thingy' }
console.log(thingy); // { id: 'thingy' }

const someObject = source((src) => src.someObject);
console.log(someObject); // { item: 'value' }

// this writes to and/or does other things to the context
const SomeObjectModule = source(
  (src) => src.someObject,
  (ctx, infer) => {
    // you can do anything to the context inside here...
    ctx.data.item = 'change the value';

    // ...once you're done, use `infer(ctx)` to write the new context back to source
    // infer(ctx);
    // *infer is optional, if you don't use it, you won't send context of this function to source

    return {
      read: () => ctx.data,
      write: (text) => {
        ctx.data.item = text;
        infer(ctx);
      },
    };

    // *returns are also optional, if you don't return anything, "cortext" will apply any changes
    // you made to the context (with infer() if used) and return a deeply frozen version of itself
  }
);

console.log(someObject); // { item: 'value' }
console.log(SomeObjectModule.read()); // { item: 'change the value' }
SomeObjectModule.write('no changes after all'); // this affects all contexts that "someObject.item" changed for due to "infer()"
console.log(someObject); // { item: 'no changes after all' }
console.log(SomeObjectModule.read()); // { item: 'no changes after all' }
```

And that's pretty much it.

### Testing

Run `nx test cortext` to execute the unit tests.
