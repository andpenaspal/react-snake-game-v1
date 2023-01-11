import { FlexContainer } from 'Basic Components/FlexContainer';
import GameHeader from 'Components/GameHeader';
import React, { FunctionComponent } from 'react';

const SnakeGamePage: FunctionComponent<any> = () => (
  <FlexContainer>
    <GameHeader score={1000} />
  </FlexContainer>
);

export default SnakeGamePage;
