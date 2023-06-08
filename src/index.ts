import { Room } from './model/room';
import { Story } from './model/story';
import { User } from './model/user';
import { createRoom, editRoom, getRoom } from './service/room';
import { deleteStory, editStory, getStoriesBy } from './service/story';
import { deleteUser, editUser, getUsersBy } from './service/user';
import { addVote, getVotesBy, resetVotes } from './service/vote';

const PORT = process.env.PORT || 3000;
const ORIGIN = process.env.ORIGIN || 'http://localhost:8000';

const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: { origin: ORIGIN },
});

let counter = 0;

io.on('connection', (socket: any) => {
  counter++;
  console.log('Uer conected!', socket.id, counter + ' users');

  socket.on('create_room', (room: Room) => {
    const newRoom: Room = Object.assign(new Room(), room) as Room;

    createRoom(newRoom);
  });

  socket.on('create_user', (user: User) => {
    const newUser: User = Object.assign(new User(), user) as User;

    editUser(newUser);

    socket.emit('redirect');
  });

  socket.on('join_room', (data: number[]) => {
    socket.join(data[1].toString());
    const users = getUsersBy(data[1]);
    const room = getRoom(data[1]);

    io.in(data[1].toString()).emit('users_update', users);
    socket.emit('story_update', getStoriesBy(data[1]));
    socket.emit('room_data', room);
  });

  socket.on('room_update', (room: Room) => {
    const roomToEdit: Room = Object.assign(new Room(), room) as Room;

    const editedRoom: Room = editRoom(roomToEdit) || new Room();

    io.to(room.id).emit('room_data', editedRoom);
  });

  socket.on('story_update', (story: Story) => {
    const storyToEdit = Object.assign(new Story(), story) as Story;

    editStory(storyToEdit);

    console.log(`${story['_roomId']}`);

    io.in(`${story['_roomId']}`).emit(
      'story_update',
      getStoriesBy(storyToEdit.roomId)
    );
  });

  socket.on('story_delete', (story: Story) => {
    const storyToDelete = Object.assign(new Story(), story) as Story;

    deleteStory(storyToDelete.id);

    io.emit('story_update', getStoriesBy(storyToDelete.roomId));
  });

  //TODO: duplicated?
  socket.on('user_update', (user: User) => {
    const userToEdit = Object.assign(new User(), user) as User;

    editUser(userToEdit);

    io.emit('users_update', getUsersBy(user['_roomId']));
  });

  socket.on('user_delete', (data: number[]) => {
    const [userId, roomId] = data;

    deleteUser(userId);

    io.emit('users_update', getUsersBy(roomId));
  });

  socket.on('card_selected', (data: any) => {
    const [user, cardIndex, room] = data;

    addVote(user, cardIndex, room);

    io.to(room).emit('votes_data', getVotesBy(room));
  });

  //TODO: duplicated?
  socket.on('toggle_voting', (data: any) => {
    io.emit('voting_changed', data);
  });

  socket.on('voting_status', (data: any) => {
    io.emit('voting_status', data);
  });

  socket.on('timer_changed', (data: any) => {
    io.emit('timer_changed', data);
  });

  socket.on('reset_votes', (roomId: number) => {
    resetVotes(roomId);

    io.emit('votes_data', getVotesBy(roomId));
  });

  socket.on('disconnect', () => {
    counter--;
    console.log('User desconected!', socket.id, counter + ' users');
  });
});

server.listen(PORT, () => console.log(`Server running... port ${PORT}`));
