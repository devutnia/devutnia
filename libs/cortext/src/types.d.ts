export type Path = { steps: string[]; key: string };
export type Next<T> = { data: T extends object ? Partial<T> : T };

export type ContextImpulse<T, Mtr extends ContextImpulse<T, Mtr>> = (
  ctx: { data: T },
  infer: (next: Next<T>) => void
) => ReturnType<Mtr>;
export interface ContextFiber<Src extends Record<keyof Src, Src[keyof Src]>> {
  <Sel extends (src: Src) => ReturnType<Sel>>(sel: Sel): Readonly<
    ReturnType<Sel>
  >;
  <
    Sel extends (src: Src) => ReturnType<Sel>,
    Mtr extends ContextImpulse<ReturnType<Sel>, Mtr>
  >(
    sel: Sel,
    mtr: Mtr
  ): Readonly<ReturnType<Mtr> extends void ? ReturnType<Sel> : ReturnType<Mtr>>;
}
