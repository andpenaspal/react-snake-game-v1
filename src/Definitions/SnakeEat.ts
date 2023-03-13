import { MOVEMENT_DIRECTION } from './Snake';

interface HorizontalSides {
  topSide: string;
  bottomSide: string;
}

interface VerticalSides {
  rightSide: string;
  leftSide: string;
}

export interface SnakeHeadVertical {
  [MOVEMENT_DIRECTION.UP]: VerticalSides;
  [MOVEMENT_DIRECTION.DOWN]: VerticalSides;
}

export interface SnakeHeadHorizontal {
  [MOVEMENT_DIRECTION.LEFT]: HorizontalSides;
  [MOVEMENT_DIRECTION.RIGHT]: HorizontalSides;
}

const rightMovement: HorizontalSides = {
  topSide: 'transform: rotate(-20deg);',
  bottomSide: 'transform: rotate(20deg);',
};

const leftMovement: HorizontalSides = {
  topSide: 'transform: rotate(20deg);',
  bottomSide: 'transform: rotate(-20deg);',
};

const downMovement: VerticalSides = {
  rightSide: 'transform: rotate(-20deg);',
  leftSide: 'transform: rotate(20deg);',
};

const upMovement: VerticalSides = {
  rightSide: 'transform: rotate(20deg);',
  leftSide: 'transform: rotate(-20deg);',
};

export const snakeHeadMovementCSS: SnakeHeadHorizontal & SnakeHeadVertical = {
  [MOVEMENT_DIRECTION.UP]: {
    rightSide: upMovement.rightSide,
    leftSide: upMovement.leftSide,
  },
  [MOVEMENT_DIRECTION.DOWN]: {
    rightSide: downMovement.rightSide,
    leftSide: downMovement.leftSide,
  },
  [MOVEMENT_DIRECTION.RIGHT]: {
    topSide: rightMovement.topSide,
    bottomSide: rightMovement.bottomSide,
  },
  [MOVEMENT_DIRECTION.LEFT]: {
    topSide: leftMovement.topSide,
    bottomSide: leftMovement.bottomSide,
  },
};
