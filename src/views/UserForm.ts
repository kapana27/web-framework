import { User, UserProps } from "../models/User";
import { View } from "./View";

export class UserForm extends View<User, UserProps> {
  onSetAgeClick = () => {
    this.model.setRandomAge();
  };

  onSetNameClick = () => {
    const nameInput = this.parent?.querySelector("input");

    if (nameInput && nameInput.value.length > 0) {
      this.model.set({ name: nameInput.value });
    }
  };

  onSaveClick = () => {
    this.model.save();
  }

  eventsMap(): { [key: string]: () => void } {
    return {
      "click:#set-age": this.onSetAgeClick,
      "click:#set-name": this.onSetNameClick,
      "click:#save": this.onSaveClick
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
            <button id="save">Save User</button>
        </div>`;
  }
}
