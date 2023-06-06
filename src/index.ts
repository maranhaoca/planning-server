import { Room } from './model/room';
import { Story } from './model/story';
import { User } from './model/user';
import { createRoom, getRoom } from './service/room';
import {
  createStory,
  deleteStory,
  editStory,
  getStoriesBy,
} from './service/story';
import { addUser, deleteUser, editUser, getUsersBy } from './service/user';
import { addVote, getVotesBy, resetVotes } from './service/vote';

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
    const users = getUsersBy(data[1]);
    const room = getRoom(data[1]);

    io.emit('users_update', users);
    socket.emit('story_update', getStoriesBy(data[1]));
    socket.emit('room_data', room);
  });

  socket.on('room_update', (room: Story) => {
    const roomToEdit: Story = Object.assign(new Story(), room) as Story;

    const editedStory: Story = editStory(roomToEdit) || new Story();

    io.emit('room_data', editedStory);
  });

  socket.on('story_update', (story: Story) => {
    const storyToEdit = Object.assign(new Story(), story) as Story;

    editStory(storyToEdit);

    io.emit('story_update', getStoriesBy(storyToEdit.roomId));
  });

  socket.on('story_delete', (story: Story) => {
    const storyToDelete = Object.assign(new Story(), story) as Story;

    deleteStory(storyToDelete.id);

    io.emit('story_update', getStoriesBy(storyToDelete.roomId));
  });

  socket.on('user_update', (user: User) => {
    const userToEdit = Object.assign(new User(), user) as User;

    editUser(userToEdit);

    console.log(getUsersBy(user.roomId));

    io.emit('users_update', getUsersBy(user.roomId));
  });

  socket.on('user_delete', (userId: number) => {
    deleteUser(userId);

    io.emit('story_update', getUsersBy(userId));
  });

  socket.on('card_selected', (data: any) => {
    const [user, cardIndex, room] = data;

    addVote(user, cardIndex, room);

    io.emit('votes_data', getVotesBy(room));
  });

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
    // console.log('User desconected!', socket.id);
  });
});

server.listen(PORT, () => console.log(`Server running... port ${PORT}`));
