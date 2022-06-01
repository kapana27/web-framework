// composition: to implement composition we need delegation
// with delegation we don't need a caller to reach to Sync/Eventing/Attributes class direclty


import { User } from "./models/User";

const user = new User({ name: "sergi", age: 24545 });

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

