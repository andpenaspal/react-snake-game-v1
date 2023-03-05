import React, { FunctionComponent, useEffect, useState } from 'react';
import { FlexContainer } from 'BasicComponents/FlexContainer';
import styled from 'styled-components';

const StyledFlexContainer = styled(FlexContainer)`
  width: 50%;
  margin: 20px auto 20px auto;
`;

const StyledTitle = styled.h3`
  width: 130px;
  text-align: center;
  margin: ${(props) => props.theme.spacing.space(1, 2)};
`;

interface GameHeaderProps {
  score: number;
  isPause: boolean;
  isStarted: boolean;
  isReset: boolean;
}

const GameHeader: FunctionComponent<GameHeaderProps> = ({ score, isPause, isStarted, isReset }) => {
  const [seconds, setSeconds] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);

  const getFormattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
  const getFormattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  useEffect(() => {
    if (isPause || !isStarted) return undefined;
    if (seconds === 60) {
      setSeconds(0);
      setMinutes((prev) => prev + 1);
      return undefined;
    }

    const timer = setTimeout(() => setSeconds((prev) => prev + 1), 1000);

    return () => clearTimeout(timer);
  }, [seconds, isPause, isStarted]);

  useEffect(() => {
    if (!isReset) return;

    setSeconds(0);
    setMinutes(0);
  }, [isReset]);

  return (
    <StyledFlexContainer backgroundColor="neutral">
      <StyledTitle>Score: {score}</StyledTitle>
      <StyledTitle>
        Time: {getFormattedMinutes}:{getFormattedSeconds}
      </StyledTitle>
    </StyledFlexContainer>
  );
};

export default GameHeader;
