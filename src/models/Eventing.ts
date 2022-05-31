type Callback = () => void;

export class Eventing {
  events: { [key: string]: Callback[] };
  constructor() {
    this.events = {};
  }

  on(eventName: string, cb: Callback) {
    const handlers = this.events[eventName] || [];
    this.events[eventName] = [...handlers, cb];
  }

  trigger(eventName: string): void {
    const handlers = this.events[eventName];

    if (!handlers || handlers.length === 0) {
      return;
    }

    handlers.forEach((cb) => cb());
  }
}
