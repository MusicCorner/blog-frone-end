import { createAsyncSlice, PartialAsyncState } from 'create-async-slice';
import { combineReducers } from 'redux';

import { APILoginPayload, APISignUpPayload } from '@common/types/api/auth';
import { APIError } from '@common/types/api/common';

export interface AuthState {
  signUp: PartialAsyncState<undefined, APIError>;
  login: PartialAsyncState<undefined, APIError>;
}

export interface AuthRootState {
  auth: AuthState;
}

export const signUpSlice = createAsyncSlice<
  APISignUpPayload,
  undefined,
  APIError
>({
  name: 'signUp',
  selectAsyncState: (state: AuthRootState) => state.auth.signUp,
});

export const loginSlice = createAsyncSlice<
  APILoginPayload,
  undefined,
  APIError
>({
  name: 'login',
  selectAsyncState: (state: AuthRootState) => state.auth.login,
});

export const authReducer = combineReducers({
  login: loginSlice.reducer,
  signUp: signUpSlice.reducer,
});
