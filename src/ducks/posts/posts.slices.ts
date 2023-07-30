import { AsyncState, createAsyncSlice } from 'create-async-slice';
import { combineReducers } from 'redux';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { EntitiesState } from '@common/types/slices/common';
import {
  APICreatePost,
  APIDeletePost,
  APIEditPost,
  APIGetPostSuccess,
  APIGetPostsRequest,
} from '@common/types/api/posts';
import { APIListResponse } from '@common/types/api/common';

export type GetPostsAsyncState = APIListResponse<string>;

export interface PostsState {
  get: AsyncState<GetPostsAsyncState, string>;
  create: AsyncState<undefined, string>;
  delete: AsyncState<undefined, string>;
  edit: AsyncState<undefined, string>;
}

export interface PostsRootState {
  posts: PostsState;
}

export const postsEntitiesSlice = createSlice({
  name: 'entities',
  initialState: {} as EntitiesState<APIGetPostSuccess>,
  reducers: {
    set: (
      state: EntitiesState<APIGetPostSuccess>,
      { payload }: PayloadAction<EntitiesState<APIGetPostSuccess>>
    ) => ({ ...state, ...payload }),
  },
});

export const getPostsSlice = createAsyncSlice<
  APIGetPostsRequest | undefined,
  GetPostsAsyncState,
  string
>({
  name: 'get',
  selectAsyncState: (state: PostsRootState) => state.posts.get,
});

export const createPostSlice = createAsyncSlice<
  APICreatePost,
  undefined,
  string
>({
  name: 'create',
  selectAsyncState: (state: PostsRootState) => state.posts.create,
});

export const deletePostSlice = createAsyncSlice<
  APIDeletePost,
  undefined,
  string
>({
  name: 'delete',
  selectAsyncState: (state: PostsRootState) => state.posts.delete,
});

export const editPostSlice = createAsyncSlice<APIEditPost, undefined, string>({
  name: 'edit',
  selectAsyncState: (state: PostsRootState) => state.posts.edit,
});

export const postsReducer = combineReducers({
  entities: postsEntitiesSlice.reducer,
  get: getPostsSlice.reducer,
  create: createPostSlice.reducer,
  delete: deletePostSlice.reducer,
  edit: editPostSlice.reducer,
});
