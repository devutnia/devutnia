import styled from '@emotion/styled';

import { LumbyLayer } from '@devutnia/lumby/core';

import { LumbyBox } from '@devutnia/lumby';
import { useLumbyFiber } from '@devutnia/lumby/core';

const StyledPage = styled.div`
  .page {
  }
`;

export function Index() {
  // const { setFiber } = useLumbyFiber('12345');

  const onClick = () => {
    // setFiber({ error: true });
  };

  return (
    <StyledPage>
      DEVUTNIA
      {/* <LumbyLayer fid="12345">Fiber</LumbyLayer> */}
      <LumbyBox fid="12345">Fiber</LumbyBox>
      <button onClick={onClick}>click</button>
    </StyledPage>
  );
}

export default Index;
