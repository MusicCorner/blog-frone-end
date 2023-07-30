import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';

import {
  APIAuthResponse,
  APILoginPayload,
  APISignUpPayload,
} from '@common/types/api/auth';
import { APIError } from '@common/types/api/common';
import {
  LocalStorageKeys,
  LocalStorageService,
} from '@common/helpers/LocalStorageService';

import { authApi } from './auth.api';
import { loginSlice, signUpSlice } from './auth.slices';

function* successAuthSaga({ access_token }: APIAuthResponse) {
  yield LocalStorageService.set(LocalStorageKeys.AccessToken, access_token);
}

function* signUpSaga({ payload }: PayloadAction<APISignUpPayload>) {
  try {
    const response = (yield call(authApi.signUp, payload)) as APIAuthResponse;

    yield call(successAuthSaga, response);
    yield put(signUpSlice.actions.success());
  } catch (error) {
    yield put(signUpSlice.actions.error(error as APIError));
  }
}

function* loginSaga({ payload }: PayloadAction<APILoginPayload>) {
  try {
    const response = (yield call(authApi.login, payload)) as APIAuthResponse;

    yield call(successAuthSaga, response);
    yield put(loginSlice.actions.success());
  } catch (error) {
    yield put(loginSlice.actions.error(error as APIError));
  }
}

export function* authSagas() {
  yield takeLatest(signUpSlice.actions.request, signUpSaga);
  yield takeLatest(loginSlice.actions.request, loginSaga);
}
