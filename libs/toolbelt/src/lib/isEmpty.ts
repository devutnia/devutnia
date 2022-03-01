export const isEmpty = <T>(o: T) => {
  for (const i in o) return false;
  return true;
};
