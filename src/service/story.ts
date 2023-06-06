import { Story } from '../model/story';

let stories: Story[] = [];

export function getStoriesBy(roomId: number) {
  return stories.filter((story) => story.roomId == roomId);
}

export function editStory(editedStory: Story) {
  stories = stories.filter((story) => story.id != editedStory.id);

  stories = [...stories, editedStory];
}

export function deleteStory(id: number) {
  stories = stories.filter((story) => story.id != id);
}
