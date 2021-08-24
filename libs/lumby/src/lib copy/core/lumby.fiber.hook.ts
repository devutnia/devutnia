import { diff } from 'just-diff';
import { useCallback, useEffect, useMemo } from 'react';

import { LumbyFiber, lumbyRoots, lumbyFiber, fiberStyles } from '../core';

export function useLumbyFiber(fid = 'fiber_default', addFiber?: Partial<LumbyFiber>) {
  const isDefault = fid && fid === 'fiber_default';

  const set = lumbyRoots.useSetFiber();

  useEffect(() => {
    if (!isDefault && addFiber) set(fid, addFiber);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setFiber = useCallback(
    (newFiber: Partial<LumbyFiber>) => !isDefault && set(fid, newFiber),
    [fid, isDefault, set]
  );

  const fiber = lumbyRoots(
    useCallback((lumby) => lumby.fibers[fid], [fid]),
    (prev, next) => diff([prev], [next]).length === 0
  );

  const styles = useMemo(() => fiberStyles({ ...fiber, ...addFiber }), [addFiber, fiber]);

  return {
    styles,
    setFiber,
    fiber: lumbyFiber({ ...fiber, ...addFiber }),
  };
}
