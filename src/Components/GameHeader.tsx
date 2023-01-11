import React, { FunctionComponent } from 'react';
import { BorderFlexContainer } from 'Basic Components/FlexContainer';
import styled from 'styled-components';

const StyledFlexContainer = styled(BorderFlexContainer)``;

const StyledTitle = styled.h3`
  background-color: ${(props) => props.theme.palette.secondary.main};
  margin: ${(props) => props.theme.spacing.space(1, 2)};
`;

interface GameHeaderProps {
  score: number;
}

const GameHeader: FunctionComponent<GameHeaderProps> = ({ score }) => (
  <StyledFlexContainer>
    <StyledTitle>Score: {score}</StyledTitle>
    <StyledTitle>Time: 00:00</StyledTitle>
  </StyledFlexContainer>
);

export default GameHeader;
