export const deepFreeze = <T>(o: T) => {
  for (const n of Object.getOwnPropertyNames(o) as (keyof T)[]) {
    if (o[n] && typeof o[n] === 'object') deepFreeze(o[n]);
  }
  return Object.freeze(o);
};
