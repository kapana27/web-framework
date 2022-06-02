import { User } from "../models/User";

export class UserForm {
  constructor(public parent: HTMLElement | null, public model: User) {}
  onButtonClick() {
    console.log("hi");
  }

  eventsMap(): { [key: string]: () => void } {
    return {
      "click:button": this.onButtonClick,
    };
  }

  template(): string {
    return `
        <div>
            <h1>User Form</h1>
            <div> Username: ${this.model.get("name")}</div>
            <div> Age: ${this.model.get("age")}</div>
            <input />
            <button>Buton</button>
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
    const templateEl = document.createElement("template");
    templateEl.innerHTML = this.template();
    this.bindEvents(templateEl.content);

    this.parent?.append(templateEl.content);
  }
}
