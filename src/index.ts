// composition: to implement composition we need delegation
// with delegation we don't need a caller to reach to Sync/Eventing/Attributes class direclty


import { User } from "./models/User";

const user = User.buildUser({ name: 'serg', age: 56 });

user.save()
user.on('save', () => {
  console.log(user);
})
