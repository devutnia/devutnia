import { proxy } from 'valtio/vanilla';
import { proxyMap } from 'valtio/utils';

import { Cortext } from '../types.d';

const source: Cortext.Source = function Source(src) {
  const resource = proxy({ fibers: proxyMap() });

  return {};
};
