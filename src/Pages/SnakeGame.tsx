import { FlexContainer } from 'Basic Components/FlexContainer';
import ControlsNav from 'Components/ControlsNav';
import GameBoard from 'Components/GameBoard';
import GameHeader from 'Components/GameHeader';
import React, { FunctionComponent, useState } from 'react';

const SnakeGamePage: FunctionComponent<any> = () => {
  const [score, setScore] = useState(0);

  const handleIncreaseScore = (extraScore: number) => setScore((prev) => prev + extraScore);

  return (
    <FlexContainer>
      <GameHeader score={score} />
      <ControlsNav />
      <FlexContainer>
        <GameBoard extraScore={handleIncreaseScore} />
      </FlexContainer>
    </FlexContainer>
  );
};

export default SnakeGamePage;
