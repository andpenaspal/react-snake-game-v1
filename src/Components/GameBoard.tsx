import { BorderFlexContainer, FlexContainer } from 'Basic Components/FlexContainer';
import { MovementDirection, MovementDirectionCorner, MOVEMENT_DIRECTION } from 'Definitions/Snake';
import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import FoodObserver from 'utils/FoodObserver';
import SnakeMovementObserver from 'utils/SnakeMovementObserver';
import SnakeObserver, { SnakeStateEvent } from 'utils/SnakeObserver';
import { getNextSnakePosition } from 'utils/SnakeUtils';
import BoardTile from './BoardTile';

const boardDimensions = 20;
const boardBorderDirectionMap = new Map<MovementDirection, number[]>();
const initBoardBoundaries = () => {
  const numberBoardElements = boardDimensions * boardDimensions;

  const topBoundaries = Array.from({ length: boardDimensions }, (_, i) => i);
  const downBoundaries = [];
  const leftBoundaries = [];
  const rightBoundaries = [];

  for (let i = 0; i < numberBoardElements; i += boardDimensions) {
    leftBoundaries.push(i);
    rightBoundaries.push(i + boardDimensions - 1);
  }

  for (let i = numberBoardElements; i > numberBoardElements - boardDimensions; i--) {
    downBoundaries.push(i - 1);
  }

  boardBorderDirectionMap.set(MOVEMENT_DIRECTION.UP, topBoundaries);
  boardBorderDirectionMap.set(MOVEMENT_DIRECTION.DOWN, downBoundaries);
  boardBorderDirectionMap.set(MOVEMENT_DIRECTION.LEFT, leftBoundaries);
  boardBorderDirectionMap.set(MOVEMENT_DIRECTION.RIGHT, rightBoundaries);
};

const StyledBoardBordered = styled(BorderFlexContainer)``;

interface StyledBoardProps {
  isStarted: boolean;
}
const StyledBoard = styled(FlexContainer)<StyledBoardProps>`
  display: ${({ isStarted }) => (isStarted ? 'flexbox' : 'none')};
  flex-wrap: wrap;
  width: ${() => `${15 * boardDimensions}px`};
  height: ${() => `${15 * boardDimensions}px`};
`;

const initSnakeState: SnakeStateEvent = {
  head: 30,
  body: [31, 32, 33],
  tail: 34,
};

const loadInitBoard = () =>
  [...Array(boardDimensions * boardDimensions).keys()].map((index) => (
    <BoardTile key={index} id={index} />
  ));

const getFoodPosition = ({
  board,
  snakePosition: { head, body, tail },
}: {
  board: React.ReactElement[];
  snakePosition: SnakeStateEvent;
}): number => {
  const boardPositions = [...board.keys()];
  const freeBoardPositions = boardPositions.filter((i) => ![head, ...body, tail].includes(i));
  return freeBoardPositions[Math.floor(Math.random() * freeBoardPositions.length)]!;
};

// TODO:
// Lost!
// Score on eat
// Faster on more score?
// Head not moving. Have a component with ref and just replacing it? to not re-render itself?

interface GameBoardProps {
  isStarted: boolean;
  extraScore: (extraScore: number) => void;
}

const GameBoard: FunctionComponent<GameBoardProps> = ({ extraScore, isStarted }) => {
  const [board, setBoard] = useState<React.ReactElement[]>();
  const [snakePosition, setSnakePosition] = useState<SnakeStateEvent>(initSnakeState);
  const [foodPosition, setFoodPosition] = useState<number>(0);
  const [eatenFoodPosition, setEatenFoodPosition] = useState<number[]>([]);
  const [snakeDirection, setSnakeDirection] = useState<MovementDirection>(MOVEMENT_DIRECTION.LEFT);
  const [snakeAutomaticMovementTimer, setSnakeAutomaticMovementTimer] = useState<NodeJS.Timeout>();

  const setNewFoodPosition = () => {
    if (!board?.keys()) return;
    const newFoodPosition = getFoodPosition({ board, snakePosition });
    setFoodPosition(newFoodPosition);
    FoodObserver.publishOnly([foodPosition, newFoodPosition], newFoodPosition);
  };

  const handleMovement = (direction: MovementDirection) => {
    clearTimeout(snakeAutomaticMovementTimer);

    const { head, body, tail } = snakePosition;
    const isGrowSnake = eatenFoodPosition.includes(tail);

    const newSnakePosition = getNextSnakePosition({
      boardDimensions,
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

    // SnakeMovementObserver.publishOnly([newHead, newBody[0]!], {
    //   head: newHead,
    //   headMovementDirection: direction,
    //   cornerDirection:
    //     direction !== snakeDirection
    //       ? (`${snakeDirection}_${direction}` as MovementDirectionCorner)
    //       : direction,
    // });

    setSnakePosition(newSnakePosition);
  };

  // Transactional snakeMovement publisher. If in `handleMovement` it would publish twice fast sending incongruent states to the subscribers.
  // E.g., AutomaticMov and KeyMov almost at once, would send 2 different positions, resulting in a "lost head".
  // AutomaticMov would set Head in one place and KeyMov in another. Both would publish and only the last would be established in the state.
  // This approach only publishes after update, publishing transactionally with the state
  const prev = useRef<SnakeStateEvent & { snakeDirection: MovementDirection }>({
    ...snakePosition,
    snakeDirection,
  });
  useEffect(() => {
    const { head, body, tail } = snakePosition;
    const { head: oldHead, tail: oldTail, snakeDirection: oldSnakeDirection } = prev.current;

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
    prev.current = { ...snakePosition, snakeDirection };
  }, [snakePosition]);

  useEffect(() => {
    const boards = loadInitBoard();
    setBoard(boards);
    initBoardBoundaries();
  }, []);

  useEffect(() => {
    if (!board) return;
    const { head, body, tail } = snakePosition;
    const firstFoodPosition = getFoodPosition({ board, snakePosition });
    setFoodPosition(firstFoodPosition);
    FoodObserver.publishOnly([firstFoodPosition, foodPosition], firstFoodPosition);
    SnakeObserver.publishOnly([head, ...body, tail], initSnakeState);
  }, [board]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      const keyDownToDirection: { [key: string]: () => void } = {
        ArrowUp: () => handleMovement(MOVEMENT_DIRECTION.UP),
        ArrowDown: () => handleMovement(MOVEMENT_DIRECTION.DOWN),
        ArrowLeft: () => handleMovement(MOVEMENT_DIRECTION.LEFT),
        ArrowRight: () => handleMovement(MOVEMENT_DIRECTION.RIGHT),
      };

      const keyAction = keyDownToDirection[e.key];

      if (keyAction) keyAction();
    };

    window.addEventListener('keydown', handleKeyDown, true);
    return () => window.removeEventListener('keydown', handleKeyDown, true);
  }, [snakePosition]);

  useEffect(() => {
    if (!isStarted) return undefined;
    const timer = setTimeout(() => handleMovement(snakeDirection), 100000);

    setSnakeAutomaticMovementTimer(timer);

    return () => clearTimeout(timer);
  }, [snakePosition]);

  return (
    <StyledBoardBordered>
      <StyledBoard isStarted={isStarted}>{board}</StyledBoard>
    </StyledBoardBordered>
  );
};

export default GameBoard;
