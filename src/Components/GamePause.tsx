import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

const StyledPauseBg = styled.div`
  position: absolute;
  top: -1px;
  left: -1px;
  width: 100%;
  height: 100%;
  background-color: ${({
    theme: {
      palette: {
        general: { backgroundColor },
      },
    },
  }) => backgroundColor.overlay};
  border: 1px solid
    ${({
      theme: {
        palette: {
          general: { backgroundColor },
        },
      },
    }) => backgroundColor.overlay};
  border-radius: 5px;
  z-index: 5;
`;

const StyledPause = styled.div`
  position: absolute;
  left: 30%;
  bottom: 55%;
  color: ${({ theme: { palette } }) => palette.warning200.main};
  transform: rotate(-45deg);
  z-index: 6;
  & span {
    position: relative;
    left: -30%;
    font-size: 60px;
  }
`;

const GamePause: FunctionComponent = () => (
  <>
    <StyledPauseBg />
    <StyledPause>
      <span>Paused!!</span>
    </StyledPause>
  </>
);

export default GamePause;
