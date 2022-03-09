import { proxyMap } from 'valtio/utils';
import { proxy, snapshot, subscribe } from 'valtio/vanilla';
import { isEmpty, isEqual } from '@devutnia/toolbelt';

import { logic } from './logic';

type Next<T> = (T extends object ? Partial<T> : T) | ((data: T) => void);

export const source = function Source<Src extends object>(src: Src) {
  const source = proxy({ fibers: proxyMap(Object.entries(logic.flatten(src))) });

  const read = <Sel extends (src: Src) => ReturnType<Sel>>(sel: Sel) => {
    const path = logic.selectorPath(sel);
    const result = logic.determineResultFromPath<ReturnType<Sel>>(source.fibers, path);
    return sel(result);
  };

  const listen = <Sel extends (src: Src) => ReturnType<Sel>>(
    sel: Sel,
    echo: (next: ReturnType<Sel>) => void
  ) => {
    const path = logic.selectorPath(sel);

    return subscribe(source.fibers, () => {
      echo(snapshot(source.fibers).get(path.key));
    });
  };

  return {
    read,
    listen,
    chart: () => Object.fromEntries(source.fibers.entries()),
    write: <Sel extends (src: Src) => ReturnType<Sel>>(
      sel: Sel,
      update: Next<ReturnType<Sel>>
    ) => {
      const path = logic.selectorPath(sel);
      let next = Object.assign({ data: {} }, { data: read(sel) });

      if (typeof update === 'function') {
        let res = (update as (...args: never) => never)(next.data) as ReturnType<Sel>;
        if (isEmpty(next.data)) next.data = (Array.isArray(res) ? [] : {}) as typeof res;
        if (!res) throw new Error(`Cortext: write of ${path.key} requires a return`);
        if (typeof res === typeof next.data) next.data = res;
        res = undefined as never;
      } else {
        next = Object.assign({ data: next.data }, { data: update }) as never;
        if (typeof update !== 'object') next.data = update as never;
        else next.data = Object.assign(next.data, update);
      }

      if (source.fibers.has(path.key)) source.fibers.set(path.key, next.data);
      else {
        Object.entries(logic.flatten({ [path.key]: next.data })).forEach(([k, v]) => {
          if (k.includes(path.key)) source.fibers.set(k, v);
        });
      }
      next = undefined as never;
    },
  };
};
