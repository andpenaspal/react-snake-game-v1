import { FlexContainer } from 'Basic Components/FlexContainer';
import ControlsNav from 'Components/ControlsNav';
import GameBoard from 'Components/GameBoard';
import GameHeader from 'Components/GameHeader';
import GameInstructions from 'Components/GameInstructions';
import React, { FunctionComponent, useState } from 'react';
import styled from 'styled-components';

const StyledHeader = styled.h1`
  text-align: center;
`;

const StyledGameContainer = styled.div`
  margin: auto;
  max-width: 750px;
  height: 500px;
  border: 1px solid red;
  border-radius: 10px;
`;

const StyledBoardContainer = styled(FlexContainer)`
  margin-top: 30px;
`;

const SnakeGamePage: FunctionComponent<any> = () => {
  const [score, setScore] = useState<number>(0);
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
  const [isGamePause, setIsGamePause] = useState<boolean>(false);

  const handleIncreaseScore = (extraScore: number) => setScore((prev) => prev + extraScore);
  const handlePause = () => setIsGamePause((prev) => !prev);

  return (
    <>
      <StyledHeader>Snake Game</StyledHeader>

      <StyledGameContainer>
        <GameHeader score={score} />
        <ControlsNav
          isStarted={isGameStarted}
          handleStart={() => setIsGameStarted(true)}
          isPause={isGamePause}
          handlePause={handlePause}
        />
        {!isGameStarted && <GameInstructions />}
        <StyledBoardContainer>
          <GameBoard
            extraScore={handleIncreaseScore}
            isStarted={isGameStarted}
            isPause={isGamePause}
          />
        </StyledBoardContainer>
      </StyledGameContainer>
    </>
  );
};

export default SnakeGamePage;
