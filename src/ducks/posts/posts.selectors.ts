import { RootState } from '@store';

export const selectPost = (state: RootState, { id }: { id: string }) =>
  state.posts.entities[id] || {};
