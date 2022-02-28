export declare namespace Cortext {
  type Space<T> = { [K in keyof T]: T[K] extends object ? Space<T[K]> : T[K] };

  type Source = <Src extends Space<Src>>(src: Src) => { read: ReadSrc; write: WriteSrc };

  type ReadSrc<Src extends Space<Src>> = <Sel extends (src: Src) => ReturnType<Sel>>(
    sel: Sel
  ) => ReturnType<Sel>;

  type WriteSrc<Src extends Space<Src>> = <Sel extends (src: Src) => ReturnType<Sel>>(
    sel: Sel,
    next: ReturnType<Sel> extends FunctionConstructor
      ? (ctx: ReturnType<Sel>) => void
      : ReturnType<Sel> extends object
      ? Partial<ReturnType<Sel>>
      : ReturnType<Sel>
  ) => void;
}
