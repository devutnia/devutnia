/* eslint-disable @typescript-eslint/no-explicit-any */

import { fromPaths, isEmpty } from '@devutnia/toolbelt';

type Path = { steps: string[]; key: string };

export const logic = {
  recontext: <T>(o: T, n: T extends object ? Partial<T> : T) => {
    if (typeof o !== 'object') o = n as T;
    else o = Object.assign({ d: o }, { d: n }).d as T;
    return o;
  },
  selectorPath: <Sel extends (src: never) => never>(sel: Sel): Path => {
    const path = sel.toString();
    const steps = path.split('.').slice(1);
    const key = steps
      .join('.')
      .replace(/\[([0-9]+)\]/g, '.$1')
      .replace(/\['(.*?)'\]/g, '.$1');
    return { steps, key };
  },
  grabNearbyPaths: <T>(fibers: Map<string, any>, path: Path) => {
    const o = Object.create({});
    for (const [k, v] of fibers.entries()) k.includes(path.steps[0]) && (o[k] = v);
    return o as T;
  },
  checkPathForClues: <T>(fibers: Map<string, any>, path: Path) => {
    const arrSelector = path.key.match(/\[([^\]]+)]/);
    const fnSelector = path.key.match(/\(([^)]+)\)/) || path.key.match(/\(\)/);

    const parent = (idx?: number) => path.key.substring(0, idx);
    if (arrSelector) path.key = parent(arrSelector.index);
    if (fnSelector) path.key = parent(fnSelector.index);

    return logic.grabNearbyPaths<T>(fibers, path);
  },
  determineCtxFromPath: <T>(fibers: Map<string, any>, path: Path) => {
    let o = fibers.get(path.key) as T | undefined;
    if (o) o = { [path.key]: o } as never as T;
    if (isEmpty(o)) o = logic.grabNearbyPaths(fibers, path);
    if (isEmpty(o)) o = logic.checkPathForClues(fibers, path);
    if (isEmpty(o)) o = Object.fromEntries(fibers.entries()) as T;
    return fromPaths(o);
  },
};
