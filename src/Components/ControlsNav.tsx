import Button from 'Basic Components/Button';
import { FlexContainer } from 'Basic Components/FlexContainer';
import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

// const StyledBorderFlexContainer = styled.div`
//   padding: 10px 10px;
//   align-items: center;
// `;

const StyledFlexContainer = styled(FlexContainer)`
  margin: 20px;
  button {
    margin: 0 10px;
  }
`;

interface ControlsNavProps {
  handleStart: () => void;
  isStarted: boolean;
}

const ControlsNav: FunctionComponent<ControlsNavProps> = ({ isStarted, handleStart }) => (
  <StyledFlexContainer>
    {isStarted ? (
      <>
        <Button color="primary">Pause</Button>
        <Button color="warning200">Reset</Button>
      </>
    ) : (
      <Button color="primary" onClick={handleStart}>
        Start
      </Button>
    )}
  </StyledFlexContainer>
);

export default ControlsNav;
