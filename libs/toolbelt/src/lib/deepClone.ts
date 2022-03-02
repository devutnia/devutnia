import { serialize, deserialize } from 'v8';

export const deepClone = <T>(o: T): T => deserialize(serialize(o));
