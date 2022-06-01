import axios, { AxiosResponse } from "axios";
import { Eventing } from "./Eventing";
import { Sync } from "./Sync";

interface UserProps {
  name?: string;
  age?: number;
  id?: number;
}

const rootUrl = "http://localhost:3000/users";

export class User {
  private data: UserProps;
  public events: Eventing = new Eventing();
  public sync: Sync<UserProps> = new Sync<UserProps>(rootUrl);

  constructor(data: UserProps) {
    this.data = data;
  }

  get(propName: string): number | string | undefined {
    return this.data[propName as keyof UserProps];
  }

  set(update: UserProps): void {
    this.data = { ...this.data, ...update };
  }
}
