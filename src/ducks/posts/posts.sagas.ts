import { call, put, takeEvery } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { normalize } from 'normalizr';

import {
  APIGETPostsSuccess,
  APIGetPostsRequest,
} from '@common/types/api/posts';
import { usersEntitiesSlice } from '@ducks/users/users.slices';

import { getPostsSlice, postsEntitiesSlice } from './posts.slices';
import { postsApi } from './posts.api';
import { postsSchema } from './posts.schemas';
import { NormalizedPostsAPIEntities } from './posts.types';

function* getPostsSaga({ payload }: PayloadAction<APIGetPostsRequest>) {
  try {
    const { data, ...listData } = (yield call(
      postsApi.getPosts,
      payload
    )) as APIGETPostsSuccess;

    const {
      entities: { posts, user },
      result: ids,
    } = normalize<undefined, NormalizedPostsAPIEntities, string[]>(
      data,
      postsSchema
    );

    yield put(postsEntitiesSlice.actions.set(posts));
    yield put(usersEntitiesSlice.actions.set(user));
    yield put(getPostsSlice.actions.success({ data: ids, ...listData }));
  } catch (error) {
    yield put(getPostsSlice.actions.error(error as string));
  }
}

export function* postsSagas() {
  yield takeEvery(getPostsSlice.actions.request, getPostsSaga);
}
