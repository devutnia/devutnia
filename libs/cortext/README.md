# `Cortext`

`Cortext` is a reactive context management tool aimed at speeding up development of POC/MVP JavaScript applications by providing extreme modularity of reactive logic.<br>
`Cortext` is not another state management library. It is built with one ([valtio](https://github.com/pmndrs/valtio)), but it uses it to ensure your logic works within the most recent context and can be mixed and matched across your application without breaking a sweat in changing tests or logic's flow.<br>
State management isn't the goal of this library. Context is.

<br/>

## How to use

Cortext introduces minimal API.

### TL;DR example:

```typescript
import cortext from '@devutnia/cortext';

const context = { nameOfYourCat: 'potato' };
const source = cortext(context);
const matter = source(
  (src) => src.nameOfYourCat,
  (ctx, infer) => ({
    read: () => ctx.data,
    write: (text) => {
      ctx.data = text;
      infer(ctx);
    },
  })
);
console.log(matter.read()); // 'potato'
matter.write('still potato');
console.log(matter.read()); // 'still potato'
```

Tada! Global and modular reactive context.

<br>

### Example with comments:

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

<br>

## API

`Cortext`'s API is sm0l.

### 1) `Context`

`Context` is a quasi-curried function that takes the data object as an argument of a first function and returns [ContextMatter]().<br>
Effectively, `Context` works as a global store with which you interact, so put it wherever is convenient in your app's architecture.

```typescript
import cortext from '@devutnia/cortext';

const source = cortext({
  nameOfYourCat: 'potato',
  someObject: { item: 'value' },
  listOfThings: [{ item: 'value' }],
  mapOfThings: new Map([['thingy', { id: 'thingy' }]]),
});
```

<br>

### 2) `ContextMatter`

`ContextMatter` is a second function returned by `Context`. It takes one required and one optional argument.

<br>

#### a) `read from context`

The first argument is a selector. `Cortext` handles 90% of selector types, but not all. If you stick to the ones below, you should be fine until the last 10% is covered :P<br>
**`All results`** returned by `ContextMatter` are `Readonly`.

```typescript
const matter = source((src) => src.nameOfYourCat); // Readonly<'potato'>
const matter = source((src) => src.someObject['item']): // Readonly<'value'>

const matter = source((src) => src.listOfThings[0]): // Readonly<{ item: 'value' }>
const selector = (src) => src.listOfThings.find(t => t.item === 'value');
const matter = source(selector): // Readonly<{ item: 'value' }>

const matter = source((src) => src.mapOfThings.get('thingy')) // Readonly<{ id: 'thingy' }>

const matter = source((src) => src.mapOfThings.get)('thingy') // ERROR!
// it won't work because iterators need to be .bind() back with this if used in callbacks
// which I am not doing, because you are not supposed to meander out of context like that anyway xD
```

How `ContextMatter` works is that it determines which data to provide you with based on the initial data passed in `Context`. You don't have to be very precise while selecting your context. It just needs to pre-exist in the store.<br> `Cortext` updates paths of the affected data, so if you decide to update the global context, the interested contexts will react if the data changed.

<br>

#### b) `write to context`

`ContextMatter` let's you write to context using the optional, second argument of this function.
The second argument is a callback that provides two arguments `(ctx, infer)`.
<br><br>

- Here we only change the context inside `SomeModule`:

```typescript
const SomeModule = source(
  (src) => src.nameOfYourCat,
  (ctx) => {
    ctx.data = 'still potato';
  }
);
console.log(SomeModule); // 'still potato'
```

- Here we change the local context and inform the global context:

```typescript
const SomeOtherModule = source(
  (src) => src.nameOfYourCat,
  (ctx, infer) => {
    console.log(ctx.data); // 'still potato'
    ctx.data = 'Hermes';
    console.log(ctx.data); // 'Hermes'
    infer(ctx);
  }
);
console.log(SomeModule); // 'Hermes'
console.log(SomeOtherModule); // 'Hermes'
```

You can also conditionally decide what to do with the context:

```typescript
const SomeIfElseModule = source(
  (src) => src.nameOfYourCat,
  (ctx, infer) => {
    if (ctx.data === 'Hermes') infer((ctx) => (ctx.data = 'potato'));
  }
);
console.log(SomeIfElseModule); // 'potato'

console.log(SomeModule); // 'potato'
console.log(SomeOtherModule); // 'potato'
```

<br>

### 3) `Context` and `ContextMatter` type

<br>

```typescript
type Next<T> = (T extends object ? Partial<T> : T) | ((data: T) => void);

function Context<Src extends object>(src: Src): ContextMatter<Src>;

interface ContextMatter<Src extends object> {
  <Sel extends (src: Src) => ReturnType<Sel>, Mtr extends undefined>(
    sel: Sel,
    mtr?: Mtr
  ): Readonly<ReturnType<Sel>>;

  <
    Sel extends (src: Src) => ReturnType<Sel>,
    Mtr extends (
      ctx: { data: ReturnType<Sel> },
      infer: (next: Next<{ data: ReturnType<Sel> }>) => void
    ) => ReturnType<Mtr>
  >(
    sel: Sel,
    mtr?: Mtr
  ): Readonly<ReturnType<Mtr> extends void ? ReturnType<Sel> : ReturnType<Mtr>>;
}
```

<br>

## Testing

Run `nx test cortext` to execute the unit tests.
