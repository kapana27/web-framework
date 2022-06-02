export class UserForm {
  constructor(public parent: HTMLElement | null) {}
  template(): string {
    return `
        <div>
            <h1>User Form</h1>
            <input />
        </div>`;
  }

  render() {
    const templateEl = document.createElement("template");
    templateEl.innerHTML = this.template();

    this.parent?.append(templateEl.content);
  }
}
