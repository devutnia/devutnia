import produce from 'immer';
import create from 'zustand';
import { mountStoreDevtool } from 'simple-zustand-devtools';
import vanilla, { GetState, SetState } from 'zustand/vanilla';
import { createSelectorHooks } from 'auto-zustand-selectors-hook';

import { lumbyTheme } from './lumby.theme';
import { lumbyFiber, LumbyFiber } from './lumby.fiber';
import { LumbyRoots, FiberRoots, ThemeRoots } from './lumby.types';

const fiberRoots = (
  set: SetState<LumbyRoots>,
  get: GetState<LumbyRoots>
): FiberRoots => ({
  fibers: { fiber_default: new LumbyFiber() },
  setFiber: (fid, newFiber) => {
    const fiber = lumbyFiber({ ...get().fibers[fid], ...newFiber });
    if (fid) set(produce((lumby) => void (lumby.fibers[fid] = fiber) as never));
  },
  unsetFiber: (fid) => {
    set(produce((lumby) => void (lumby.fibers[fid] = undefined)));
    return get().fibers[fid] ? false : true;
  },
});

const themeRoots = (
  set: SetState<LumbyRoots>,
  get: GetState<LumbyRoots>
): ThemeRoots => ({
  theme: lumbyTheme(),
  setTheme: (newTheme) => {
    const theme = lumbyTheme({ ...get().theme, ...newTheme });
    set(produce((lumby) => void (lumby.theme = theme)));
  },
});

// zustand vanilla store
export const roots = vanilla<LumbyRoots>((set, get) => ({
  ...fiberRoots(set, get),
  ...themeRoots(set, get),
}));

// zustand react store based on vanilla store
export const lumbyRoots = createSelectorHooks(create(roots));

if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
  mountStoreDevtool('lumby-roots', lumbyRoots as never);
}
