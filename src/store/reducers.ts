import { authReducer } from '@ducks/auth/auth.slices';
import { postsReducer } from '@ducks/posts/posts.slices';
import { usersReducer } from '@ducks/users/users.slices';

export const reducers = {
  auth: authReducer,
  posts: postsReducer,
  users: usersReducer,
};
