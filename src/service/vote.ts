export interface Vote {
  _id: number;
  _value: number;
  _roomId: number;
}

let votes: Vote[] = [];

export function addVote(user: number, cardIndex: number, room: number) {
  const newVote: Vote = { _id: user, _value: cardIndex, _roomId: room };

  votes = votes.filter((vote) => vote._id != newVote._id);
  votes = [...votes, newVote];
}

export function getVotesBy(roomId: number) {
  return votes.filter((vote) => vote._roomId == roomId);
}

export function resetVotes(roomId: number) {
  votes = votes.filter((vote) => vote._id != roomId);

  return votes.filter((vote) => vote._roomId == roomId);
}
