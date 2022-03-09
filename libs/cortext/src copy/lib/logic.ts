/* eslint-disable @typescript-eslint/no-explicit-any */
import { flatten, unflatten } from 'flat';
import { isEmpty } from '@devutnia/toolbelt';

type Path = { steps: string[]; key: string };

export const logic = {
  unflatten: <T>(o: T) => unflatten(o) as T,
  flatten: <T>(o: T) => flatten(o, { safe: true }) as T,
  selectorPath: <Sel extends (src: any) => any>(sel: Sel): Path => {
    const steps = sel.toString().split('.').slice(1);
    return { steps, key: steps.join('.') };
  },
  reapply: <T>(o: T, n: ((data: T) => void) | Partial<T>) => {
    let u = { d: o };
    if (typeof n === 'function') n(u.d);
    else if (typeof n !== 'object') u.d = n as T;
    else u.d = Object.assign(u.d, n);
    u = undefined as never;
    return o;
  },
  grabNearbyPaths: <T>(fibers: Map<string, any>, path: Path) => {
    const o = Object.create({});

    for (const [k, v] of fibers.entries()) k.includes(path.key) && (o[k] = v);
    return o as T;
  },
  checkPathForClues: <T>(fibers: Map<string, any>, path: Path) => {
    const arrSelector = path.key.match(/\[([^\]]+)]/);
    const fnSelector = path.key.match(/\(([^)]+)\)/) || path.key.match(/\(\)/);

    const parent = (idx?: number) => path.key.substring(0, idx);
    let p: string;
    if (arrSelector) p = parent(arrSelector.index);
    else if (fnSelector) p = parent(fnSelector.index).split('.')[0];
    else p = path.steps[0];

    return logic.grabNearbyPaths(fibers, { key: p, steps: [p] }) as T;
  },
  determineResultFromPath: <T>(fibers: Map<string, any>, path: Path) => {
    let o = fibers.get(path.key) as T | undefined;
    if (o) o = { [path.key]: o } as never;
    if (isEmpty(o)) o = logic.grabNearbyPaths(fibers, path);
    if (isEmpty(o)) o = logic.checkPathForClues<T>(fibers, path);

    if (isEmpty(o)) throw new Error(`Cortext: this type of selector is not yet handled!`);

    return logic.unflatten(o) as T;
  },
};
