import { AsyncState, createAsyncSlice } from 'create-async-slice';
import { combineReducers } from 'redux';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import {
  APICreatePost,
  APIDeletePost,
  APIEditPost,
  APIGetPostsRequest,
} from '@common/types/api/posts';
import { APIListResponse } from '@common/types/api/common';

import { NormalizedPostsState } from './posts.types';

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
  name: 'postsEntities',
  initialState: {} as NormalizedPostsState,
  reducers: {
    set: (
      state: NormalizedPostsState,
      { payload }: PayloadAction<NormalizedPostsState>
    ) => ({ ...state, ...payload }),
  },
});

export const getPostsSlice = createAsyncSlice<
  APIGetPostsRequest | undefined,
  GetPostsAsyncState,
  string
>({
  name: 'getPosts',
  selectAsyncState: (state: PostsRootState) => state.posts.get,
});

export const createPostSlice = createAsyncSlice<
  APICreatePost,
  undefined,
  string
>({
  name: 'createPost',
  selectAsyncState: (state: PostsRootState) => state.posts.create,
});

export const deletePostSlice = createAsyncSlice<
  APIDeletePost,
  undefined,
  string
>({
  name: 'deletePost',
  selectAsyncState: (state: PostsRootState) => state.posts.delete,
});

export const editPostSlice = createAsyncSlice<APIEditPost, undefined, string>({
  name: 'editPost',
  selectAsyncState: (state: PostsRootState) => state.posts.edit,
});

export const postsReducer = combineReducers({
  entities: postsEntitiesSlice.reducer,
  get: getPostsSlice.reducer,
  create: createPostSlice.reducer,
  delete: deletePostSlice.reducer,
  edit: editPostSlice.reducer,
});
