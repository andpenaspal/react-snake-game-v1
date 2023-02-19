import Button from 'Basic Components/Button';
import { BorderFlexContainer, FlexContainer } from 'Basic Components/FlexContainer';
import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

const StyledBorderFlexContainer = styled(BorderFlexContainer)`
  padding: 10px 10px;
  align-items: center;
`;

const StyledFlexContainer = styled(FlexContainer)`
  height: 100%;
  flex-direction: column;
  justify-content: space-around;
`;

interface ControlsNavProps {
  handleStart: () => void;
  isStarted: boolean;
}

const ControlsNav: FunctionComponent<ControlsNavProps> = ({ isStarted, handleStart }) => (
  <StyledBorderFlexContainer backgroundColor="light">
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
  </StyledBorderFlexContainer>
);

export default ControlsNav;
