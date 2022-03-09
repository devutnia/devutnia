import { deserialize, serialize } from 'v8';

export const deepClone = <T>(o: T) => deserialize(serialize(o)) as T;
