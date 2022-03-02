import { deepClone, isEqual } from '@devutnia/toolbelt';

import { logic } from './logic';
import { source } from './source';

type Next<T> = (T extends object ? Partial<T> : T) | ((data: T) => void);

export const context = function Context<Src extends object>(src: Src) {
  const resource = source(src);

  return function Matter<
    Sel extends (src: Src) => ReturnType<Sel>,
    Mtr extends <Ctx extends ReturnType<Sel>>(
      ctx: { data: Ctx },
      infer: (next: Next<{ data: Ctx }>) => void
    ) => ReturnType<Mtr>
  >(
    sel: Sel,
    mtr?: Mtr
  ): ReturnType<Mtr> extends void ? ReturnType<Sel> : ReturnType<Mtr> {
    const ctx = { data: deepClone(resource.read(sel)) };

    const infer = (next: Next<{ data: ReturnType<Sel> }>) => {
      let clone = logic.reapply({ data: ctx.data }, next);
      if (!isEqual(clone.data, ctx.data)) ctx.data = logic.reapply(ctx.data, clone.data);
      if (!isEqual(resource.read(sel), clone.data)) resource.write(sel, clone.data);
      clone = undefined as never;
    };

    let result = (mtr || (() => void undefined))(ctx, infer);
    if (!result) result = ctx.data;

    return result as never;
  };
};
