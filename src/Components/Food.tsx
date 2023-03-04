import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
  height: 5px;
  width: 5px;
  border-radius: 50%;
  background-color: ${({
    theme: {
      palette: { secondary },
    },
  }) => secondary.main};
`;

const Food: FunctionComponent<{}> = () => <StyledDiv />;

export default Food;
