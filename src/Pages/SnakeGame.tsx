import { FlexContainer } from 'Basic Components/FlexContainer';
import ControlsNav from 'Components/ControlsNav';
import GameBoard from 'Components/GameBoard';
import GameHeader from 'Components/GameHeader';
import React, { FunctionComponent, useState } from 'react';

const SnakeGamePage: FunctionComponent<any> = () => {
  const [score, setScore] = useState<number>(0);
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);

  const handleIncreaseScore = (extraScore: number) => setScore((prev) => prev + extraScore);

  return (
    <FlexContainer>
      <GameHeader score={score} />
      <ControlsNav isStarted={isGameStarted} handleStart={() => setIsGameStarted(true)} />
      <FlexContainer>
        <GameBoard extraScore={handleIncreaseScore} isStarted={isGameStarted} />
      </FlexContainer>
    </FlexContainer>
  );
};

export default SnakeGamePage;
