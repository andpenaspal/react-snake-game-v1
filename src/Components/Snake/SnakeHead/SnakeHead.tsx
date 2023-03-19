import { MOVEMENT_DIRECTION, SnakeMovementDirection } from 'Definitions/Snake';
import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import SnakeHeadHorizontal from './SnakeHeadHorizontal';
import SnakeHeadVertical from './SnakeHeadVertical';

const StyledDiv = styled.div`
  width: 90%;
  height: 90%;
  position: relative;
`;

const SnakeHead: FunctionComponent<SnakeMovementDirection> = ({ movementDirection }) => (
  <StyledDiv>
    {(movementDirection === MOVEMENT_DIRECTION.UP ||
      movementDirection === MOVEMENT_DIRECTION.DOWN) && (
      <SnakeHeadVertical
        movementDirection={MOVEMENT_DIRECTION[movementDirection]}
        color="primary"
      />
    )}
    {(movementDirection === MOVEMENT_DIRECTION.RIGHT ||
      movementDirection === MOVEMENT_DIRECTION.LEFT) && (
      <SnakeHeadHorizontal
        movementDirection={MOVEMENT_DIRECTION[movementDirection]}
        color="primary"
      />
    )}
  </StyledDiv>
);

export default SnakeHead;
