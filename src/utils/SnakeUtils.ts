import { MOVEMENT_DIRECTION } from 'Definitions/Snake';
import { SnakeStateEvent } from './SnakeObserver';

interface GetNextSnakePosition extends SnakeStateEvent {
  direction: keyof typeof MOVEMENT_DIRECTION;
  boardDimensions: number;
  isLastBodyEaten: boolean;
}

// eslint-disable-next-line import/prefer-default-export
export const getNextSnakePosition = ({
  direction,
  boardDimensions,
  head,
  body,
  tail,
  isLastBodyEaten,
}: GetNextSnakePosition): SnakeStateEvent => {
  const calcMov = {
    UP: head - boardDimensions,
    DOWN: head + boardDimensions,
    RIGHT: head + 1,
    LEFT: head - 1,
  };

  if (isLastBodyEaten) {
    return {
      head: calcMov[direction],
      body: [head, ...body],
      tail,
    };
  }

  return {
    head: calcMov[direction],
    body: [head, ...body.slice(0, -1)],
    tail: [...body].pop()!,
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
