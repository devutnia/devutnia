import { diff } from 'just-diff';
import { useCallback, useEffect, useMemo } from 'react';

import { lumbyRoots, LumbyFiber, lumbyFiber } from '../../core';

export function useLumbyFiber(fid = 'fiber_default', addFiber: Partial<LumbyFiber> = {}) {
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

  const oldFiber = lumbyRoots(
    useCallback((lumby) => lumby.fibers[fid], [fid]),
    (prev, next) => diff([prev], [next]).length === 0
  );

  const layer = useMemo(() => lumbyFiber(addFiber, oldFiber), [addFiber, oldFiber]);

  return { setFiber, ...layer };
}
