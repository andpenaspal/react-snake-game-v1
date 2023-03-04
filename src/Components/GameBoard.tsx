import { FlexContainer } from 'BasicComponents/FlexContainer';
import {
  initialSnakeState,
  MovementDirection,
  MovementDirectionCorner,
  MOVEMENT_DIRECTION,
} from 'Definitions/Snake';
import React, { FunctionComponent, useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import FoodObserver from 'utils/FoodObserver';
import SnakeMovementTraceObserver, { SnakeMovementTraceEvent } from 'utils/SnakeMovementObserver';
import SnakeMovementObserver, { SnakeMovementEvent } from 'utils/SnakeObserver';
import {
  getRandomPosition,
  getNextHeadPosition,
  keyDownToDirectionSnakeMapper,
  getBoardBoundaries,
  BoardDimensions,
  getNewSnakePosition,
} from 'utils/SnakeUtils';
import BoardTile from './BoardTile';
import GamePause from './GamePause';

const boardBorderDirectionMap = new Map<MovementDirection, number[]>();
const calculateBoardBoundaries = () => {
  const { topBoundaries, bottomBoundaries, rightBoundaries, leftBoundaries } =
    getBoardBoundaries(BoardDimensions);

  boardBorderDirectionMap.set(MOVEMENT_DIRECTION.UP, topBoundaries);
  boardBorderDirectionMap.set(MOVEMENT_DIRECTION.DOWN, bottomBoundaries);
  boardBorderDirectionMap.set(MOVEMENT_DIRECTION.LEFT, leftBoundaries);
  boardBorderDirectionMap.set(MOVEMENT_DIRECTION.RIGHT, rightBoundaries);
};

interface StyledBoardProps {
  isPause: boolean;
}
const StyledBoardBordered = styled.div<StyledBoardProps>`
  ${({ isPause }) => isPause && ` & { position: relative; } `}
  padding: 3px;
  border: 1px solid red;
  border-radius: 5px;
`;

const StyledBoard = styled(FlexContainer)`
  flex-wrap: wrap;
  margin: auto;
  width: ${() => `${15 * BoardDimensions}px`};
  height: ${() => `${15 * BoardDimensions}px`};
`;

const loadInitBoard = () =>
  [...Array(BoardDimensions * BoardDimensions).keys()].map((index) => (
    <BoardTile key={index} id={index} />
  ));

// TODO:
// Lost!
// Head not moving. Have a component with ref and just replacing it? to not re-render itself?

interface GameBoardProps {
  isPause: boolean;
  onGameOver: () => void;
  onWin: () => void;
  extraScore: (extraScore: number) => void;
}

const GameBoard: FunctionComponent<GameBoardProps> = ({
  extraScore,
  isPause,
  onGameOver,
  onWin,
}) => {
  const board = useMemo(() => loadInitBoard(), []);
  const [snakePosition, setSnakePosition] = useState<SnakeMovementEvent>(initialSnakeState);
  const [foodPosition, setFoodPosition] = useState<number>(
    getRandomPosition({
      possibilities: [...board.keys()],
      exclusions: [...Object.values(initialSnakeState)].flat(),
    }),
  );
  // const [eatenFoodPosition, setEatenFoodPosition] = useState<number[]>([]);
  const [snakeDirection, setSnakeDirection] = useState<MovementDirection>(MOVEMENT_DIRECTION.LEFT);
  const [snakeAutomaticMovementTimer, setSnakeAutomaticMovementTimer] = useState<NodeJS.Timeout>();
  const [isWin, setIsWin] = useState<boolean>(false);

  console.log('Body - re-render');

  const setNewFoodPosition = (newSnakePosition: SnakeMovementEvent) => {
    console.log('Function - setNewFoodPosition');
    const { head, body, tail } = newSnakePosition;
    const newFoodPosition = getRandomPosition({
      possibilities: [...board.keys()],
      exclusions: [head, ...body, tail],
    });
    console.log({ newFoodPosition });
    setFoodPosition(newFoodPosition);
    FoodObserver.publishOnly([foodPosition, newFoodPosition], newFoodPosition);
    return newFoodPosition;
  };

  const handleMovement = (direction: MovementDirection) => {
    console.log('Function - handleMovement');
    if (isPause || isWin) return;
    clearTimeout(snakeAutomaticMovementTimer);

    const { head, body, tail } = snakePosition;
    // const isGrowSnake = eatenFoodPosition.includes(tail);

    const newHeadPosition = getNextHeadPosition({
      boardDimensions: BoardDimensions,
      direction,
      headPosition: head,
    });

    const isFoodEaten = newHeadPosition === foodPosition;
    const isSnakeCrash = [head, ...body, tail].includes(newHeadPosition);
    // TODO: Shouldn't be newHead?????
    const isOutOfBoundaries = boardBorderDirectionMap.get(direction)?.includes(head);

    // Out of Boundaries
    if (isOutOfBoundaries || isSnakeCrash) onGameOver();

    const newSnakePosition = getNewSnakePosition({
      newHeadPosition,
      isFoodEaten,
      ...snakePosition,
    });

    if (isFoodEaten) {
      const newFoodPosition = setNewFoodPosition(newSnakePosition);
      extraScore(50);
      if (newFoodPosition === undefined) setIsWin(true);
    }

    setSnakeDirection(direction);
    setSnakePosition(newSnakePosition);
  };

  // Transactional snakeMovement publisher. If in `handleMovement` it would publish twice fast sending incongruent states to the subscribers.
  // E.g., AutomaticMov and KeyMov almost at once, would send 2 different positions, resulting in a "lost head".
  // AutomaticMov would set Head in one place and KeyMov in another. Both would publish and only the last would be established in the state.
  // This approach only publishes after update, publishing transactionally with the state
  const previousSnakeState = useRef<SnakeMovementEvent & { snakeDirection: MovementDirection }>({
    ...snakePosition,
    snakeDirection,
  });
  useEffect(() => {
    console.log('useEffect - SnakePosition');
    const { head, body, tail } = snakePosition;
    const {
      head: oldHead,
      tail: oldTail,
      snakeDirection: oldSnakeDirection,
    } = previousSnakeState.current;

    const snakeTrace: SnakeMovementTraceEvent = {
      head,
      headMovementDirection: snakeDirection,
      cornerDirection:
        snakeDirection !== oldSnakeDirection
          ? (`${oldSnakeDirection}_${snakeDirection}` as MovementDirectionCorner)
          : snakeDirection,
    };

    SnakeMovementObserver.publishOnly([head, oldHead, tail, oldTail], snakePosition);

    SnakeMovementTraceObserver.publishOnly([head, body[0]!], snakeTrace);

    return () => {
      previousSnakeState.current = { ...snakePosition, snakeDirection };
    };
  }, [snakePosition]);

  // SetUp sideEffect only on Start-up
  useEffect(() => {
    console.log('useEffect - Initial render');
    const { head, body, tail } = snakePosition;

    calculateBoardBoundaries();
    FoodObserver.publishOnly([foodPosition], foodPosition);
    SnakeMovementObserver.publishOnly([head, ...body, tail], initialSnakeState);
  }, []);

  // Keyboard listener
  useEffect(() => {
    console.log('useEffect - KeyListener');
    const handleKeyDown = (e: KeyboardEvent): void => {
      const keyAction = keyDownToDirectionSnakeMapper[e.key];
      e.preventDefault();
      if (keyAction) handleMovement(keyAction);
    };

    window.addEventListener('keydown', handleKeyDown, true);
    return () => window.removeEventListener('keydown', handleKeyDown, true);
  }, [snakePosition, isPause]);

  // Automatic movement
  useEffect(() => {
    console.log('useEffect - Automatic Movement');
    const timer = setTimeout(() => handleMovement(snakeDirection), 100000);

    setSnakeAutomaticMovementTimer(timer);

    return () => clearTimeout(timer);
  }, [snakePosition, isPause]);

  useEffect(() => {
    if (isWin) onWin();
  }, [isWin]);

  return (
    <StyledBoardBordered isPause={isPause}>
      {isPause && <GamePause />}
      <StyledBoard>{board}</StyledBoard>
    </StyledBoardBordered>
  );
};

export default GameBoard;
