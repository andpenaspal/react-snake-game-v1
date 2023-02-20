import React, { FunctionComponent } from 'react';
import { FlexContainer } from 'Basic Components/FlexContainer';
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
}

const GameHeader: FunctionComponent<GameHeaderProps> = ({ score }) => (
  <StyledFlexContainer backgroundColor="neutral">
    <StyledTitle>Score: {score}</StyledTitle>
    <StyledTitle>Time: 00:00</StyledTitle>
  </StyledFlexContainer>
);

export default GameHeader;
