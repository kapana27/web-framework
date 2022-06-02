import { User } from "../models/User";

export class UserForm {
  constructor(public parent: Element, public model: User) {
    this.model.on("change", () => this.render());
  }

  onSetAgeClick = () => {
    this.model.setRandomAge();
  };

  onSetNameClick = () => {
    const nameInput = this.parent?.querySelector("input");

    if (nameInput && nameInput.value.length > 0) {
      this.model.set({ name: nameInput.value });
    }
  };

  eventsMap(): { [key: string]: () => void } {
    return {
      "click:#set-age": this.onSetAgeClick,
      "click:#set-name": this.onSetNameClick,
    };
  }

  template(): string {
    const name = this.model.get("name");
    return `
        <div>
            <h1>User Form</h1>
            <div> Name: ${name}</div>
            <div> Age: ${this.model.get("age")}</div>
            <input id="name-input" placeHolder="${name}" /> <button id="set-name">Change Name</button> <br />
            <hr />
            <button id="set-age">Set Random Age</button><br />
            <button id="save">Save</button>
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
