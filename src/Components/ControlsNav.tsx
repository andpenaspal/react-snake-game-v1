import Button from 'Basic Components/Button';
import { FlexContainer } from 'Basic Components/FlexContainer';
import React, { FunctionComponent, useEffect } from 'react';
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
  isPause: boolean;
  handlePause: () => void;
}

const ControlsNav: FunctionComponent<ControlsNavProps> = ({
  isStarted,
  handleStart,
  isPause,
  handlePause,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'p' || e.key === ' ') {
        // Space keydown also "clicks" "Pause" button if user didn't click away after starting the game
        e.preventDefault();
        handlePause();
      }
    };
    window.addEventListener('keydown', handleKeyDown, true);
    return () => window.removeEventListener('keydown', handleKeyDown, true);
  }, [isPause]);

  return (
    <StyledFlexContainer>
      {isStarted ? (
        <>
          <Button color="primary" onClick={handlePause}>
            {isPause ? 'Resume' : 'Pause'}
          </Button>
          <Button color="warning200">Reset</Button>
        </>
      ) : (
        <Button color="primary" onClick={handleStart}>
          Start
        </Button>
      )}
    </StyledFlexContainer>
  );
};

export default ControlsNav;
