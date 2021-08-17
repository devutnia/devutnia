import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface LumbyProps {}

const StyledLumby = styled.div`
  color: pink;
`;

export function Lumby(props: LumbyProps) {
  return (
    <StyledLumby>
      <h1>Welcome to Lumby!</h1>
    </StyledLumby>
  );
}

export default Lumby;
