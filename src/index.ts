import { User } from "./models/User";
import { UserForm } from "./views/UserForm";

const user = User.buildUser({ name: "sergi", age: 25 });

const userForm = new UserForm(document.getElementById("app"), user);

userForm.render();
