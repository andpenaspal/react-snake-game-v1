import { MovementDirection, MovementDirectionCorner, MOVEMENT_DIRECTION } from 'Definitions/Snake';
import Subscribable from './Subscribable';

export interface SnakeMovementEvent {
  head: number;
  headMovementDirection: keyof typeof MOVEMENT_DIRECTION;
  cornerDirection: MovementDirection | MovementDirectionCorner;
}

const SnakeMovementObserver = new Subscribable<SnakeMovementEvent>();

export default SnakeMovementObserver;
