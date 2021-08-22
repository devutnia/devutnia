import { diff } from 'just-diff';
import { useCallback, useEffect } from 'react';

import { LumbyFiber, lumbyClient, fiberStylesheet, lumbyFiber } from '../core';

export function useFiber(fid = 'fiber_default', addFiber?: Partial<LumbyFiber>) {
  const baseFiber = new LumbyFiber();
  const isDefault = fid && fid === 'fiber_default';

  const set = lumbyClient.useSetFiber();

  useEffect(() => {
    if (!isDefault && addFiber) set(fid, addFiber);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setFiber = useCallback(
    (newFiber: Partial<LumbyFiber>) => !isDefault && set(fid, newFiber),
    [fid, isDefault, set]
  );

  const fiber = lumbyClient(
    useCallback((lumby) => lumby.fibers[fid], [fid]),
    (prev, next) => diff([prev], [next]).length === 0
  );

  return {
    setFiber,
    fiber: lumbyFiber({ ...fiber, ...addFiber }),
    styles: fiberStylesheet({ ...baseFiber, ...fiber, ...addFiber }),
  };
}
