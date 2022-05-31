import { User } from "./models/User";

const user = new User({ id: 1, name: "sergi", age: 24545 });
user.set({ name: "sersdfgsdgi" });

user.on("change", () => {
  console.log("change #1");
});

user.on("change", () => {
  console.log("change #2");
});

user.on("bdm", () => {
  console.log("bdm");
});

console.log(user.get("name"));

user.trigger("change");
user.trigger("bdm");

user.save();
