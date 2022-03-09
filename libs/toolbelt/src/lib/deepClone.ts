import { deserialize, serialize } from 'v8';

import { isEmpty } from '.';

// export const deepClone = <T>(o: T): T => {
//   if (isEmpty(o)) return o;
//   return deserialize(serialize(o));
// };

export function deepClone<T>(o: T): T {
  if (isEmpty(o)) return o;
  return deserialize(serialize(o));
}
