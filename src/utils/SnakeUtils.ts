import { MovementDirection, MOVEMENT_DIRECTION } from 'Definitions/Snake';
import { SnakeMovementEvent } from './SnakeObserver';

export const BoardDimensions = 4;

interface GetNextHeadPosition {
  direction: keyof typeof MOVEMENT_DIRECTION;
  boardDimensions: number;
  headPosition: number;
}
export const getNextHeadPosition = ({
  direction,
  boardDimensions,
  headPosition,
}: GetNextHeadPosition): number => {
  const calcMov = {
    UP: headPosition - boardDimensions,
    DOWN: headPosition + boardDimensions,
    RIGHT: headPosition + 1,
    LEFT: headPosition - 1,
  };

  return calcMov[direction];
};

interface GetNewSnakePosition extends SnakeMovementEvent {
  newHeadPosition: number;
  isFoodEaten: boolean;
}
export const getNewSnakePosition = ({
  newHeadPosition,
  head,
  body,
  tail,
  isFoodEaten,
}: GetNewSnakePosition): SnakeMovementEvent => {
  if (isFoodEaten)
    return {
      head: newHeadPosition,
      body: [head, ...body],
      tail,
    };
  return {
    head: newHeadPosition,
    body: [head, ...body.slice(0, -1)],
    tail: [...body].pop()!,
  };
};

export const keyDownToDirectionSnakeMapper: { [key: string]: MovementDirection } = {
  ArrowUp: MOVEMENT_DIRECTION.UP,
  ArrowDown: MOVEMENT_DIRECTION.DOWN,
  ArrowLeft: MOVEMENT_DIRECTION.LEFT,
  ArrowRight: MOVEMENT_DIRECTION.RIGHT,
};

interface GetRandomPosition {
  possibilities: number[];
  exclusions: number[];
}

export const getRandomPosition = ({ possibilities, exclusions }: GetRandomPosition): number => {
  const freeOptions = possibilities.filter((i) => !exclusions.includes(i));
  return freeOptions[Math.floor(Math.random() * freeOptions.length)]!;
};

interface BoardBoundaries {
  topBoundaries: number[];
  bottomBoundaries: number[];
  rightBoundaries: number[];
  leftBoundaries: number[];
}

export const getBoardBoundaries = (boardDimensions: number): BoardBoundaries => {
  const numberBoardElements = boardDimensions * boardDimensions;

  const topBoundaries = Array.from({ length: boardDimensions }, (_, i) => i);
  const bottomBoundaries = [];
  const leftBoundaries = [];
  const rightBoundaries = [];

  for (let i = 0; i < numberBoardElements; i += boardDimensions) {
    leftBoundaries.push(i);
    rightBoundaries.push(i + boardDimensions - 1);
  }

  for (let i = numberBoardElements; i > numberBoardElements - boardDimensions; i--) {
    bottomBoundaries.push(i - 1);
  }

  return {
    topBoundaries,
    bottomBoundaries,
    rightBoundaries,
    leftBoundaries,
  };
};

// export const castDirectionToSide: {
//   [key in VerticalDirection | HorizontalDirection]: key extends VerticalDirection
//     ? keyof SnakeHeadVerticalAnimation
//     : keyof SnakeHeadHorizontalAnimation;
// } = {
//   [MOVEMENT_DIRECTION.UP]: 'up',
//   [MOVEMENT_DIRECTION.DOWN]: 'down',
//   [MOVEMENT_DIRECTION.RIGHT]: 'right',
//   [MOVEMENT_DIRECTION.LEFT]: 'left',
// };
