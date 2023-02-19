import { Keyframes, keyframes } from 'styled-components';
import { MOVEMENT_DIRECTION } from './Snake';

interface HorizontalSidesAnimation {
  topSideAnimation: Keyframes;
  bottomSideAnimation: Keyframes;
}

interface VerticalSidesAnimation {
  rightSideAnimation: Keyframes;
  leftSideAnimation: Keyframes;
}

export interface SnakeHeadVerticalAnimation {
  [MOVEMENT_DIRECTION.UP]: VerticalSidesAnimation;
  [MOVEMENT_DIRECTION.DOWN]: VerticalSidesAnimation;
}

export interface SnakeHeadHorizontalAnimation {
  [MOVEMENT_DIRECTION.LEFT]: HorizontalSidesAnimation;
  [MOVEMENT_DIRECTION.RIGHT]: HorizontalSidesAnimation;
}

const rightMovement: HorizontalSidesAnimation = {
  topSideAnimation: keyframes`
  0% {transform: rotate(0deg);}
  50% {transform: rotate(-35deg);}`,

  bottomSideAnimation: keyframes`
  0% {transform: rotate(0deg);}
  50% {transform: rotate(35deg);}`,
};

const leftMovement: HorizontalSidesAnimation = {
  topSideAnimation: keyframes`
  0% {transform: rotate(0deg);}
  50% {transform: rotate(35deg);}`,

  bottomSideAnimation: keyframes`
  0% {transform: rotate(0deg);}
  50% {transform: rotate(-35deg);}`,
};

const downMovement: VerticalSidesAnimation = {
  rightSideAnimation: keyframes`
  0% {transform: rotate(0deg);}
  50% {transform: rotate(-35deg);}`,

  leftSideAnimation: keyframes`
  0% {transform: rotate(0deg);}
  50% {transform: rotate(35deg);}`,
};

const upMovement: VerticalSidesAnimation = {
  rightSideAnimation: keyframes`
  0% {transform: rotate(0deg);}
  50% {transform: rotate(35deg);}`,

  leftSideAnimation: keyframes`
  0% {transform: rotate(0deg);}
  50% {transform: rotate(-35deg);}`,
};

export const snakeHeadAnimation: SnakeHeadHorizontalAnimation & SnakeHeadVerticalAnimation = {
  [MOVEMENT_DIRECTION.UP]: {
    rightSideAnimation: upMovement.rightSideAnimation,
    leftSideAnimation: upMovement.leftSideAnimation,
  },
  [MOVEMENT_DIRECTION.DOWN]: {
    rightSideAnimation: downMovement.rightSideAnimation,
    leftSideAnimation: downMovement.leftSideAnimation,
  },
  [MOVEMENT_DIRECTION.RIGHT]: {
    topSideAnimation: rightMovement.topSideAnimation,
    bottomSideAnimation: rightMovement.bottomSideAnimation,
  },
  [MOVEMENT_DIRECTION.LEFT]: {
    topSideAnimation: leftMovement.topSideAnimation,
    bottomSideAnimation: leftMovement.bottomSideAnimation,
  },
};
