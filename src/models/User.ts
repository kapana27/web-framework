import axios, { AxiosResponse } from "axios";
import { Eventing } from "./Eventing";

interface UserProps {
  name?: string;
  age?: number;
  id?: number;
}

export class User {
  private data: UserProps;
  public events: Eventing = new Eventing();

  constructor(data: UserProps) {
    this.data = data;
  }

  get(propName: string): number | string {
    return this.data[propName];
  }

  set(update: Partial<UserProps>): void {
    this.data = { ...this.data, ...update };
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
