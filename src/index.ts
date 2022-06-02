import { User } from "./models/User";
import { UserForm } from "./views/UserForm";

const user = User.buildUser({ name: "sergi", age: 25 });

const app = document.querySelector("#app");

if (app) {
  const userForm = new UserForm(app, user);
  userForm.render();
} else {
  throw new Error("Root element not found");
}
