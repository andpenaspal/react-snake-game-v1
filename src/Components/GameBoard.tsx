import { FlexContainer } from 'Basic Components/FlexContainer';
import {
  initialSnakeState,
  MovementDirection,
  MovementDirectionCorner,
  MOVEMENT_DIRECTION,
} from 'Definitions/Snake';
import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import FoodObserver from 'utils/FoodObserver';
import SnakeMovementObserver from 'utils/SnakeMovementObserver';
import SnakeObserver, { SnakeStateEvent } from 'utils/SnakeObserver';
import {
  getRandomPosition,
  getNextSnakePosition,
  keyDownToDirectionSnakeMapper,
  getBoardBoundaries,
  BoardDimensions,
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
  isStarted: boolean;
  isPause: boolean;
}
const StyledBoardBordered = styled.div<StyledBoardProps>`
  display: ${({ isStarted }) => (isStarted ? 'block' : 'none')};
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
// Pause and Restart
// Lost!
// Score on eat
// Faster on more score?
// Head not moving. Have a component with ref and just replacing it? to not re-render itself?

interface GameBoardProps {
  isStarted: boolean;
  isPause: boolean;
  extraScore: (extraScore: number) => void;
}

const GameBoard: FunctionComponent<GameBoardProps> = ({ extraScore, isStarted, isPause }) => {
  const [board, setBoard] = useState<React.ReactElement[]>();
  const [snakePosition, setSnakePosition] = useState<SnakeStateEvent>(initialSnakeState);
  const [foodPosition, setFoodPosition] = useState<number>(0);
  const [eatenFoodPosition, setEatenFoodPosition] = useState<number[]>([]);
  const [snakeDirection, setSnakeDirection] = useState<MovementDirection>(MOVEMENT_DIRECTION.LEFT);
  const [snakeAutomaticMovementTimer, setSnakeAutomaticMovementTimer] = useState<NodeJS.Timeout>();

  const setNewFoodPosition = () => {
    if (!board?.keys()) return;
    const { head, body, tail } = snakePosition;
    const newFoodPosition = getRandomPosition({
      possibilities: [...board.keys()],
      exclusions: [head, ...body, tail],
    });
    setFoodPosition(newFoodPosition);
    FoodObserver.publishOnly([foodPosition, newFoodPosition], newFoodPosition);
  };

  const handleMovement = (direction: MovementDirection) => {
    if (isPause) return;
    clearTimeout(snakeAutomaticMovementTimer);

    const { head, body, tail } = snakePosition;
    const isGrowSnake = eatenFoodPosition.includes(tail);

    const newSnakePosition = getNextSnakePosition({
      boardDimensions: BoardDimensions,
      direction,
      ...snakePosition,
      isLastBodyEaten: isGrowSnake,
    });
    const { head: newHead /* body: newBody */ } = newSnakePosition;

    const isSnakeCrash = [head, ...body, tail].includes(newHead);
    const isFoodEaten = newHead === foodPosition;
    const isOutOfBoundaries = boardBorderDirectionMap.get(direction)?.includes(head);

    // Out of Boundaries
    if (isOutOfBoundaries) alert('You Lost!');

    // Crash itself
    if (isSnakeCrash) alert('You Lost!');

    if (isFoodEaten) {
      // TODO: Maybe here newSnakePosition? Or both?
      setNewFoodPosition();
      setEatenFoodPosition((prev) => [...prev, newHead]);
      extraScore(100);
    }

    if (isGrowSnake) {
      setEatenFoodPosition((prev) => prev.filter((pos) => pos !== tail));
    }

    setSnakeDirection(direction);
    setSnakePosition(newSnakePosition);
  };

  // Transactional snakeMovement publisher. If in `handleMovement` it would publish twice fast sending incongruent states to the subscribers.
  // E.g., AutomaticMov and KeyMov almost at once, would send 2 different positions, resulting in a "lost head".
  // AutomaticMov would set Head in one place and KeyMov in another. Both would publish and only the last would be established in the state.
  // This approach only publishes after update, publishing transactionally with the state
  const previousSnakeState = useRef<SnakeStateEvent & { snakeDirection: MovementDirection }>({
    ...snakePosition,
    snakeDirection,
  });
  useEffect(() => {
    const { head, body, tail } = snakePosition;
    const {
      head: oldHead,
      tail: oldTail,
      snakeDirection: oldSnakeDirection,
    } = previousSnakeState.current;

    SnakeObserver.publishOnly([head, oldHead, tail, oldTail], snakePosition);

    // TODO: Revisit this. Why sending corner direction all the time? Change name?
    SnakeMovementObserver.publishOnly([head, body[0]!], {
      head,
      headMovementDirection: snakeDirection,
      cornerDirection:
        snakeDirection !== oldSnakeDirection
          ? (`${oldSnakeDirection}_${snakeDirection}` as MovementDirectionCorner)
          : snakeDirection,
    });

    // Maybe in the return? Check it out
    previousSnakeState.current = { ...snakePosition, snakeDirection };
  }, [snakePosition]);

  useEffect(() => {
    const boards = loadInitBoard();
    setBoard(boards);
    calculateBoardBoundaries();
  }, []);

  // SetUp sideEffect only on Start-up
  useEffect(() => {
    if (!board) return;
    const { head, body, tail } = snakePosition;
    const firstFoodPosition = getRandomPosition({
      possibilities: [...board.keys()],
      exclusions: [head, ...body, tail],
    });
    setFoodPosition(firstFoodPosition);
    FoodObserver.publishOnly([firstFoodPosition, foodPosition], firstFoodPosition);
    SnakeObserver.publishOnly([head, ...body, tail], initialSnakeState);
  }, [board]);

  // Keyboard listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      const keyAction = keyDownToDirectionSnakeMapper[e.key];
      e.preventDefault();
      if (keyAction) handleMovement(keyAction);
    };

    window.addEventListener('keydown', handleKeyDown, true);
    return () => window.removeEventListener('keydown', handleKeyDown, true);
  }, [snakePosition, isPause]);

  useEffect(() => {
    if (!isStarted) return undefined;
    const timer = setTimeout(() => handleMovement(snakeDirection), 100000);

    setSnakeAutomaticMovementTimer(timer);

    return () => clearTimeout(timer);
  }, [snakePosition, isStarted, isPause]);

  return (
    <StyledBoardBordered isStarted={isStarted} isPause={isPause}>
      {isPause && <GamePause />}
      <StyledBoard>{board}</StyledBoard>
    </StyledBoardBordered>
  );
};

export default GameBoard;
