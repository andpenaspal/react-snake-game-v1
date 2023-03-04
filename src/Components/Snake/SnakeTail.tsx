import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
  width: 10px;
  height: 7px;
  background-color: ${({
    theme: {
      palette: { primary },
    },
  }) => primary.main};
  border-radius: 30px 50px 10px 25px;
  margin-top: auto;
`;

const SnakeTail: FunctionComponent = () => <StyledDiv />;

export default SnakeTail;
