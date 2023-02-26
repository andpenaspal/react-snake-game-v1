import { FlexContainer } from 'Basic Components/FlexContainer';
import { Header2, Header3 } from 'Basic Components/Header';
import Typography from 'Basic Components/Typography';
import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

const StyledContainer = styled.div`
  margin: 10px;
  img {
    height: 50px;
  }
`;

const InstructionWrapper = styled(FlexContainer)`
  justify-content: start;
  margin-left: 20px;
`;

const StyledHeader2 = styled(Header2)`
  text-align: center;
`;

const StyledHeader3 = styled(Header3)`
  text-align: center;
  margin-top: 40px;
`;

const StyledTypographyInstructions = styled(Typography)`
  display: block;
  text-align: center;
  margin-bottom: 10px;
`;

const StyledTypographyControls = styled(Typography)`
  margin-left: 20px;
`;

const GameInstructions: FunctionComponent = () => (
  <StyledContainer>
    <StyledHeader2>Instructions</StyledHeader2>
    <StyledTypographyInstructions>
      Eat as much as you can! The Snake will grow as you eat. You win when you eat all the Food!
    </StyledTypographyInstructions>
    <StyledTypographyInstructions>
      Do not crash with your body or get out of the Board!
    </StyledTypographyInstructions>
    <StyledHeader3>Game Controls</StyledHeader3>
    <InstructionWrapper>
      <img src="/arrow-down.png" alt="Arrow Down Keyboard" />
      <img src="/arrow-up.png" alt="Arrow Up Keyboard" />
      <img src="/arrow-left.png" alt="Arrow Left Keyboard" />
      <img src="/arrow-right.png" alt="Arrow Right Keyboard" />
      <StyledTypographyControls>
        Use the Keyboard Arrows to control the Snake
      </StyledTypographyControls>
    </InstructionWrapper>
    <InstructionWrapper>
      <img src="/key-p.png" alt="P Keyboard" />
      <StyledTypographyControls>
        Press the letter P or the Space Bar to Pause the Game
      </StyledTypographyControls>
    </InstructionWrapper>
  </StyledContainer>
);

export default GameInstructions;
