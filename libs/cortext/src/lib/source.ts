import { proxyMap } from 'valtio/utils';
import { proxy, snapshot, subscribe } from 'valtio/vanilla';

import { toPaths } from '@devutnia/toolbox';

import { logic } from './logic';

export const source = <Src extends object>(src: Src) => {
  const source = proxy({ fibers: proxyMap(Object.entries(toPaths(src))) });

  const read = <Sel extends (src: Src) => ReturnType<Sel>>(
    sel: Sel
  ): ReturnType<Sel> | undefined => {
    const path = logic.selectorPath(sel);
    const ctx = logic.determineCtxFromPath<ReturnType<Sel>>(
      source.fibers,
      path
    );
    if (ctx) {
      const result = sel(ctx as never);
      if (typeof result === 'function')
        throw Error('Cortext: unfinished selector!');
      return result;
    } else return ctx;
  };

  const write = <Sel extends (src: Src) => ReturnType<Sel>>(
    sel: Sel,
    value:
      | (ReturnType<Sel> extends object
          ? Partial<ReturnType<Sel>>
          : ReturnType<Sel>)
      | undefined
  ) => {
    const path = logic.selectorPath(sel);
    let ctx = { data: read(sel) };
    ctx.data = value as never;
    if (typeof ctx.data === 'object') {
      for (const [key, val] of Object.entries(toPaths(ctx.data))) {
        source.fibers.set(`${path.key}.${key}`, val);
      }
    }
    source.fibers.set(path.key, value);
    ctx = undefined as never;
  };

  const listen = <Sel extends (src: Src) => ReturnType<Sel>>(
    sel: Sel,
    next: (data: ReturnType<Sel>) => void
  ) => {
    const path = logic.selectorPath(sel);

    return subscribe(source.fibers, () => {
      let snap = snapshot(source.fibers).get(path.key);
      next(snap);
      snap = undefined;
    });
  };

  return { read, write, listen };
};
