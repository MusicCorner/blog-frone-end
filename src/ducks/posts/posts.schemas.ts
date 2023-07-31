import { schema } from 'normalizr';

import { userSchema } from '@ducks/users/users.schemas';

export const postSchema = new schema.Entity('posts', {
  user: userSchema,
});

export const postsSchema = [postSchema];
