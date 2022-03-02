/* eslint-disable @typescript-eslint/no-explicit-any */

import { deepClone, deepFreeze, isEqual } from '@devutnia/toolbelt';

import { logic } from './logic';
import { source } from './source';

type Next<T> = (T extends object ? Partial<T> : T) | ((data: T) => void);
interface ContextMatter<Src extends object> {
  <Sel extends (src: Src) => ReturnType<Sel>, Mtr extends undefined>(
    sel: Sel,
    mtr?: Mtr
  ): Readonly<ReturnType<Sel>>;

  <
    Sel extends (src: Src) => ReturnType<Sel>,
    Mtr extends (
      ctx: { data: ReturnType<Sel> },
      infer: (next: Next<{ data: ReturnType<Sel> }>) => void
    ) => ReturnType<Mtr>
  >(
    sel: Sel,
    mtr?: Mtr
  ): Readonly<ReturnType<Mtr> extends void ? ReturnType<Sel> : ReturnType<Mtr>>;
}

export const context = function Context<Src extends object>(
  src: Src
): ContextMatter<Src> {
  const resource = source(src);

  return function Matter(sel: any, mtr: any) {
    const ctx = { data: deepClone(resource.read(sel)) };

    const infer = (next: Next<{ data: ReturnType<typeof sel> }>) => {
      let clone = logic.reapply({ data: ctx.data }, next);
      if (!isEqual(clone.data, ctx.data)) ctx.data = logic.reapply(ctx.data, clone.data);
      if (!isEqual(resource.read(sel), clone.data)) resource.write(sel, clone.data);
      clone = undefined as never;
    };

    let result = (mtr || (() => void undefined))(ctx, infer);
    if (!result) result = ctx.data;

    resource.listen(sel, (next) => {
      if (!isEqual(ctx.data, next)) ctx.data = next;
    });

    return deepFreeze(result) as never;
  };
};
