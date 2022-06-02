import { Model } from "../models/Model";

export abstract class View<T extends Model<K>, K> {
  constructor(public parent: Element, public model: T) {
    this.model.on("change", () => this.render());
  }

  abstract eventsMap(): { [key: string]: () => void };
  abstract template(): string;

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
