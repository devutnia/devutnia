export const isEmpty = <T>(o: T) => {
  if (typeof o === 'boolean') return false;
  for (const i in o) return false;
  return true;
};
