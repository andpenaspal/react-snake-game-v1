import { MovementDirection, MovementDirectionCorner, MOVEMENT_DIRECTION } from 'Definitions/Snake';
import React, { FunctionComponent, useState, useEffect } from 'react';
import styled from 'styled-components';
import FoodObserver from 'utils/FoodObserver';
import SnakeMovementTraceObserver, { SnakeMovementTraceEvent } from 'utils/SnakeMovementObserver';
import SnakeMovementObserver, { SnakeMovementEvent } from 'utils/SnakeObserver';
import Food from './Food';
import SnakeHead from './Snake/SnakeHead/SnakeHead';
import SnakeTail from './Snake/SnakeTail';
import SnakeUnit from './Snake/SnakeBodyUnit';

const StyledTile = styled.div`
  height: 15px;
  width: 15px;

  background-color: lightblue;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface TileProps {
  id: number;
}
enum SNAKE_DEF {
  HEAD = 'HEAD',
  BODY = 'BODY',
  TAIL = 'TAIL',
}

const handleFood = (id: number, setFood: (v: boolean) => void) => (newFood: number) =>
  setFood(id === newFood);

const handleMove =
  (id: number, setSnakeState: (state?: keyof typeof SNAKE_DEF) => void) =>
  ({ head, body, tail }: SnakeMovementEvent) => {
    if (id === head) return setSnakeState(SNAKE_DEF.HEAD);
    if (body.includes(id)) return setSnakeState(SNAKE_DEF.BODY);
    if (id === tail) return setSnakeState(SNAKE_DEF.TAIL);
    return setSnakeState();
  };

const handleDirection =
  (
    id: number,
    setSnakeMovement: (v: {
      isDirection: boolean;
      movement: MovementDirection | MovementDirectionCorner;
    }) => void,
  ) =>
  ({ headMovementDirection, cornerDirection, head }: SnakeMovementTraceEvent) => {
    if (id === head)
      return setSnakeMovement({
        isDirection: true,
        movement: MOVEMENT_DIRECTION[headMovementDirection],
      });
    return setSnakeMovement({ isDirection: false, movement: cornerDirection });
  };

const BoardTile: FunctionComponent<TileProps> = ({ id }) => {
  const [movementDirection, setMovementDirection] = useState<MovementDirection | null>(
    MOVEMENT_DIRECTION.LEFT,
  );
  const [movementTrace, setMovementTrace] = useState<
    MovementDirection | MovementDirectionCorner | null
  >(MOVEMENT_DIRECTION.LEFT);

  const [isHead, setHead] = useState(false);
  const [isBody, setBody] = useState(false);
  const [isTail, setTail] = useState(false);
  const [isFood, setFood] = useState(false);
  // const [isEaten, setIsEaten] = useState(false);

  const setSnakeState = (state?: keyof typeof SNAKE_DEF) => {
    if (!state) {
      setHead(false);
      setBody(false);
      setTail(false);
      setMovementDirection(null);
      setMovementTrace(null);
      return;
    }
    setHead(state === SNAKE_DEF.HEAD);
    setBody(state === SNAKE_DEF.BODY);
    setTail(state === SNAKE_DEF.TAIL);
  };

  const isValueOfEnum =
    <T extends {}>(e: T) =>
    (token: any): token is T[keyof T] =>
      Object.values(e).includes(token as T[keyof T]);

  const setSnakeMovement = ({
    isDirection,
    movement,
  }: {
    isDirection: boolean;
    movement: MovementDirection | MovementDirectionCorner;
  }) => {
    if (isDirection && isValueOfEnum(MOVEMENT_DIRECTION)(movement)) {
      return setMovementDirection(movement);
    }

    return setMovementTrace(movement);
  };

  useEffect(() => {
    SnakeMovementObserver.subscribe(id, handleMove(id, setSnakeState));
    FoodObserver.subscribe(id, handleFood(id, setFood));
    SnakeMovementTraceObserver.subscribe(id, handleDirection(id, setSnakeMovement));
  }, []);

  const element = () => {
    if (isHead) return <SnakeHead movementDirection={movementDirection!} />;
    if (isBody) return <SnakeUnit movementDirection={movementTrace!} />;
    if (isTail) return <SnakeTail />;
    if (isFood) return <Food />;
    return null;
  };

  return <StyledTile data-testid={`UnitID-${id}`}>{element()}</StyledTile>;
};

export default BoardTile;
