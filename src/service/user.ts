import { User } from '../model/user';

let users: User[] = [];

export function addUser(newUser: User) {
  users = users.filter((user) => user.id != newUser.id);
  users = [...users, newUser];

  return users;
}

export function editUser(editedUser: User) {
  users = users.filter((user) => user.id != editedUser.id);
  users = [...users, editedUser];
}

export function deleteUser(id: number) {
  users = users.filter((user) => user['_id'] != id);
  return users;
}

export function getUsersBy(roomId: number) {
  return users.filter((user) => user['_roomId'] == roomId);
}
