import { AxiosResponse } from "axios";
import { Attributes } from "./Attributes";
import { Eventing } from "./Eventing";
import { Sync } from "./Sync";

interface UserProps {
  name?: string;
  age?: number;
  id?: number;
}

const rootUrl = "http://localhost:3000/users";

export class User<T> {
  public attributes: Attributes<UserProps>;
  public events: Eventing = new Eventing();
  public sync: Sync<UserProps> = new Sync<UserProps>(rootUrl);

  constructor(attrs: UserProps) {
    this.attributes = new Attributes<UserProps>(attrs);
  }

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  get get() {
    return this.attributes.get;
  }

  set(update: UserProps): void {
    this.attributes.set(update);
    this.events.trigger("change");
  }

  fetch() {
    const id = this.attributes.get("id");
    if (typeof id !== "number") {
      return;
    }

    this.sync.fetch(id).then((response: AxiosResponse) => {
      this.set(response.data as UserProps);
    });
  }

  save(): void {
    this.sync.save(this.attributes.getAll()).then((response: AxiosResponse) => {
    this.trigger("save");
    });;
  }
}
