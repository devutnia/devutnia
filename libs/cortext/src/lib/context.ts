import { isEqual, deepClone, deepFreeze } from '@devutnia/toolbox';

import { logic } from './logic';
import { source } from './source';
import { Next, ContextFiber, ContextImpulse } from '../types';

export const context = <Src extends Record<keyof Src, Src[keyof Src]>>(
  src: Src
): ContextFiber<Src> => {
  const resource = source(src);

  return function Fiber<
    Sel extends (src: Src) => ReturnType<Sel>,
    Mtr extends ContextImpulse<ReturnType<Sel>, Mtr>
  >(sel: Sel, mtr?: Mtr) {
    const ctx = { data: deepClone(resource.read(sel)) as ReturnType<Sel> };

    resource.listen(sel, (next) => {
      let draft = Object.assign({ ...ctx.data }, next);
      if (!isEqual(ctx.data, draft)) {
        ctx.data = logic.recontext(ctx.data, draft);
      }
      draft = undefined as never;
    });

    const infer = (next: Next<ReturnType<Sel>>) => {
      let clone = logic.recontext(ctx.data, next.data) as never;
      if (!isEqual(ctx.data, clone)) {
        ctx.data = logic.recontext(ctx.data, clone);
      }
      if (!isEqual(resource.read(sel) || {}, clone)) resource.write(sel, clone);
      clone = undefined as never;
    };
    let result = (mtr || (() => void undefined))(ctx, infer);
    if (!result) result = ctx.data as never;

    return deepFreeze(result) as never;
  };
};
