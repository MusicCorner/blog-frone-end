import { APIGetPostSuccess } from '@common/types/api/posts';
import { EntitiesState } from '@common/types/slices/common';
import { NormalizedUsersState } from '@ducks/users/users.types';

export type NormalizedPostEntity = Omit<APIGetPostSuccess, 'user'> & {
  user: string;
};

export type NormalizedPostsState = EntitiesState<NormalizedPostEntity>;

export interface NormalizedPostsAPIEntities {
  posts: NormalizedPostsState;
  user: NormalizedUsersState;
}
