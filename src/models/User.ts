interface UserProps {
  name?: string;
  age?: number;
}

type Callback = () => void;

export class User {
  data: UserProps;
  events: { [key: string]: Callback[] };

  constructor(data: UserProps) {
    this.data = data;
    this.events = {};
  }

  get(propName: string): number | string {
    return this.data[propName];
  }

  set(update: Partial<UserProps>): void {
    this.data = { ...this.data, ...update };
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
