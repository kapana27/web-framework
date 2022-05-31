import axios, { AxiosResponse } from "axios";

interface UserProps {
  name?: string;
  age?: number;
  id?: number;
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

  fetch(): void {
    axios
      .get(`http://localhost:3000/users/${this.get("id")}`)
      .then((response: AxiosResponse): void => {
        this.set(response.data);
      });
  }

  save() {
    const id = this.get("id");
    if (id) {
      axios.put(`http://localhost:3000/users/${id}`, this.data);
    } else {
      axios.post("http://localhost:3000/users/", this.data);
    }
  }
}
