import { User } from "./models/User";

const user = new User({ name: "sergi", age: 25 });
user.set({name: 'sersdfgsdgi'})

console.log(user.get("name"));
