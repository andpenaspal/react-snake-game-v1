import { MovementDirection, MovementDirectionCorner, MOVEMENT_DIRECTION } from 'Definitions/Snake';
import Subscribable from './Subscribable';

export interface SnakeMovementTraceEvent {
  head: number;
  headMovementDirection: keyof typeof MOVEMENT_DIRECTION;
  cornerDirection: MovementDirection | MovementDirectionCorner;
}

/**
 * Observer to publish the Trace of the Snake in its movement.
 * The direction of the snake on its Movement.
 */
const SnakeMovementTraceObserver = new Subscribable<SnakeMovementTraceEvent>();

export default SnakeMovementTraceObserver;
