class Subscribable<MessageType> {
  private subscribers: ((msg: MessageType) => void)[];

  constructor() {
    this.subscribers = new Array<(msg: MessageType) => void>();
  }

  subscribe(id: number, cb: (msg: MessageType) => void) {
    this.subscribers[id] = cb;
  }

  publish(msg: MessageType): void {
    this.subscribers.forEach((cb) => cb(msg));
  }

  publishOnly(conditionalSubscribers: number[], msg: MessageType): void {
    conditionalSubscribers.forEach((id) => {
      if (!this.subscribers[id]) return;
      this.subscribers[id]!(msg);
    });
  }
}

export default Subscribable;
