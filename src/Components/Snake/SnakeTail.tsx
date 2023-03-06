import {
  MovementDirection,
  MovementDirectionCorner,
  MOVEMENT_DIRECTION,
  MOVEMENT_DIRECTION_CORNER,
} from 'Definitions/Snake';
import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div<SnakeTailProps>`
  background-color: ${({
    theme: {
      palette: { primary },
    },
  }) => primary.main};
  ${({ movementDirection }) =>
    (movementDirection === MOVEMENT_DIRECTION.RIGHT || MOVEMENT_DIRECTION.LEFT) &&
    `
      width: 70%;
      height: 40%;
      border-radius: 30px 50px 10px 25px;
      margin-top: auto;
      margin-bottom: 1px;
  `}
  ${({ movementDirection }) =>
    (movementDirection === MOVEMENT_DIRECTION.UP ||
      movementDirection === MOVEMENT_DIRECTION_CORNER.RIGHT_UP ||
      movementDirection === MOVEMENT_DIRECTION_CORNER.LEFT_UP) &&
    `
      height: 70%;
      width: 40%;
      border-radius: 25px 30px 50px 10px;
      margin: 0 auto auto 1px;
  `}
    ${({ movementDirection }) =>
    (movementDirection === MOVEMENT_DIRECTION.DOWN ||
      movementDirection === MOVEMENT_DIRECTION_CORNER.LEFT_DOWN ||
      movementDirection === MOVEMENT_DIRECTION_CORNER.RIGHT_DOWN) &&
    `
      height: 70%;
      width: 40%;
      border-radius: 50px 10px 25px 30px;
      margin: auto 1px 0 auto;
  `}
`;

interface SnakeTailProps {
  movementDirection: MovementDirection | MovementDirectionCorner;
}

const SnakeTail: FunctionComponent<SnakeTailProps> = (props) => <StyledDiv {...props} />;
export default SnakeTail;
