import Subscribable from './Subscribable';

export interface SnakeMovementEvent {
  head: number;
  tail: number;
  body: number[];
}

/**
 * Observer to publish the State of the Snake, its movement.
 * Where is Head, Body and Tail.
 */
const SnakeMovementObserver = new Subscribable<SnakeMovementEvent>();

export default SnakeMovementObserver;
