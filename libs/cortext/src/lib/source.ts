import { proxy } from 'valtio/vanilla';
import { proxyMap } from 'valtio/utils';

import { logic } from './logic';
import { isEmpty } from '@devutnia/toolbelt';
import { isDeepStrictEqual } from 'util';

const isEqual = <T>(a: T, b: T) => isDeepStrictEqual(a, b);

export const source = function Source<Src extends object>(src: Src) {
  const source = proxy({ fibers: proxyMap(Object.entries(logic.flatten(src))) });

  const read = <Sel extends (src: Src) => ReturnType<Sel>>(sel: Sel) => {
    const path = logic.selectorPath(sel);
    const result = logic.determineResultFromPath<ReturnType<Sel>>(source.fibers, path);

    return sel(result);
  };

  return {
    read,
    chart: () => Object.fromEntries(source.fibers.entries()),
    write: <Sel extends (src: Src) => ReturnType<Sel>>(
      sel: Sel,
      data: ((data: ReturnType<Sel>) => void) | Partial<ReturnType<Sel>>
    ) => {
      const path = logic.selectorPath(sel);

      let next = Object.assign({ data: {} }, { data: read(sel) });

      if (typeof data === 'function') {
        let res = data(next.data) as ReturnType<Sel>;
        if (isEmpty(next.data)) next.data = (Array.isArray(res) ? [] : {}) as typeof res;
        if (!res) throw new Error(`Cortext: return updated value in ${path.key} write`);
        if (typeof res === typeof next.data && !isEqual(next.data, res)) next.data = res;
        res = undefined as never;
      } else {
        next = Object.assign({ data: next.data }, { data }) as never;
        if (typeof data !== 'object') next.data = data;
        else next.data = Object.assign(next.data, data);
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
