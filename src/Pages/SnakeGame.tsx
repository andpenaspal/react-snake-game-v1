import { FlexContainer } from 'BasicComponents/FlexContainer';
import ControlsNav from 'Components/ControlsNav';
import GameBoard from 'Components/GameBoard';
import GameHeader from 'Components/GameHeader';
import GameInstructions from 'Components/GameInstructions';
import GameOverModal from 'Components/GameOverModal';
import GameWonModal from 'Components/GameWonModal';
import React, { FunctionComponent, useEffect, useState } from 'react';
import styled from 'styled-components';

const StyledHeader = styled.h1`
  text-align: center;
`;

const StyledGameContainer = styled.div`
  margin: auto;
  max-width: 750px;
  padding: 20px;
  border: 1px solid
    ${({
      theme: {
        palette: { common },
      },
    }) => common.grey200};
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
  const [isResetTimer, setIsResetTimer] = useState<boolean>(false);

  const handleStart = () => {
    setScore(0);
    setIsResetTimer(true);
    setIsGameStarted(true);
  };
  const handleIncreaseScore = (extraScore: number) => setScore((prev) => prev + extraScore);

  const handlePause = () => setIsGamePause((prev) => !prev);

  const handleReset = () => {
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

  useEffect(() => {
    if (isResetTimer) setIsResetTimer(false);
  }, [isResetTimer]);

  return (
    <>
      <StyledHeader>Snake Game</StyledHeader>

      <StyledGameContainer>
        {(isWin || isGameOver) && <span>Last Score</span>}
        <GameHeader
          score={score}
          isPause={isGamePause || isGameOver}
          isStarted={isGameStarted}
          isReset={isResetTimer}
        />
        <ControlsNav
          isStarted={isGameStarted}
          handleStart={handleStart}
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
              currentScore={score}
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
