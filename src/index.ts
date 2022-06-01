import { User } from "./models/User";

const user = new User({ id: 1, name: "sergi", age: 24545 });
user.attributes.set({ name: "sersdfgsdgi" });

user.events.on("change", () => {
  console.log("change #1");
});

user.events.on("change", () => {
  console.log("change #2");
});

user.events.on("bdm", () => {
  console.log("bdm");
});

console.log(user.attributes.get("name"));

user.events.trigger("change");
user.events.trigger("bdm");

