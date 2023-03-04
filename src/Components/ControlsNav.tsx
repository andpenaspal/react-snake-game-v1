import Button from 'Basic Components/Button';
import { FlexContainer } from 'Basic Components/FlexContainer';
import React, { FunctionComponent, useEffect } from 'react';
import styled from 'styled-components';

const StyledFlexContainer = styled(FlexContainer)`
  margin: 20px;
  button {
    margin: 0 10px;
  }
`;

const ControlsWrapper = styled(FlexContainer)`
  width: 50%;
  align-items: center;
  justify-content: space-around;
`;

interface ControlsNavProps {
  handleStart: () => void;
  isStarted: boolean;
  isPause: boolean;
  handlePause: () => void;
  handleReset: () => void;
}

const ControlsNav: FunctionComponent<ControlsNavProps> = ({
  isStarted,
  handleStart,
  isPause,
  handlePause,
  handleReset,
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
      <ControlsWrapper>
        {isStarted ? (
          <>
            <Button color="primary" onClick={handlePause}>
              {isPause ? 'Resume' : 'Pause'}
            </Button>
            <Button color="warning200" onClick={handleReset}>
              Reset
            </Button>
          </>
        ) : (
          <Button color="primary" onClick={handleStart}>
            Start
          </Button>
        )}
      </ControlsWrapper>
    </StyledFlexContainer>
  );
};

export default ControlsNav;
