import { FlexContainer } from 'BasicComponents/FlexContainer';
import ControlsNav from 'Components/ControlsNav';
import GameBoard from 'Components/GameBoard';
import GameHeader from 'Components/GameHeader';
import GameInstructions from 'Components/GameInstructions';
import GameOverModal from 'Components/GameOverModal';
import GameWonModal from 'Components/GameWonModal';
import React, { FunctionComponent, useCallback, useState } from 'react';
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
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [isWin, setIsWin] = useState<boolean>(false);

  console.log('Body - SnakeGamePage');
  const handleIncreaseScore = useCallback((extraScore: number) => {
    console.log('Function - handleIncreaseScore');

    setScore((prev) => prev + extraScore);
  }, []);
  // const handleIncreaseScore = (extraScore: number) => {
  //   console.log('Function - handleIncreaseScore');
  //   setScore((prev) => prev + extraScore);
  // };

  const handlePause = () => setIsGamePause((prev) => !prev);
  const handleReset = () => {
    setScore(0);
    setIsGamePause(false);
    setIsGameStarted(false);
  };
  const handleTryAgain = () => {
    setIsGameOver(false);
    setIsWin(false);
    handleReset();
  };
  const handleLost = () => setIsGameOver(true);
  const handleWin = () => setIsWin(true);

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
          handleReset={handleReset}
        />
        {isGameOver && <GameOverModal onClose={handleTryAgain} />}
        {isWin && <GameWonModal onClose={handleTryAgain} />}
        {isGameStarted ? (
          <StyledBoardContainer>
            <GameBoard
              extraScore={handleIncreaseScore}
              isPause={isGamePause}
              onGameOver={handleLost}
              onWin={handleWin}
            />
          </StyledBoardContainer>
        ) : (
          <GameInstructions />
        )}
      </StyledGameContainer>
    </>
  );
};

export default SnakeGamePage;
