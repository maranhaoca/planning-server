import { Room } from './model/room';
import { User } from './model/user';
import { createRoom, editRoom, getRoom } from './service/room';
import { addUser, getUsersbyRoom } from './service/user';

const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: { origin: 'http://localhost:8000' },
});

const PORT = 3000;

io.on('connection', (socket) => {
  // console.log('Usuário conected!', socket.id);

  socket.on('create_room', (room: Room) => {
    const newRoom: Room = Object.assign(new Room(), room) as Room;

    createRoom(newRoom);
  });

  socket.on('create_user', (user: User) => {
    const newUser: User = Object.assign(new User(), user) as User;

    addUser(newUser);

    socket.emit('redirect');
  });

  socket.on('join_room', (data: number[]) => {
    socket.join(data[1]);
    const users = getUsersbyRoom(data[1]);
    const room = getRoom(data[1]);

    io.emit('users_update', users);
    socket.emit('room_data', room);
  });

  socket.on('room_update', (room: Room) => {
    const roomToEdit: Room = Object.assign(new Room(), room) as Room;

    const editedRoom: Room = editRoom(roomToEdit) || new Room();

    console.log(editedRoom.timer);

    io.emit('room_data', editedRoom);
  });

  socket.on('disconnect', () => {
    // console.log('User desconected!', socket.id);
  });
});

server.listen(PORT, () => console.log(`Server running... port ${PORT}`));
