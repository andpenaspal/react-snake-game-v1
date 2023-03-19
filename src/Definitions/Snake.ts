import { Colors } from 'styled';

export const foodScore = 50;

export const getSnakeSpeed = ({
  boardDimensions,
  currentScore,
}: {
  boardDimensions: number;
  currentScore: number;
}) => {
  const minSpeed = 230;
  const maxSpeed = 100;

  const maxScore = boardDimensions * boardDimensions * foodScore;
  const brackets = 4;
  const changeBracket = Math.floor(maxScore / brackets);

  const scoreBracket = Array.from({ length: brackets }).map((_, i) => changeBracket * i);
  const currentScoreBracket = scoreBracket.findIndex((v: number) => v > currentScore) - 1;

  // brackets -1 so maxSpeed in last ScoreBracket and not maxScore
  return Math.floor(minSpeed - ((minSpeed - maxSpeed) / (brackets - 1)) * currentScoreBracket);
};

export const initialSnakeState = { head: 30, body: [31, 32, 33], tail: 34 };

export enum MOVEMENT_DIRECTION {
  UP = 'UP',
  DOWN = 'DOWN',
  RIGHT = 'RIGHT',
  LEFT = 'LEFT',
}

export enum MOVEMENT_DIRECTION_CORNER {
  UP_RIGHT = 'UP_RIGHT',
  UP_LEFT = 'UP_LEFT',
  DOWN_RIGHT = 'DOWN_RIGHT',
  DOWN_LEFT = 'DOWN_LEFT',
  RIGHT_UP = 'RIGHT_UP',
  RIGHT_DOWN = 'RIGHT_DOWN',
  LEFT_UP = 'LEFT_UP',
  LEFT_DOWN = 'LEFT_DOWN',
}

export type MovementDirectionCorner = MOVEMENT_DIRECTION_CORNER;

export type VerticalDirection = MOVEMENT_DIRECTION.UP | MOVEMENT_DIRECTION.DOWN;
export type HorizontalDirection = MOVEMENT_DIRECTION.RIGHT | MOVEMENT_DIRECTION.LEFT;

export type MovementDirection = VerticalDirection | HorizontalDirection;

export interface SnakeMovementDirection {
  movementDirection: MovementDirection;
}

export interface SnakeMovementTrace {
  movementDirection: MovementDirection | MovementDirectionCorner;
}

export interface SnakeUnitProps<T extends MovementDirection> {
  color: Colors;
  movementDirection: T;
}
