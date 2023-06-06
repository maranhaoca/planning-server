import { Room } from '../model/room';

let rooms: Room[] = [];

export function createRoom(newRoom: Room) {
  rooms = rooms.filter((room) => room.id != newRoom.id);

  rooms = [...rooms, newRoom];

  return newRoom;
}

export function getRoom(id: number) {
  return rooms.find((room) => room.id == id);
}

export function editRoom(editedRoom: Room) {
  rooms = rooms.filter((room) => room.id != editedRoom.id);
  rooms = [...rooms, editedRoom];

  return rooms.find((room) => room.id == editedRoom.id);
}
