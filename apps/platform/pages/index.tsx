import styled from '@emotion/styled';

import { Button } from '@devutnia/lumby/inputs';
import { useFiber } from '@devutnia/lumby/core';

const StyledPage = styled.div`
  .page {
  }
`;

export function Index() {
  const { setFiber } = useFiber('12345');

  const onClick = () => {
    setFiber({ error: true });
  };

  return (
    <StyledPage>
      DEVUTNIA
      <Button onClick={onClick} fid="12345">
        Fiber
      </Button>
      <button onClick={onClick}>click</button>
    </StyledPage>
  );
}

export default Index;
