import React from 'react';

import { useLumbyFiber } from '..';
import { FiberFrame, LumbyFiber, FiberCanvas } from '../../core';

export const LumbyLayer: React.FC<Partial<LumbyFiber>> = ({ children, ...props }) => {
  const { canvas, frame } = useLumbyFiber(props.fid, props);

  return (
    <FiberFrame {...frame}>
      <FiberCanvas {...canvas}>{children}</FiberCanvas>
    </FiberFrame>
  );
};
