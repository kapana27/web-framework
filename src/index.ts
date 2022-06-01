import { User } from "./models/User";

const user = User.buildUser({ name: 'sergi', age: 45 });

user.save()
user.on('save', () => {
  console.log(user);
})
