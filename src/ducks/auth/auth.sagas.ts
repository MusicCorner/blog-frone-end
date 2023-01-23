import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';

import { APILoginPayload, APISignUpPayload } from '@common/types/api/auth';
import { APIError } from '@common/types/api/common';

import { authApi } from './auth.api';
import { loginSlice, signUpSlice } from './auth.slices';

function* signUpSaga({ payload }: PayloadAction<APISignUpPayload>) {
  try {
    yield call(authApi.signUp, payload);

    yield put(signUpSlice.actions.success());
  } catch (error) {
    yield put(signUpSlice.actions.error(error as APIError));
  }
}

function* loginSaga({ payload }: PayloadAction<APILoginPayload>) {
  try {
    yield call(authApi.login, payload);

    yield put(loginSlice.actions.success());
  } catch (error) {
    yield put(loginSlice.actions.error(error as APIError));
  }
}

export function* authSagas() {
  yield takeLatest(signUpSlice.actions.request, signUpSaga);
  yield takeLatest(loginSlice.actions.request, loginSaga);
}
