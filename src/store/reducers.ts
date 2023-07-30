import { authReducer } from '@ducks/auth/auth.slices';
import { postsReducer } from '@ducks/posts/posts.slices';

export const reducers = {
  auth: authReducer,
  posts: postsReducer,
};
