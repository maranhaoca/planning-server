import { User } from '../model/user';

let users: User[] = [];

export function addUser(newUser: User) {
  users = users.filter((user) => user.id != newUser.id);
  users = [...users, newUser];

  return users;
}

export function deleteUser(id: number) {
  users = users.filter((user) => user.id != id);
  return users;
}

export function getUsersbyRoom(roomId: number) {
  return users.filter((user) => user.roomId == roomId);
}
