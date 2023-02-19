import Subscribable from './Subscribable';

export interface SnakeStateEvent {
  head: number;
  tail: number;
  body: number[];
}

const SnakeObserver = new Subscribable<SnakeStateEvent>();

export default SnakeObserver;
