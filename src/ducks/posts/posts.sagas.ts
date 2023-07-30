import { call, put, takeEvery } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import {
  APIGETPostsSuccess,
  APIGetPostSuccess,
  APIGetPostsRequest,
} from '@common/types/api/posts';
import { EntitiesState } from '@common/types/slices/common';

import { getPostsSlice, postsEntitiesSlice } from './posts.slices';
import { postsApi } from './posts.api';

function* getPostsSaga({ payload }: PayloadAction<APIGetPostsRequest>) {
  try {
    const { data, ...listData } = (yield call(
      postsApi.getPosts,
      payload
    )) as APIGETPostsSuccess;

    const ids = data.map((post) => post.id);
    const entities = data.reduce(
      (accum, value) => ({ ...accum, [value.id]: value }),
      {} as EntitiesState<APIGetPostSuccess>
    );

    yield put(postsEntitiesSlice.actions.set(entities));
    yield put(getPostsSlice.actions.success({ data: ids, ...listData }));
  } catch (error) {
    yield put(getPostsSlice.actions.error(error as string));
  }
}

export function* postsSagas() {
  yield takeEvery(getPostsSlice.actions.request, getPostsSaga);
}
