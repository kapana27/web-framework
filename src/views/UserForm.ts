import { User } from "../models/User";

export class UserForm {
  constructor(public parent: HTMLElement | null, public model: User) {
    this.model.on("change", () => this.render());
  }

  onSetAgeClick = () => {
    this.model.setRandomAge();
  };

  eventsMap(): { [key: string]: () => void } {
    return {
      "click:#set-age": this.onSetAgeClick,
    };
  }

  template(): string {
    return `
        <div>
            <h1>User Form</h1>
            <div> Username: ${this.model.get("name")}</div>
            <div> Age: ${this.model.get("age")}</div>
            <input />
            <button id="set-age">Set Random Age</button>
        </div>`;
  }

  bindEvents(fragment: DocumentFragment) {
    const eventsMap = this.eventsMap();
    for (let key in eventsMap) {
      const [eventName, selector] = key.split(":");

      fragment
        .querySelectorAll(selector)
        .forEach((el) => el.addEventListener(eventName, eventsMap[key]));
    }
  }

  render() {
    if (this.parent) {
      this.parent.innerHTML = "";
    }
    const templateEl = document.createElement("template");
    templateEl.innerHTML = this.template();
    this.bindEvents(templateEl.content);

    this.parent?.append(templateEl.content);
  }
}
